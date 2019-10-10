
const utils = require('hexo-cake-utils')(hexo, __dirname);

hexo.extend.filter.register('theme_inject', function(injects) {

  let back2top = hexo.theme.config.back2top
  if (back2top) {
    back2top.enable = false;
  }

  let moonMenu = utils.defaultConfigFile('moon_menu', 'default.yaml');
  let moonMenuArr = Object.keys(moonMenu)
    .map(key => moonMenu[key])
    .map(item => {
      item.order = item.order || 0;
      if (item.enable === undefined) {
        item.enable = true;
      }
      return item;
    })
    .filter(item => item.enable)
    .sort((a, b) => a.order - b.order);
  
  injects.bodyEnd.file('moon-menu', utils.getFilePath('moon-menu.swig'), {menus: moonMenuArr}, {cache: true, only: true});
  injects.style.push(utils.getFilePath('moon-menu.styl'));

});
