// main file for part 3, the blog post app

// import dialog module functions
import { dialogEventInit, editEvent, deleteEvent } from '/scripts/cruddialog.js';
import { newsAPIkey } from '/scripts/keys.js';

// before rendering the page, check local storage to see if the user
// has already loaded the page before. if not, we add to local storage
// the 5 top articles using the news api
function checkLocalStorage() {
    return new Promise((resolve, reject) => {
        let blogsFound = JSON.parse(localStorage.getItem('allBlogPosts'));
        // check if there are blogs in localstorage
        if(blogsFound) {
            console.log('blogs found');
            resolve(blogsFound);
        }
        // if not, we add blogs from the news api
        else {
            let url = 'https://newsapi.org/v2/top-headlines?' +
            'sources=bbc-news,cnn,nbc-news,abc-news&' +
            'apiKey=' + newsAPIkey;

            let req = new Request(url);
            fetch(req)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                // take first 5 articles from json data
                let articles = json.articles.slice(0, 10);
                console.log(articles);
                // array to add blogs to, then add to localstorage
                let allBlogPosts = [];
                // iterate over articles and extract desired data
                for (var i = 0; i < articles.length; i++) {
                    let articleDate = new Date(articles[i].publishedAt);
                    let formatDate = articleDate.toLocaleString('en-US');
                    let blogPost = {
                        id: self.crypto.randomUUID(),
                        title: articles[i].title,
                        date: formatDate,
                        summary: articles[i].description,
                        link: articles[i].url
                };
                    // add blog post object to blogArr
                    allBlogPosts.push(blogPost);
                }
                // add blog posts to localstorage
                localStorage.setItem('allBlogPosts', JSON.stringify(allBlogPosts));
                resolve(allBlogPosts);
            })
            // catch any errors
            .catch(function(error) {
                console.log(error);
                reject(error);
            });
        }
    });
} 

// run when page loads,
// populate page with blogs from storage
function pageInit() {
    // check local storage for blogs
    checkLocalStorage()
    .then(function(allBlogPosts) {
        // render all blogs in local storage
        renderBlogs(allBlogPosts);
        // add event listener to Add Blog Post button
        dialogEventInit();
    });

    // // get blog post array from local storage (implement at end)
    // let allBlogPosts = JSON.parse(localStorage.getItem('allBlogPosts'));
    // // render all blogs in local storage
    // renderBlogs(allBlogPosts);
    // // add event listener to Add Blog Post button
    // dialogEventInit();
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