//Работа со спойлерами
//У родителей спойлеров добавляем атрибут data-spollers 
//Если хотим чтобы работал на экранах ниже или больше опр. значения то пишем в атрибуте число и ,min max соответсвтенно 
// data-spollers="800,max" - работает на экранах меньше 800 px
//Если должен работать всегда то оставляем пустым : data-spollers
//Если должен открываться одновременно только один спойлер то добавляем атрибут data-one-spoller
//Перед элементов который должен что-то открывать или закрвать добавляем элемент:
//  <button tabindex="-1" class="spollers__spoller" data-spoller>Max spoller</button>
// И после него само тело спойлера 



import { _slideDown, _slideUp, _slideToggle } from "./slideDown.js";

const spollersArray = document.querySelectorAll("[data-spollers]");
if (spollersArray.length > 0) {
  const regularSpollers = Array.from(spollersArray).filter((spoller) => {
    return !spoller.dataset.spollers.split(",")[0];
  });

  if (regularSpollers.length > 0) {
    initSpollers(regularSpollers);
  }

  const mediaSpollers = Array.from(spollersArray).filter((spoller) => {
    return spoller.dataset.spollers.split(",")[0];
  });

  if (mediaSpollers.length > 0) {
    const breakPoints = [];
    mediaSpollers.forEach((spoller) => {
      const params = spoller.dataset.spollers;
    
      const breakpoint = {};
      const paramsArray = params.split(",");
      breakpoint.value = paramsArray[0];
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
      breakpoint.item = spoller;
      breakPoints.push(breakpoint);
    });

    let mediaQueries = breakPoints.map(function (item) {
      return (
        "(" +
        item.type +
        "-width: " +
        item.value +
        "px)," +
        item.value +
        "," +
        item.type
      );
    });

    mediaQueries = mediaQueries.filter((item, index, self) => {
      return self.indexOf(item) === index;
    });

    mediaQueries.forEach((breakpoint) => {
      const paramsArray = breakpoint.split(",");
      const mediaBreakpoint = paramsArray[1];
      const mediaType = paramsArray[2];
      const matchMedia = window.matchMedia(paramsArray[0]);

      const spollersArray = breakPoints.filter((item) => {
        if(item.value === mediaBreakpoint && item.type === mediaType)
         return true;
      });
       
      matchMedia.addListener(function () {
        initSpollers(spollersArray, matchMedia);
      });

      initSpollers(spollersArray, matchMedia);
    });

  }

  function initSpollers(spollersArray, matchMedia = false) {
    spollersArray.forEach((spollersBlock) => {
    
      spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
      if (matchMedia.matches || !matchMedia) {
        spollersBlock.classList.add("_init");
        initSpollersBody(spollersBlock);
        spollersBlock.addEventListener("click", setSpollerAction);
      } else {
       
        spollersBlock.classList.remove("_init");
        initSpollersBody(spollersBlock, false);
        spollersBlock.removeEventListener("click", setSpollerAction);
      }
    });
  }

  function initSpollersBody(spollersBlock, hideSpollerBody = true) {
    const blockSpollers = spollersBlock.querySelectorAll("[data-spoller]");
    if (blockSpollers.length > 0) {
      blockSpollers.forEach((spoller) => {
        if (hideSpollerBody) {
          spoller.removeAttribute("tabindex");
          if (!spoller.classList.contains("_active")) {
            spoller.nextElementSibling.hidden = true;
          }
        } else {
          spoller.setAttribute("tabindex", "-1");
          spoller.nextElementSibling.hidden = false;
        }
      });
    }
  }

  function setSpollerAction(e) {
    const el = e.target;

    if (el.hasAttribute("data-spoller") || el.closest("[data-spoller]")) {
      const spollerTitle = el.hasAttribute("data-spoller")
        ? el
        : el.closest("[data-spoller]");
      const spollersBlock = spollerTitle.closest("[data-spollers]");
      const oneSpoller = spollersBlock.hasAttribute("data-one-spoller")
        ? true
        : false;

      if (!spollersBlock.querySelectorAll("._slide").length) {
        if (oneSpoller && !spollerTitle.classList.contains("_active")) {
          hideSpollerBody(spollersBlock);

        }
        spollerTitle.classList.toggle('_active');
        _slideToggle(spollerTitle.nextElementSibling,800);
      }
      e.preventDefault();
    }
  }

  function hideSpollerBody(spollerBlock) {
    const spollerActiveTitle = spollerBlock.querySelector('[data-spoller]._active');
    if(spollerActiveTitle) {
      spollerActiveTitle.classList.remove('_active');
      _slideUp(spollerActiveTitle.nextElementSibling,800);
    }

  }


}
