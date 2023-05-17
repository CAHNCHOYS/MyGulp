



function animCounterInit(counterItems) {
   let digitsCounters = counterItems
     ? counterItems
     : document.querySelectorAll("[data-anim-counter]");
   console.log(digitsCounters[0]);
   if (digitsCounters) {
     digitsCounters.forEach((element) => {
       counterAnimation(element);
     });
   }
 }
 
 function counterAnimation(counter) {
   let startTimestamp = null;
   const duration = parseInt(counter.dataset.animCounter)
     ? parseInt(counter.dataset.animCounter)
     : 1000;
   console.log(duration);
   const startValue = parseInt(counter.innerHTML);
   const startPostion = 0;
   const step = (timestamp) => {
     if (!startTimestamp) startTimestamp = timestamp;
     const progress = Math.min((timestamp - startTimestamp) / duration, 1);
     counter.innerHTML = Math.floor(progress * (startPostion + startValue));
     if (progress < 1) {
       window.requestAnimationFrame(step);
     }
   };
   window.requestAnimationFrame(step);
 }
 

