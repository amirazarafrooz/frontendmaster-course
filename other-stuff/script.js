const ball = document.querySelector('.ball')
console.log('ball');

popmotion.animate({
    from: "0px",
    to: "100px",
    repeat: Infinity,
    repeatType: "mirror",
    type: "spring",
    onUpdate(update) {
        console.log(update);
        ball.style.left = update;
    }
});