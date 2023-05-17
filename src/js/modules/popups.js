

//Код попапов
//В попапе должен быть класс popup (самый верхний)
// В контенкте попапа должен быть класс popup-content

const popupOpenButtons = document.querySelectorAll("[data-popup]");
const popupCloseBtn = document.querySelectorAll("[data-close]");
const burger = document.querySelector(".header__burger");

if (popupOpenButtons.length > 0) {
  for (const openPopup of popupOpenButtons) {
    const popupClass = openPopup.dataset.popup;
    const popupToOpen = document.querySelector(`#${popupClass}`);
    popupToOpen.addEventListener("click", function (e) {
      if (!e.target.closest(".popup-content")) {
        popupToOpen.classList.remove("_active");

        if (!burger.classList.contains("_active"))
          document.body.classList.remove("_isLocked");
        popupToOpen.querySelector(".popup-content").classList.remove("_active");
      }
    });

    if (popupToOpen) {
      openPopup.addEventListener("click", function () {
        popupToOpen.classList.add("_active");

        document.body.classList.add("_isLocked");
        popupToOpen.querySelector(".popup-content").classList.add("_active");
      });
    }
  }

  for (const btn of popupCloseBtn) {
    btn.addEventListener("click", function () {
      btn.closest(".popup").classList.remove("_active");
      btn
        .closest(".popup")
        .querySelector(".popup-content")
        .classList.remove("_active");
      if (!burger.classList.contains("_active"))
        document.body.classList.remove("_isLocked");
    });
  }
}
