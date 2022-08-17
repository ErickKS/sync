// PRE LOADER

window.onload = () => {
    const layer = document.getElementById('layer')
    const body = document.querySelector('body')

    setTimeout(() => {
        body.style.overflowY = "visible"
        layer.style.opacity = '0';

        if (layer.style.opacity == 0) {
            setTimeout(() => {
                layer.style.display = "none";
            }, 500)
        }
    }, 1500)
}

// NAV

const btnMobile = document.getElementById('btn-mobile')
const nav = document.getElementById('navigation')

const dropBtn = document.getElementById('dropA')
const dropList = document.getElementById('dropUl')

function toggleMenu(event) {
    if (event.type === 'touchstart') event.preventDefault();
    nav.classList.toggle('active')

    document.documentElement.onclick = function(event){
        if (event.target !== dropBtn && event.target !== dropList) {
            if(window.screen.width <= 990) {
                dropBtn.classList.remove('active');
                dropList.classList.remove('active');
                nav.classList.remove('active');
            }
        }
    }
}

function dropdown() {
    dropBtn.classList.toggle('active');
    dropList.classList.toggle('active');
    
    if(window.screen.width > 990) {
        document.documentElement.onclick = function(event){
            if (event.target !== dropBtn && event.target !== dropList) {
                dropBtn.classList.remove('active');
                dropList.classList.remove('active');
            }
        }
    }
}

btnMobile.addEventListener('click', toggleMenu)
btnMobile.addEventListener('touchstart', toggleMenu)
dropBtn.addEventListener('click', dropdown);

// CLOSE NAV ON CLICK UL -> A 

for (const navLink of document.querySelectorAll('.navLink')) {
    navLink.addEventListener('click', () => {
        nav.classList.toggle('active')
    })
}

// NAV FIXED ON SCROLL  &&  SCROLL TO TOP BTN VISIBILITY

const btnUp = document.getElementById('arrowUp');
const menu = document.getElementById('nav');

(function () {
    window.addEventListener('scroll', function () {
        if (window.scrollY > 10) {
            menu.classList.add('navFixed');
        } else {
            menu.classList.remove('navFixed');
        }

        if (window.scrollY > 400) {
            btnUp.style.display = "block";
        } else {
            btnUp.style.display = "none";
        }
    });
})();

// SCROLL TO TOP EFFECT

const scrollTop = () => {
    window.scroll({
        top: 0
    });
};

btnUp.onclick = scrollTop;

// SCROLL NAV EFFECT

window.addEventListener('scroll', onScroll)

onScroll()
function onScroll() {
    activateMenuCurrentSection(description);
    activateMenuCurrentSection(features);
    activateMenuCurrentSection(screens);
    activateMenuCurrentSection(download);
}

function activateMenuCurrentSection(section) {
    const targetLine = scrollY + innerHeight / 2

    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionTopReachOrPassedTargetLine = targetLine >= sectionTop

    const sectionEndsAt = sectionTop + sectionHeight
    const sectionEndPassedTargetLine = sectionEndsAt <= targetLine

    const sectionBoundaries = sectionTopReachOrPassedTargetLine && !sectionEndPassedTargetLine

    const sectionId = section.getAttribute('id')
    const menuElement = document.querySelector(`.menu li a[href*=${sectionId}]`)

    menuElement.classList.remove('active')
    if (sectionBoundaries) {
        menuElement.classList.add('active')
    }
}

// LIGHTBOX

const layerLightbox = document.getElementById('lightbox__layer');
const lightbox = document.getElementById('lightbox');

function activeLightbox() {
    layerLightbox.classList.toggle('active')
    lightbox.classList.toggle('active')

    document.documentElement.onclick = function(event){
        if (event.target === layerLightbox) {
            layerLightbox.classList.toggle('active')
            lightbox.classList.toggle('active')
        }
    }
    document.onkeydown = function(event) {
        if(event.key === 'Escape') {
            layerLightbox.classList.remove('active')
            lightbox.classList.remove('active')
        }
    }
}

function closeLightbox() {
    layerLightbox.classList.toggle('active')
    lightbox.classList.toggle('active')
}

// DESCRIPTION ANIMATION 

const btnSchedule = document.getElementById('schedule')
const btnTracking = document.getElementById('tracking')
const btnOrganize = document.getElementById('organize')

const contentSchedule = document.getElementById('content__schedule')
const contentTracking = document.getElementById('content__tracking')
const contentOrganize = document.getElementById('content__organize')

function showSchedule() {
    if (btnTracking.classList.contains('active') || btnOrganize.classList.contains('active')) {
        btnTracking.classList.remove('active')
        btnOrganize.classList.remove('active')
        contentTracking.classList.remove('active')
        contentOrganize.classList.remove('active')

        btnSchedule.classList.add('active')
        contentSchedule.classList.add('active')
    }
}

function showTracking() {
    if (btnSchedule.classList.contains('active') || btnOrganize.classList.contains('active')) {
        btnSchedule.classList.remove('active')
        btnOrganize.classList.remove('active')
        contentSchedule.classList.remove('active')
        contentOrganize.classList.remove('active')

        btnTracking.classList.add('active')
        contentTracking.classList.add('active')
    }
}

function showOrganize() {
    if (btnSchedule.classList.contains('active') || btnTracking.classList.contains('active')) {
        btnSchedule.classList.remove('active')
        btnTracking.classList.remove('active')
        contentSchedule.classList.remove('active')
        contentTracking.classList.remove('active')

        btnOrganize.classList.add('active')
        contentOrganize.classList.add('active')
    }
}

// SLIDER SCREENS

$('.slider').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
        {
            breakpoint: 1240,
            settings: {
                slidesToShow: 4            
            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 769,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 565,
            settings: {
                slidesToShow: 1
            }
        },
    ]
});
