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

    const menuText = document.querySelector('.moon-menu-text');
    const menuPoints = document.querySelector('.moon-menu-points');
    if (!percent) {
      percent = 0;
      menuText.style.display = 'none';
      menuPoints.style.display = 'block';
    } else {
      menuText.style.display = 'block';
      menuPoints.style.display = 'none';
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

})(window, document);

// eslint-disable-next-line no-unused-vars
var moonMenuClick = function() {
  const items = document.querySelector('.moon-menu-items');
  items.classList.toggle('active');
  const points = document.querySelectorAll('.moon-menu-point');
  const childItems = document.querySelectorAll('.moon-menu-item');
  if (items.classList.contains('active')) {
    points[0].setAttribute('cx', '-.8rem');
    points[0].setAttribute('cy', '0');
    points[2].setAttribute('cx', '.8rem');
    points[2].setAttribute('cy', '0');
    for (let i = 0; i < childItems.length; i++) {
      childItems[i].style.top = -3 - 3 * i + 'rem';
      childItems[i].style.opacity = .9;
    }
  } else {
    points[0].setAttribute('cx', '0');
    points[0].setAttribute('cy', '-.8rem');
    points[2].setAttribute('cx', '0');
    points[2].setAttribute('cy', '.8rem');
    for (let i = 0; i < childItems.length; i++) {
      childItems[i].style.top = '1rem';
      childItems[i].style.opacity = 0;
    }
  }
};

// eslint-disable-next-line no-unused-vars
var back2top = () => {
  window.scroll({ top: 0, behavior: 'smooth' });
};

// eslint-disable-next-line no-unused-vars
var back2bottom = () => {
  const offsetHeight = document.documentElement.offsetHeight;
  const scrollHeight = document.documentElement.scrollHeight;
  window.scroll({ top: scrollHeight - offsetHeight, behavior: 'smooth' });
};
