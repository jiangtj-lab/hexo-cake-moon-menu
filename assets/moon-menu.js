/* eslint-disable no-var */
/* global document,window */
'use strict';
((window, document) => {

  const moonMenuListener = function() {
    // Get scroll percent
    const offsetHeight = document.documentElement.offsetHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    let percent = Math.round(scrollTop / (scrollHeight - offsetHeight) * 100);
    if (percent > 100) percent = 100;

    const menuIcon = document.querySelector('.moon-menu-icon');
    const menuText = document.querySelector('.moon-menu-text');
    if (!percent) {
      percent = 0;
      menuIcon.style.display = 'block';
      menuText.style.display = 'none';
    } else {
      menuIcon.style.display = 'none';
      menuText.style.display = 'block';
      menuText.innerHTML = percent + '%';
    }

    // Update strokeDasharray
    const length = 196;
    document.querySelector('.moon-menu-border').style.strokeDasharray = percent * length / 100 + ' ' + length;
  };

  window.addEventListener('load', () => {
    moonMenuListener();
  });
  window.addEventListener('scroll', moonMenuListener);

  document.querySelector('.moon-menu-button').addEventListener('click', () => {
    document.querySelector('.moon-menu-icon').classList.toggle('active');
    const items = document.querySelector('.moon-menu-items');
    items.classList.toggle('active');
    const childItems = document.querySelectorAll('.moon-menu-item');
    if (items.classList.contains('active')) {
      for (let i = 0; i < childItems.length; i++) {
        childItems[i].style.top = -3 - 3 * i + 'em';
        childItems[i].style.opacity = .9;
      }
    } else {
      for (let i = 0; i < childItems.length; i++) {
        childItems[i].style.top = '1em';
        childItems[i].style.opacity = 0;
      }
    }
  });

  const addClickListener = (id, call) => {
    const item = document.querySelector(id);
    if (item) {
      item.addEventListener('click', call);
    }
  };

  addClickListener('#moon-menu-item-back2top', () => {
    window.scroll({ top: 0, behavior: 'smooth' });
  });

  addClickListener('#moon-menu-item-back2bottom', () => {
    const offsetHeight = document.documentElement.offsetHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    window.scroll({ top: scrollHeight - offsetHeight, behavior: 'smooth' });
  });

})(window, document);
