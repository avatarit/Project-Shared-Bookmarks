import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeUrl, isValidUrl, sortByNewest } from "./helpers.js";

test("normalizeUrl adds https:// when missing", () => {
  assert.equal(normalizeUrl("example.com/x"), "https://example.com/x");
  assert.equal(normalizeUrl("https://a.b/c"), "https://a.b/c");
});

test("isValidUrl returns true for valid URLs", () => {
  assert.equal(isValidUrl("https://google.com"), true);
  assert.equal(isValidUrl("example.com"), true);
});

test("isValidUrl returns false for invalid URLs", () => {
  assert.equal(isValidUrl("%%%bad%%%"), false);
});

test("sortByNewest orders array descending by timestamp", () => {
  const older = { timestamp: "2024-01-01T00:00:00.000Z" };
  const newer = { timestamp: "2025-01-01T00:00:00.000Z" };
  const result = sortByNewest([older, newer]);
  assert.equal(result[0], newer);
});