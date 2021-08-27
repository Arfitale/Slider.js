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

        checkCount(counter, max) {
            if (counter >= max - 1) {
                counter = 0;
            } else if (counter < 0) {
                counter = max - 1;
            } else {
                counter++;
            }
            return counter
        }

        slideMove(counter, mainSlider) {
            let movePos = counter * this.width;
            mainSlider.style.transform = `translateX(-${movePos}px)`;
        }

        slideShow(len, mainSlider) {
            let counter = 0;
            setInterval(() => {
                this.slideMove(counter, mainSlider);
                counter = this.checkCount(counter, len);
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

                // Animate Slider
                this.slideShow(len, mainSlider);
            });
        }
    }

    const desktopSlider = new Slider(820, 410, "slider-desktop", 3000).slider();
    const sliderMobile = new Slider(420, 210, "slider-mobile", 1000).slider();

}());