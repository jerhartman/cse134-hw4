// module for the custom dialog used in part 3

// variable to track if a blog post is being edited
var blogBeingEdited;

function dialogEventInit() {
    addNewBlogEvent();
    addDialogCalcel();
    addSaveEvent();
    deleteCancelEvent();
    deleteOkEvent();
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
            currBlog.title = DOMPurify.sanitize(addBlogDialog.querySelector("#blog-title-input").value);
            // convert date to standard format
            let articleDate = new Date(addBlogDialog.querySelector("#blog-date-input").value);
            currBlog.date = articleDate.toISOString().substr(0, 10);

            currBlog.summary = DOMPurify.sanitize(addBlogDialog.querySelector("#blog-summary-input").value);
            currBlog.link = DOMPurify.sanitize(addBlogDialog.querySelector("#blog-link-input").value);
            // put object in array and put back in localstorage
            allBlogPosts[currIndex] = currBlog;
            localStorage.setItem('allBlogPosts', JSON.stringify(allBlogPosts));
        }
        // we are adding a new blog post
        else {
            let newPost = {};
            newPost.id = self.crypto.randomUUID();
            newPost.title = DOMPurify.sanitize(addBlogDialog.querySelector("#blog-title-input").value);
            // convert date to standard format
            let articleDate = new Date(addBlogDialog.querySelector("#blog-date-input").value);
            newPost.date = articleDate.toISOString().substr(0, 10);

            newPost.summary = DOMPurify.sanitize(addBlogDialog.querySelector("#blog-summary-input").value);
            newPost.link = DOMPurify.sanitize(addBlogDialog.querySelector("#blog-link-input").value);
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

// bind event to Cancel button in delete dialog 
function deleteCancelEvent() {
    let deleteBlogDialog = document.getElementById('delete-blog-dialog');
    let deleteCancelButton = document.getElementById('delete-cancel-button');
    deleteCancelButton.addEventListener('click', () => {
        blogBeingEdited = null;
        deleteBlogDialog.close();
        deleteBlogDialog.classList.add('hidden');
    });
}
// bind event to Ok button in delete dialog
function deleteOkEvent() {
    let deleteOkButton = document.getElementById('delete-ok-button');
    deleteOkButton.addEventListener('click', () => {
        let allBlogPosts = JSON.parse(localStorage.getItem('allBlogPosts'));
        allBlogPosts = allBlogPosts.filter(blog => blog.id !== blogBeingEdited);
        localStorage.setItem('allBlogPosts', JSON.stringify(allBlogPosts));
        document.getElementById(`${blogBeingEdited}`).remove();
        blogBeingEdited = null;
        let deleteBlogDialog = document.getElementById('delete-blog-dialog');
        deleteBlogDialog.close();
        deleteBlogDialog.classList.add('hidden');
    });
}

// once save is clicked, this function updates the HTML on the screen 
function editBlogHTML(blogObj) {
    let blogPost;
    // set target article to the existing blog post
    if(blogBeingEdited) {
        blogPost = document.getElementById(`${blogBeingEdited}`);
        blogPost.querySelector('.blog-title').innerText = blogObj.title;
        blogPost.querySelector('.blog-date').innerText = blogObj.date;
        blogPost.querySelector('.blog-summary').innerText = blogObj.summary;
        blogPost.querySelector('.blog-link').href = blogObj.link;
    }
    // append new article to page 
    else {
        let blogTemplate = document.getElementById('blog-template');
        let blogPostBox = document.getElementById('blog-post-box');
        blogPost = blogTemplate.content.cloneNode(true);
        blogPost.children[0].setAttribute('id', blogObj.id);
        blogPost.querySelector('.blog-title').innerText = blogObj.title;
        blogPost.querySelector('.blog-date').innerText = blogObj.date;
        blogPost.querySelector('.blog-summary').innerText = blogObj.summary;
        blogPost.querySelector('.blog-link').href = blogObj.link;
        blogPost.querySelector('.edit-button').addEventListener('click', () => {
            editEvent(blogObj.id);
        });
        blogPost.querySelector('.delete-button').addEventListener('click', () => {
            deleteEvent(blogObj.id);
        });
        blogPostBox.appendChild(blogPost);
    }
}

// called when the delete button is clicked for a blog post
// takes the blog id as input
function deleteEvent(id) {
    blogBeingEdited = id;
    let deleteBlogDialog = document.getElementById('delete-blog-dialog');

    // make dialog visible
    deleteBlogDialog.showModal();
    deleteBlogDialog.classList.remove('hidden');
}

// called when user wants to edit a blog post
// find blog in storage and populate inputs with blog data
function editEvent(id) {
    blogBeingEdited = id;
    let addBlogDialog = document.getElementById('add-blog-dialog');
    let blogArr = JSON.parse(localStorage.getItem('allBlogPosts'));
    let currBlog = blogArr.find(blog => blog.id == id);
    console.log(currBlog);
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

export { dialogEventInit, editEvent, deleteEvent }