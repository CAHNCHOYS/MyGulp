//код js для сайта
window.onload = () => {

  //Код бургера-----------------------------------------------
  const headerBurgerIcon = document.querySelector(".burger");
  const burgerMenu = document.querySelector(".menu class");
  if (headerBurgerIcon) {
    headerBurgerIcon.addEventListener("click", function () {
      headerBurgerIcon.classList.toggle("_active");
      document.body.classList.toggle("_isLocked");
      burgerMenu.classList.toggle("_active");
    });
  }
  //---------------------------------------------------------




  
};

