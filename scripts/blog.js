// main file for part 3, the blog post app

// import dialog module functions
import { dialogEventInit, editEvent, deleteEvent, addNewBlogEvent } from '/scripts/cruddialog.js';

// blog array used to store all blogs
let allBlogPosts = [];
// generate example blog post
let blogID = self.crypto.randomUUID();
let blogExample = {
    id: blogID,
    title: 'Real Housewives Reunion Turns Deadly',
    date: '2000-11-03',
    summary: 'In this season finale of The Real Housewives of Beverly Hills, Kyle Richards takes revenge against Lisa Vanderpump.',
    link: 'www.example.com'
};
// add blog post to blogArr
allBlogPosts.push(blogExample);
// put blogArr in local storage
localStorage.setItem('allBlogPosts', JSON.stringify(allBlogPosts));
// run when page loads,
// populate page with blogs from storage
function pageInit() {
    // get blog post array from local storage (implement at end)
    let allBlogPosts = JSON.parse(localStorage.getItem('allBlogPosts'));
    // render all blogs in local storage
    renderBlogs(allBlogPosts);
    // add event listener to Add Blog Post button
    dialogEventInit();
}

// populate page with blogs
function renderBlogs(blogArr) {
    let blogTemplate = document.getElementById('blog-template');
    let blogPostBox = document.getElementById('blog-post-box');
    blogArr.forEach((blogObj) => {
        // clone template content
        let blogPost = blogTemplate.content.cloneNode(true);
        // update template values with blogObj values
        blogPost.children[0].setAttribute('id', blogObj.id);
        blogPost.querySelector('.blog-title').innerHTML = blogObj.title;
        blogPost.querySelector('.blog-date').innerHTML = blogObj.date;
        blogPost.querySelector('.blog-summary').innerHTML = blogObj.summary;
        blogPost.querySelector('.blog-link').href = blogObj.link;
        // add event listeners to blog post buttons
        let editButton = blogPost.querySelector('.edit-button');
        let deleteButton = blogPost.querySelector('.delete-button');
        editButton.addEventListener('click', function() {
            editEvent(blogObj.id);
        });
        deleteButton.addEventListener('click', function() {
            deleteEvent(blogObj.id);
        });
        // place blog post in box
        blogPostBox.appendChild(blogPost);
    });
}

export { pageInit, renderBlogs }