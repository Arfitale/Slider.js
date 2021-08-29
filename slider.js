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

        checkIndex(index, max, state) {
            let addition = index + 1;
            let subtract = index - 1;

            if (state) {
                return addition === max ? 0 : addition;
            } else {
                return subtract < 0 ? max - 1 : subtract;
            }
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

        slideMove(mainSlider, len) {
            const index = this.getCurrentIndex(mainSlider)
            const newIndex = this.checkIndex(index, len, 1);
            let movePos = index * this.width;

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

                // animate slider
                this.slideMove(mainSlider, len)
                this.animateSlider(mainSlider, len);

            });
        }
    }

    const desktopSlider = new Slider(820, 410, "slider-desktop", 8000).slider();
    const sliderMobile = new Slider(420, 210, "slider-mobile", 5000).slider();

}());