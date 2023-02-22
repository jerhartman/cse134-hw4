// module for the custom dialog used in part 3

// variable to track if a blog post is being edited
var blogBeingEdited;

function dialogEventInit() {
    addNewBlogEvent();
    addDialogCalcel();
    addSaveEvent();
}

// adds event listener to "Add Blog Post" button
function addNewBlogEvent() {
    let addBlogButton = document.getElementById('add-blog-button');
    let addBlogDialog = document.getElementById('add-blog-dialog');
    addBlogButton.addEventListener('click', () => {
        blogBeingEdited = null;
        clearDialogInput(addBlogDialog);
        addBlogDialog.showModal();
        addBlogDialog.classList.remove('hidden');
    });
}

// implements cancel button event
// the same button is used to cancel the add/edit dialog
function addDialogCalcel() {
    let addDialogCalcelButton = document.getElementById('add-cancel-button');
    let addBlogDialog = document.getElementById('add-blog-dialog');
    addDialogCalcelButton.addEventListener('click', () => {
        blogBeingEdited = null;
        addBlogDialog.close();
        addBlogDialog.classList.add('hidden');
        clearDialogInput(addBlogDialog);
    });
}

// adds event listener for the save button of the add-blog-dialog
// this event is triggered when a new blog or blog edit is saved
function addSaveEvent() {
    let addSaveButton = document.getElementById('add-save-button');
    addSaveButton.addEventListener('click', () => {
        // get dialog and blogArr
        let addBlogDialog = document.getElementById('add-blog-dialog');
        let allBlogPosts = JSON.parse(localStorage.getItem('allBlogPosts'));
        let currBlog;
        // check if we are editing or creating new post
        if(blogBeingEdited) {
            // update blog with new user inputs
            currBlog = allBlogPosts.find(blog => blog.id == blogBeingEdited);
            let currIndex = allBlogPosts.findIndex(blog => blog.id == blogBeingEdited);
            currBlog.title = addBlogDialog.querySelector("#blog-title-input").value;
            currBlog.date = addBlogDialog.querySelector("#blog-date-input").value;
            currBlog.summary = addBlogDialog.querySelector("#blog-summary-input").value;
            currBlog.link = addBlogDialog.querySelector("#blog-link-input").value;
            // put object in array and put back in localstorage
            allBlogPosts[currIndex] = currBlog;
            localStorage.setItem('allBlogPosts', JSON.stringify(allBlogPosts));
        }
        // we are adding a new blog post
        else {
            let newPost = {};
            newPost.id = self.crypto.randomUUID();
            newPost.title = addBlogDialog.querySelector("#blog-title-input").value;
            newPost.date = addBlogDialog.querySelector("#blog-date-input").value;
            newPost.summary = addBlogDialog.querySelector("#blog-summary-input").value;
            newPost.link = addBlogDialog.querySelector("#blog-link-input").value;
            allBlogPosts.push(newPost);
            localStorage.setItem('allBlogPosts', JSON.stringify(allBlogPosts));
            currBlog = newPost;
        }
        // render new HTML from user input
        editBlogHTML(currBlog);
        // reset blobal var to null once done
        blogBeingEdited = null;
        // close dialog and reset inputs
        addBlogDialog.close();
        addBlogDialog.classList.add('hidden');
        clearDialogInput(addBlogDialog);
    });
}

// once save is clicked, this function updates the HTML on
// the screen 
function editBlogHTML(blogObj) {
    let blogPost;
    // set target article to the existing blog post
    if(blogBeingEdited) {
        blogPost = document.getElementById(`${blogBeingEdited}`);
        blogPost.querySelector('.blog-title').innerHTML = blogObj.title;
        blogPost.querySelector('.blog-date').innerHTML = blogObj.date;
        blogPost.querySelector('.blog-summary').innerHTML = blogObj.summary;
        blogPost.querySelector('.blog-link').href = blogObj.link;
    }
    // append new article to page 
    else {
        let blogTemplate = document.getElementById('blog-template');
        let blogPostBox = document.getElementById('blog-post-box');
        blogPost = blogTemplate.content.cloneNode(true);
        blogPost.children[0].setAttribute('id', blogObj.id);
        blogPost.querySelector('.blog-title').innerHTML = blogObj.title;
        blogPost.querySelector('.blog-date').innerHTML = blogObj.date;
        blogPost.querySelector('.blog-summary').innerHTML = blogObj.summary;
        blogPost.querySelector('.blog-link').href = blogObj.link;
        blogPostBox.appendChild(blogPost)
    }
}

// called when the delete button is clicked for a blog post
// takes the blog id as input
function deleteEvent(id) {
    alert(id)
}

// called when user wants to add or edit a blog post
// takes the blog id as input, or 0 if we are adding a new blog
function editEvent(id) {
    blogBeingEdited = id;
    let addBlogDialog = document.getElementById('add-blog-dialog');
    let blogArr = JSON.parse(localStorage.getItem('allBlogPosts'));
    let currBlog = blogArr.find(blog => blog.id == id);
    // set input fields for user to edit
    addBlogDialog.querySelector("#blog-title-input").value = currBlog.title;
    addBlogDialog.querySelector("#blog-date-input").value = currBlog.date;
    addBlogDialog.querySelector("#blog-summary-input").value = currBlog.summary;
    addBlogDialog.querySelector("#blog-link-input").value = currBlog.link;
    // make dialog box visible
    addBlogDialog.showModal();
    addBlogDialog.classList.remove('hidden');
}

// call this to clear user input from the add-blog-dialog element
function clearDialogInput(addBlogDialog) {
    addBlogDialog.querySelector('#blog-title-input').value = '';
    addBlogDialog.querySelector('#blog-date-input').value = '';
    addBlogDialog.querySelector('#blog-summary-input').value = '';
    addBlogDialog.querySelector('#blog-link-input').value = '';
}

export { dialogEventInit, editEvent, deleteEvent, addNewBlogEvent, blogBeingEdited }