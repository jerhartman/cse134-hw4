# cse134-hw4

Part 1:
I used a script tag to insert javascript from scripts/script.js. I add event listeners to all buttons and use setTimeout to give the DOM time to clear the output element's innerHtml before the prompts appear to the user. I found that some delay was needed or else the output would still be visible on the page, which is not the case in the demo video.

Part 2:
The customdialogs.js file contains my exported functions and variables used for my custom dialogs. I put the custom dialogs on the same page as the native dialogs from part 1. The initCustomDialog() function runs the functions that set event listeners on all the buttons. The global variable currentDialog is set whenever one of the main buttons is clicked. This is then used in the cancel and ok event handlers to display the correct text in the output element.

Part 3:
My CRUD page has multiple components. The first is blog.js, which renders the blog posts when the page is loaded. First, localstorage is checked to see if the user has visited the page before. If not, the News API is used to fetch the top headlines and they are placed into localstorage. Then we iterate over the array from localstorage and display all the blog posts.
The second component is druddialog.js, which has all the button event listener functions for displaying the dialog and updating the page with edits or user-added blogs.

Part 4:
I added a basic style that matches my main website. The most important styles are the grid layout of the blog posts and the buttons with icons and hover transitions/translations.