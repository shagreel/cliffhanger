let numberBuffer = '';
let keyCount = 0;

document.addEventListener('keydown', function (event) {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        numberBuffer += key;
        keyCount += 1;
        if (keyCount > 1) {
            const number = parseInt(numberBuffer, 10);
            moveImage(number)
            numberBuffer = ''; // Clear the buffer
            keyCount = 0;
        }
    } else if (event.key === 'Escape') {
        numberBuffer = '';
        keyCount = 0;
    }
});

function moveImage(number) {
    const audio = document.getElementById("song");
    audio.play();
    let imgElement = document.getElementById('cliffhanger');
    let targetX = imgElement.offsetLeft + (45 * number);
    let targetY = imgElement.offsetTop + (23 * number);
    let duration = number * 1100;

    let startX = imgElement.offsetLeft;
    let startY = imgElement.offsetTop;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) {
            startTime = currentTime;
        }

        let timeElapsed = currentTime - startTime;
        let progress = Math.min(timeElapsed / duration, 1); // Ensure progress doesn't exceed 1

        // Apply easing function for smooth movement (e.g., easeInOutQuad)
        progress = easeInOutQuad(progress);

        let newX = startX + (targetX - startX) * progress;
        let newY = startY - (targetY - startY) * progress;

        imgElement.style.left = newX + 'px';
        imgElement.style.top = newY + 'px';

        if (progress < 1) {
            if (imgElement.offsetLeft > 1525) {
                imgElement.classList.add('rotating');

            } else {
                requestAnimationFrame(animation);
            }
        } else {
            audio.pause();
        }
    }

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    requestAnimationFrame(animation);
}
