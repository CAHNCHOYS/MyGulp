

//заготавка под свайпер и объявление и адаптация слайдеров ==============
let sliders = document.querySelectorAll('._swiper');
if(sliders.length>0){
    for (let index = 0; index < sliders.length; index++) {
        let slider = sliders[index];
        if(!slider.classList.contains('swiper-bild')){
             let sliderItems = slider.children;
           
             if(sliderItems.length>0){
                 for (const child of sliderItems) {
                        child.classList.add('swiper-slide');
                 }
             }

             let slider_content  = slider.innerHTML;
             let SwiperWrapper = document.createElement('div');
             SwiperWrapper.classList.add('swiper-wrapper');
             SwiperWrapper.innerHTML = slider_content;
             slider.innerHTML = '';
             slider.appendChild(SwiperWrapper);
             slider.classList.add('swiper-bild');


            let btnPrev = document.createElement('div');
             btnPrev.className = 'swiper-button-prev';
             slider.appendChild(btnPrev);
             let btnNext = document.createElement('div');
             btnNext.className = 'swiper-button-next';
             slider.appendChild(btnNext);

             if(slider.classList.contains('_swiper_scroll')){
                 let sliderScroll =  document.createElement('div');
                 sliderScroll.classList.add('swiper-scrollbar');
                 slider.appendChild(sliderScroll);
             }
             
            
             
        }
    }

}
    





function slide_Bind_content(params) {
    
}















//=============================================================