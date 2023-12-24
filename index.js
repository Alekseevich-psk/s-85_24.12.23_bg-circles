(function () {
    const circlesWrap = document.querySelector(".circles");
    if (!circlesWrap) return;

    const circleClass = "circles__circle";
    const circleHTML = `<div class="${circleClass}"></div>`;
    const countCircle = getRandom(3, 10);
    const circlesInitPosition = [];
    const circlesInitWidth = [];

    const resValue = {
        top: getRandom(50, 90),
        left: getRandom(5, 40),
        width: getRandom(1, 10),
    };

    let circles = null;
    let scroll = Math.ceil(window.scrollY);

    function getRandom(min, max) {
        return Math.ceil(Math.random() * (max - min) + min);
    }

    function createCircle() {
        for (let i = 0; i < countCircle; i++) {
            circlesWrap.insertAdjacentHTML("beforeend", circleHTML);
        }

        return circlesWrap.querySelectorAll("." + circleClass);
    }

    function newPositionForCircles(circles) {
        circles.forEach((circle) => {
            const initPosition = {
                top: 0,
                left: 0,
            };

            initPosition.top = getRandom(0, 100);
            initPosition.left = getRandom(0, 100);

            circle.style.top = initPosition.top + "%";
            circle.style.left = initPosition.left + "%";

            circlesInitPosition.push(initPosition);
        });
    }

    function newSizeForCircles(circles) {
        circles.forEach((circle) => {
            const number = getRandom(0, 30);
            circle.style.width = number + "%";
            circle.style.paddingBottom = number + "%";

            circlesInitWidth.push(number);
        });
    }

    function newBgColorForCircles(circles) {
        circles.forEach((circle) => {
            const letters = "0123456789ABCDEF";
            let color = "#";

            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }

            circle.style.backgroundColor = color;
        });
    }

    function setCircleInitPosition(circles) {
        circles.forEach((circle) => {
            const initPosition = [];
            const rect = circle.getBoundingClientRect();
            
            initPosition.push(Math.ceil(rect.y));
            initPosition.push(Math.ceil(rect.x));
            circlesInitPosition.push(initPosition);
        });
    }

    function getAbsValue(elValue, count, maxValue) {
        const difValue = elValue - maxValue;
        const step = (count / 100) * Math.abs(difValue);
        const res = difValue < 0 ? elValue + step : elValue - step;

        if (count <= 100) return res;
        return maxValue;
    }

    function transformAnimation(index, scroll) {
        const elPosition = circlesInitPosition[index];
        const elWidth = circlesInitWidth[index];
        const elSize = getAbsValue(elWidth, scroll, resValue.width) + "%";

        circles[index].style.top = getAbsValue(elPosition.top, scroll, resValue.top) + "%";
        circles[index].style.left = getAbsValue(elPosition.left, scroll, resValue.left) + "%";
        circles[index].style.width = elSize;
        circles[index].style.paddingBottom = elSize;
    }

    function init() {
        circles = createCircle();
        newPositionForCircles(circles);
        newSizeForCircles(circles);
        newBgColorForCircles(circles);
        setCircleInitPosition(circles);
    }

    init();

    window.addEventListener("scroll", () => {
        scroll = Math.ceil(window.scrollY / 10);

        circles.forEach((circle, index) => {
            transformAnimation(index, scroll);
        });
    });
})();
