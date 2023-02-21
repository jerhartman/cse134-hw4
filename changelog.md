This document will contain all changes made to my site since HW3 as well as explanations of my code

Changes:
1. A new navigation link, called HW4, was added to the index.html navbar. This link can be used to access my HW4 pages.
2. Added new html, javascript, and markdown files for the assignement.

Part 1:
I used a script tag to insert javascript from scripts/script.js. I add event listeners to all buttons and use setTimeout to give the DOM time to clear the output element's innerHtml before the prompts appear to the user. I found that some delay was needed or else the output would still be visible on the page, which is not the case in the demo video.

Part 2:
The customdialogs.js file contains my exported functions and variables used for my custom dialogs. I put the custom dialogs on the same page as the native dialogs from part 1. The initCustomDialog() function runs the functions that set event listeners on all the buttons. The global variable currentDialog is set whenever one of the main buttons is clicked. This is then used in the cancel and ok event handlers to display the correct text in the output element.