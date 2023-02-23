// main file for part 3, the blog post app

// import dialog module functions
import { dialogEventInit, editEvent, deleteEvent } from '/scripts/cruddialog.js';

// // blog array used to store all blogs
// let allBlogPosts = [];
// // generate example blog post
// let blogID = self.crypto.randomUUID();
// let blogExample = {
//     id: blogID,
//     title: 'Real Housewives Reunion Turns Deadly',
//     date: '2000-11-03',
//     summary: 'In this season finale of The Real Housewives of Beverly Hills, Kyle Richards takes revenge against Lisa Vanderpump.',
//     link: 'www.example.com'
// };
// // add blog post to allBlogPosts
// allBlogPosts.push(blogExample);
// // put blogArr in local storage
// localStorage.setItem('allBlogPosts', JSON.stringify(allBlogPosts));

// before rendering the page, check local storage to see if the user
// has already loaded the page before. if not, we add to local storage
// the 5 top articles using the news api
function checkLocalStorage() {
    let allBlogPosts = JSON.parse(localStorage.getItem('allBlogPosts'));
    // check if there are blogs in localstorage
    if(allBlogPosts) {
        console.log('blogs found');
        return;
    }
    // if not, we add blogs from the news api
    else {
        var url = 'https://newsapi.org/v2/top-headlines?country=us&general&q=&pageSize=20&page=1e&apiKey=9dec0d80721a49b282b5b971f8a352ef';
        var req = new Request(url);
        fetch(req)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            // take first 5 articles from json data
            let articles = json.articles.slice(0, 5);
            // array to add blogs to, then add to localstorage
            let blogArr = [];
            // iterate over articles and extract desired data
            for (var i = 0; i < articles.length; i++) {
                let blogPost = {
                    id: self.crypto.randomUUID(),
                    title: articles[i].title,
                    date: articles[i].publishedAt,
                    summary: articles[i].description,
                    link: articles[i].url
                };
                // add blog post object to blogArr
                blogArr.push(blogPost);
            }
            // add blog posts to localstorage
            localStorage.setItem('allBlogPosts', JSON.stringify(blogArr));
        })
        // catch any errors
        .catch(function(error) {
        console.log(error);
        });
    }
}


// run when page loads,
// populate page with blogs from storage
function pageInit() {
    // check local storage for blogs
    checkLocalStorage();
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

export { pageInit }