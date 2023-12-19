"use strict"

window.addEventListener(`load`, () => {

  // Настройка шапки
  settingHeader();

  // Настройка контакта
  settingContacts();

})

// ----------Шапка----------

// Настройка шапки
function settingHeader() {
  const html = document.querySelector(`:root`);
  const body = document.querySelector(`body`);
  const header = document.querySelector(`.header`);
  const headerWrap = header.querySelector(`.wrap`);
  const menu = headerWrap.querySelector(`.menu`);
  const techBox = document.querySelector(`.tech-box`);
  const idSectionList = [...document.querySelectorAll(`.section[id]`)];
  const btnMenu = header.querySelector(`.button-menu`);
  const btnMenuSvg = [...btnMenu.querySelectorAll(`.svg`)];
  const btnTheme = header.querySelector(`.button-theme`);
  const btnThemeSvg = [...btnTheme.querySelectorAll(`.svg`)];
  const btnThemeText = header.querySelector(`.button-theme__text`);

  const headerHeight = header.offsetHeight;
  techBox.style.height = `${+headerHeight}px`;

  // Блюр на шапку при скролле страницы
  window.addEventListener(`scroll`, () => {
    if (window.pageYOffset > headerHeight) {
      header.classList.add(`header_page-scroll`);
    } else {
      header.classList.remove(`header_page-scroll`);
    }
  });

  // Формирование меню сайта
  const refMenuItem = menu.querySelector(`.menu__item`);
  idSectionList.forEach(section => {
    const sectionID = section.getAttribute(`id`);
    const sectionTag = section.querySelector(`.tag`).innerText;

    const cloneMenuItem = refMenuItem.cloneNode(true);
    const menuLink = cloneMenuItem.querySelector(`a`);
    menuLink.removeChild(menuLink.querySelector(`.visually-hidden`));
    menuLink.href = `#${sectionID}`;
    menuLink.innerText = sectionTag;

    menu.append(cloneMenuItem);
  });
  menu.removeChild(refMenuItem);

  // Открытие/закрытие меню при нажатии на кнопку
  btnMenu.addEventListener(`click`, () => {
    header.classList.toggle(`header_full`);
    techBox.classList.toggle(`visually-hidden`);
    body.classList.toggle(`body_blur`);
    headerWrap.classList.toggle(`header__wrap_active`);
    btnMenuSvg.forEach(svg => {
      svg.classList.toggle(`visually-hidden`);
    });
  });

  // Закрытие меню при нажатие вне окна
  document.addEventListener(`click`, event => {
    if (!event.target.closest(`.header`) && header.classList.contains(`header_full`)) {
      header.classList.toggle(`header_full`);
      techBox.classList.toggle(`visually-hidden`);
      body.classList.toggle(`body_blur`);
      headerWrap.classList.toggle(`header__wrap_active`);
      btnMenuSvg.forEach(svg => {
        svg.classList.toggle(`visually-hidden`);
      });
    };
  });

  // Смена темы
  btnTheme.addEventListener(`click`, () => {
    if (html.className === `dark`) {
      html.className = `light`;
    } else {
      html.className = `dark`;
    };
    btnThemeSvg.forEach(svg => {
      svg.classList.toggle(`visually-hidden`);
    });
  });
  btnThemeText.addEventListener(`click`, () => {
    if (html.className === `dark`) {
      html.className = `light`;
    } else {
      html.className = `dark`;
    };
    btnThemeSvg.forEach(svg => {
      svg.classList.toggle(`visually-hidden`);
    });
  });
}

// ----------Настройка контакта----------

function settingContacts() {
  const contacts = document.getElementById(`contacts`);
  const contactsWrap = contacts.querySelector(`.wrap`);
  const btnCopySvg = [...contactsWrap.querySelectorAll(`.button-copy__svg`)];
  // Время жизни подсказки в млсек
  const timerSlider = 950;

  btnCopySvg.forEach(btn => {

    // Копирование
    btn.addEventListener(`click`, () => {
      const conectText = btn.closest(`.inner`).querySelector(`.link`).innerText;
      const textarea = document.createElement('textarea');
      // textarea.value = conectText.replace(/-|\s/g, ``);
      textarea.value = conectText.replace(/\s/g, ``);
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);

      // Вывод подсказки
      const btnBox = btn.closest(`.button`);
      const btnBoxHeight = btnBox.offsetHeight;
      const tooltip = document.createElement('span');
      tooltip.classList.add(`tooltip`);
      tooltip.style.bottom = `${+btnBoxHeight}px`;
      tooltip.textContent = `Скопировано!`;
      btnBox.prepend(tooltip);
      // Удалить подсказку
      let idTimeoutTooltip = setTimeout(() => {
        btnBox.removeChild(tooltip);
        clearTimeout(idTimeoutTooltip);
      }, `${timerSlider}`);
    });
  });
}