
import { getUserIds, getData, setData , clearData } from "./storage.js";
import { normalizeUrl, isValidUrl, sortByNewest } from "./helpers.js";

const userSelect = document.getElementById("user-select");
const bookmarkList = document.getElementById("bookmark-list");
const noBookmarksMessage = document.getElementById("no-bookmarks-message");
const form = document.getElementById("bookmark-form");

let currentUserId = null;

function populateUserDropdown() {
  const users = getUserIds();
  for (const userId of users) {
    const option = document.createElement("option");
    option.value = userId;
    option.textContent = `User ${userId}`;
    userSelect.appendChild(option);
  }
  currentUserId = users[0];
  userSelect.value = currentUserId;
  displayBookmarks(currentUserId);
}

function displayBookmarks(userId) {
  const data = getData(userId) || [];
  const bookmarks = sortByNewest(data);

  bookmarkList.innerHTML = "";

  if (bookmarks.length === 0) {
    noBookmarksMessage.hidden = false;
    return;
  }
  noBookmarksMessage.hidden = true;

  for (const b of bookmarks) {
    const li = document.createElement("li");

    const a = document.createElement("a");
    a.href = normalizeUrl(b.url);
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = b.title || b.url;

    const p = document.createElement("p");
    p.textContent = b.description || "";

    const s = document.createElement("small");
    s.textContent = new Date(b.timestamp).toLocaleString();

    li.appendChild(a);
    li.appendChild(p);
    li.appendChild(s);
    bookmarkList.appendChild(li);
  }
}

userSelect.addEventListener("change", () => {
  currentUserId = userSelect.value;
  displayBookmarks(currentUserId);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const url = form.url.value.trim();
  const title = form.title.value.trim();
  const description = form.description.value.trim();

  if (!url || !title || !description) {
    alert("All fields are required.");
    return;
  }
  if (!isValidUrl(url)) {
    alert("Please enter a valid URL.");
    return;
  }

  const newBookmark = {
    url: normalizeUrl(url),
    title,
    description,
    timestamp: new Date().toISOString(),
  };

  const existing = getData(currentUserId) || [];
  setData(currentUserId, existing.concat(newBookmark));

  form.reset();
  displayBookmarks(currentUserId);
});

window.onload = populateUserDropdown;