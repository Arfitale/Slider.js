(function() {
    class Slider {
        constructor(width, height, refClass, interval = 3000) {
            this.width = width;
            this.height = height;
            this.refClass = refClass;
            this.interval = interval;

        }

        getSliderCtr() {
            return document.querySelectorAll(`.${this.refClass}`);
        }

        getCurrentIndex(mainSlider) {
            return Number(mainSlider.getAttribute("data-current"));
        }
        setCurrentIndex(mainSlider, replace) {
            mainSlider.setAttribute("data-current", `${replace}`);
        }


        repositionGallery(sliderGallery) {
            sliderGallery.forEach(gallery => {
                const index = Number(gallery.getAttribute("data-index"));

                // determine dimension of slider gallery
                gallery.style.width = `${this.width}px`;
                gallery.style.height = `${this.height}px`;

                // Set position
                const posX = index * this.width;
                gallery.style.left = `${posX}px`;
            });
        }

        initializeDataSlider(mainSlider) {
            mainSlider.setAttribute("data-current", "0");
        }

        slideMove(mainSlider, len, isRight = true) {
            const index = this.getCurrentIndex(mainSlider)

            // Get new index by slide move direction
            const checkAutoSlideIndex = (index, len, isRight) => {
                if (isRight) {
                    const addition = ++index;
                    return addition >= len ? 0 : addition;
                }
                const subtract = --index;
                return index < 0 ? len - 1 : subtract;
            }
            let newIndex = checkAutoSlideIndex(index, len, isRight);
            let movePos = this.width * newIndex;
            
            // perform position of currrent gallery
            mainSlider.style.transform = `translateX(-${movePos}px)`;
            
            // set new current index
            this.setCurrentIndex(mainSlider, newIndex);
        }

        animateSlider(mainSlider, len) {
            setInterval(() => {
                this.slideMove(mainSlider, len);
            }, this.interval);
        }

        slider() {
            let containers = this.getSliderCtr();
            
            containers.forEach(ctr => {
                const mainSlider = ctr.querySelector(".main-slider");
                const sliderGallery = ctr.querySelectorAll(".slider-gallery");
                const leftControl = ctr.querySelector(".left-slide-control");
                const rightControl = ctr.querySelector(".right-slide-control");

                const len = sliderGallery.length;
                
                // determine dimension of main container
                ctr.style.width = `${this.width}px`;
                ctr.style.height = `${this.height}px`;

                
                // determine dimension of main slider
                const totalWidth = Number(len) * Number(this.width);
                mainSlider.style.width = `${totalWidth}px`;
                mainSlider.style.height = `${this.height}px`;

                // reposition each gallery to each pos
                this.repositionGallery(sliderGallery);

                // initialize current index of slider
                this.initializeDataSlider(mainSlider);

                // set slider control event
                leftControl.addEventListener("click", e => {
                    this.slideMove(mainSlider, len, false);
                });
                rightControl.addEventListener("click", e => {
                    this.slideMove(mainSlider, len);
                });

                // animate slider
                setTimeout(() => {
                    this.slideMove(mainSlider, len);
                    this.animateSlider(mainSlider, len);
                }, this.interval);

            });
        }
    }

    const sliderDesktop = new Slider(820, 410, "slider-desktop", 8000).slider();

}());