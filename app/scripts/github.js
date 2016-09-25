var element = document.querySelector('.github'),
    timer,
    mouseStopped;

var listener = function () {
    setTimeout(function() {
        clearTimeout(timer);
        timer=setTimeout(mouseStopped, 1000);
        element.classList.add('visible');
    }, 150);
};

var mouseStopped = function() {
    element.classList.remove('visible');
}

document.addEventListener('mousemove', listener, false);
