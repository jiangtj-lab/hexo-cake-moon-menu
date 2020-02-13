'use strict';

const path = require('path');
const fs = require('fs');
const { Cache } = require('hexo-util');
const injector = require('hexo-extend-injector2')(hexo);
const ejs = require('ejs');

const cache = new Cache();

let config = Object.assign({
  back2top: {
    enable: true,
    icon: 'fa fa-chevron-up',
    func: 'back2top',
    order: -1,
  },
  back2bottom: {
    enable: true,
    icon: 'fa fa-chevron-down',
    func: 'back2bottom',
    order: '-2',
  }
}, hexo.config.moon_menu)

let moonMenuArr = Object.keys(config)
  .map(key => config[key])
  .map(item => {
    item.order = item.order || 0;
    if (item.enable === undefined) {
      item.enable = true;
    }
    return item;
  })
  .filter(item => item.enable)
  .sort((a, b) => a.order - b.order);

injector.register('style', path.join(__dirname, 'moon-menu.styl'));
injector.register('bodyEnd', () => {
  return cache.apply('cache', () => {
    let template = fs.readFileSync(path.join(__dirname, 'moon-menu.ejs')).toString();
    return ejs.render(template, { menus: moonMenuArr });
  })
});
