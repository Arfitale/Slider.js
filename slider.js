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

        checkAutoSlideIndex = (index, len, isRight) => {
            if (isRight) {
                const addition = ++index;
                return addition >= len ? 0 : addition;
            }
            const subtract = --index;
            return index < 0 ? len - 1 : subtract;
        }

        slideMove(mainSlider, len, isRight = true) {
            const index = this.getCurrentIndex(mainSlider)

            // Get new index by slide move direction
            let newIndex = this.checkAutoSlideIndex(index, len, isRight);
            let movePos = this.width * newIndex;
            
            // perform position of currrent gallery
            mainSlider.style.transform = `translateX(-${movePos}px)`;
            
            // set new current index
            this.setCurrentIndex(mainSlider, newIndex);
        }

        
        sliderThumbsMover(thumbs, desc, currentIndex, len, isRight = false) {
            const indexBefore = this.checkAutoSlideIndex(currentIndex, len, isRight);
            // remove functional class before current gallery
            thumbs[indexBefore].classList.remove("active");
            desc[indexBefore].classList.remove("show");
            
            // add functional class current gallery
            thumbs[currentIndex].classList.add("active");
            desc[currentIndex].classList.add("show");
        }

        animateSlider(mainSlider, thumbsDescs, thumbsGalleries, len) {
            setInterval(() => {
                this.slideMove(mainSlider, len);
                this.sliderThumbsMover(thumbsGalleries, thumbsDescs, this.getCurrentIndex(mainSlider), len);
            }, this.interval);
        }

        updateSlider(index, mainSlider, thumbsGalleries, thumbsDescs, len) {
            const activeClass = [...thumbsGalleries].filter(thumb => thumb.classList.contains("active"))[0];
            const showClass = [...thumbsDescs].filter(desc => desc.classList.contains("show"))[0];

            // update main slider
            const movePos = this.width * index;
            mainSlider.style.transform = `translateX(-${movePos}px)`;

            // update thumbs
            activeClass.classList.remove("active");
            showClass.classList.remove("show");

            thumbsGalleries[index].classList.add("active");
            thumbsDescs[index].classList.add("show");
            
            // set new current index
            this.setCurrentIndex(mainSlider, index);
        }
        
        slider() {
            let containers = this.getSliderCtr();
            
            containers.forEach(ctr => {
                const mainSlider = ctr.querySelector(".main-slider");
                const sliderGallery = ctr.querySelectorAll(".slider-gallery");
                const leftControl = ctr.querySelector(".left-slide-control");
                const rightControl = ctr.querySelector(".right-slide-control");
                
                // Thumbs
                const thumbsGalleries = ctr.querySelectorAll(".thumbs-gallery");
                const thumbsDescs = ctr.querySelectorAll(".desc-gallery");

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
                    this.sliderThumbsMover(thumbsGalleries, thumbsDescs, this.getCurrentIndex(mainSlider), len, true);
                });
                rightControl.addEventListener("click", e => {
                    this.slideMove(mainSlider, len);
                    this.sliderThumbsMover(thumbsGalleries, thumbsDescs, this.getCurrentIndex(mainSlider), len);
                });

                // define thumbs image event when clicked
                thumbsGalleries.forEach(thumbs => {
                    thumbs.addEventListener("click", e => {
                        const index = Number(thumbs.getAttribute("data-index"));

                        // set current index of thumbs and main slider
                        this.updateSlider(index, mainSlider, thumbsGalleries, thumbsDescs, len);
                    });
                });

                // initialize styles slider thumbs
                this.sliderThumbsMover(thumbsGalleries, thumbsDescs, this.getCurrentIndex(mainSlider), len);

                // animate slider
                setTimeout(() => {
                    this.slideMove(mainSlider, len);
                    this.sliderThumbsMover(thumbsGalleries, thumbsDescs, this.getCurrentIndex(mainSlider), len);
                    this.animateSlider(mainSlider, thumbsDescs, thumbsGalleries, len);
                }, this.interval);

            });
        }
    }

    const sliderDesktop = new Slider(820, 410, "slider-desktop", 8000).slider();

}());