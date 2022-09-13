let slider = tns({
    container : ".sliders",
    "slideBy" : 1, 
    "speed" : 400,
    "nav": false,
    controlsContainer: "#controls",
    prevButton: ".previous",
    nextButton: ".next",
    responsive: {
        1600: {
            items: 5,
            gutter: 15
        },
        1200: {
            items: 5,
            gutter: 10
        },
        1024: {
            items: 4,
            gutter: 15
        },
        768: {
            items: 3,
            gutter: 5
        },
        480: {
            items: 2,
            gutter: 10
        }
    }
})