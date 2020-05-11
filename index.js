/* global hexo */
'use strict';

const { join } = require('path');
const fs = require('fs');
const { Cache } = require('hexo-util');
const injector = require('hexo-extend-injector2')(hexo);
const ejs = require('ejs');

const cache = new Cache();

hexo.extend.filter.register('after_init', () => {
  const faInline = hexo.extend.helper.get('fa_inline');
  const fa = css => {
    if (!faInline) {
      return `<i class='${css}'></i>`;
    }
    const data = css.split(' ');
    return faInline(data[1].substring(3), {prefix: data[0]});
  };

  const config = Object.assign({
    back2top: {
      enable: true,
      icon: 'fas fa-chevron-up',
      func: 'back2top',
      order: -1
    },
    back2bottom: {
      enable: true,
      icon: 'fas fa-chevron-down',
      func: 'back2bottom',
      order: '-2'
    }
  }, hexo.config.moon_menu);

  const moonMenuArr = Object.keys(config)
    .map(key => config[key])
    .map(item => {
      item.order = item.order || 0;
      if (item.enable === undefined) {
        item.enable = true;
      }
      return item;
    })
    .filter(item => item.enable)
    .map(item => {
      item.icon = fa(item.icon);
      return item;
    })
    .sort((a, b) => a.order - b.order);

  injector.register('variable', join(__dirname, 'assets/variables.styl'));
  injector.register('style', join(__dirname, 'assets/styles.styl'));
  injector.register('js', fs.readFileSync(join(__dirname, 'assets/moon-menu.js')).toString());
  injector.register('bodyEnd', () => {
    return cache.apply('cache', () => {
      const template = fs.readFileSync(join(__dirname, 'assets/moon-menu.ejs')).toString();
      return ejs.render(template, { icon: fa('fas fa-ellipsis-v'), menus: moonMenuArr });
    });
  });
}, 1);
