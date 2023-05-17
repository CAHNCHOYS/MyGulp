//Код табов js
//У родителя ссылок-таба должнен быть data-атрибут tab с именем родителя класса табов
//Также у ссылки таба должен быть класс tab-link и находится он должен на уровне перед родителем
//Первому табу добавляем класс current
//

const tabLinks = document.querySelectorAll(".tab-link");

if (tabLinks.length > 0) {
  for (const tabLink of tabLinks) {
    tabLink.addEventListener("click", function () {
      const parentList = this.closest("[data-tab]"); //Элемент родитель табов
      const tabLinksParents = Array.from(parentList.children);

      const currentTabIndex = tabLinksParents.indexOf(this);
      const tabsParent = document.querySelector(`.${parentList.dataset.tab}`);

      const allTabsToOpen = tabsParent.children;

      if (allTabsToOpen[currentTabIndex]) {
        parentList
          .querySelector("._active-link")
          .classList.remove("_active-link");

        tabsParent.querySelector(".current").classList.remove("current");

        allTabsToOpen[currentTabIndex].classList.add("current");

        this.classList.add("_active-link");
      }
    });
  }
}


