// functions for index.html

// array of all hidden-section elements
var sections = Array.from(document.querySelectorAll('.hidden-section'));

// init page when DOM is loaded
function pageInit() {
    window.addEventListener('scroll', scrollEvent);
    typewriterEffect();
}

// when page is scrolled, we check if each section is on screen
// and fade in accordingly
function scrollEvent() {
    console.log('scrolled');
    sections.forEach(function(section) {
        let sectionPos = section.getBoundingClientRect();
        if(sectionPos.bottom <= window.innerHeight) {
            section.classList.add('visible');
        }
    });
}

// renders characters of my h1 tag one at a time to create
// a typewriter effect
function typewriterEffect() {
    let h1 = document.querySelector('#typewriter-h1');
    let h1Text = 'Hi There, I\'m Jeremy';
    let ind = 0;

    let intID = setInterval(()=> {
        if(ind === h1Text.length) {
            clearInterval(intID);
            return;
        }
        if (h1Text[ind] === ' ') {
            h1.innerHTML += '&nbsp;';
        } else {
            h1.innerHTML += h1Text[ind];
        }
        ind++;
    }, 200);
}

export { pageInit }