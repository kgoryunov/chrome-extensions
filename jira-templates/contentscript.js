"use strict";

const insertTextAtCursor = (text) => {
  const el = document.activeElement;
  const val = el.value;
  const doc = el.ownerDocument;
  if (
    typeof el.selectionStart === "number" &&
    typeof el.selectionEnd === "number"
  ) {
    const endIndex = el.selectionEnd;
    el.value = val.slice(0, endIndex) + text + val.slice(endIndex);
    el.selectionStart = el.selectionEnd = endIndex + text.length;
  } else if (doc.selection !== "undefined" && doc.selection.createRange) {
    el.focus();
    const range = doc.selection.createRange();
    range.collapse(false);
    range.text = text;
    range.select();
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.data) {
    insertTextAtCursor(request.data);
  }
});
