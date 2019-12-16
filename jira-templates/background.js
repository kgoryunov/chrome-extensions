"use strict";

const templates = [
  {
    id: "generic",
    title: "Insert generic issue template",
    content: `*Goal*
This is the goal of the ticket. When the Acceptance Criterion of the ticket is met, the goal has been achieved. This should be a few sentences.

*Approach*
This is an outline, step by step, on how to get to the AC. Like all things, it’s a balance. Don’t write the code in the ticket, but sometimes a link to Github code is helpful.

*External dependencies*
- Required files, mocks, external info
- Need a credit card to test XYZ
- Need merchant ID from app store connect

*Risks, contingencies, and unknowns*
List Risks and “Gotchas” here. What are some of the unknowns? What does this ticket depend upon? Please use JIRAs “Relates to” and “Blocks” relationships in JIRA. These linkages should be checked during the peer Software Design Review.

*Acceptance Criteria*
- This should include Acceptance Criteria for when a feature can be considered done.
- This ticket is done when ____________

*How to Test*
- Include testing steps here
- How does the product test that this is working? What should we expect to see?`
  }
];
const contentById = templates.reduce((accumulator, { id, content }) => {
  accumulator[id] = content;
  return accumulator;
}, {});

chrome.runtime.onInstalled.addListener(() => {
  templates.forEach(({ id, title }) => {
    chrome.contextMenus.create({
      id,
      title,
      type: "normal",
      contexts: ["editable"],
      documentUrlPatterns: [
        "http://*.atlassian.net/*",
        "https://*.atlassian.net/*"
      ]
    });
  });
});

chrome.contextMenus.onClicked.addListener((item, tab) => {
  chrome.tabs.sendMessage(tab.id, { data: contentById[item.menuItemId] });
});
