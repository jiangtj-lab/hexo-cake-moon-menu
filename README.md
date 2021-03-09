# hexo-cake-moon-menu

This plugin from [hexo-theme-inside](https://github.com/ike-c/hexo-theme-inside), thank ike-c.

**If you've come here from my post, check out the [1.x](https://github.com/jiangtj-lab/hexo-cake-moon-menu/tree/1.x) branch code.**

![npm](https://img.shields.io/npm/v/hexo-cake-moon-menu.svg)
[![Theme](https://img.shields.io/badge/Theme-NexT(Pisces&Gemini):7.9.0-blue.svg)](https://theme-next.org)
[![Theme](https://img.shields.io/badge/Theme-Cake:2.0.0-blue.svg)](https://github.com/jiangtj/hexo-theme-cake)

# Preview
![image](https://user-images.githubusercontent.com/15902347/61098652-41f0ee80-a492-11e9-9c75-bb8fad0aa058.png)
![image](https://user-images.githubusercontent.com/15902347/61098668-51703780-a492-11e9-984c-a17c1509a4c6.png)
![image](https://user-images.githubusercontent.com/15902347/61098577-1110b980-a492-11e9-930e-cd0c677f7714.png)
![image](https://user-images.githubusercontent.com/15902347/61098595-1ff76c00-a492-11e9-8c66-0a702b390961.png)

## How to use

```bash
yarn add hexo-cake-moon-menu
```

If you are using NexT theme version 7.8 or earlier, install version 2.1.2

```bash
yarn add hexo-cake-moon-menu@2.1.2
```

## Config

In hexo `_config.yml` (here is default config, if don't change it, nothing need to append)

```yml
moon_menu:
  back2top:
    enable: true
    icon: fas fa-chevron-up
    order: -1
  back2bottom:
    enable: true
    icon: fas fa-chevron-down
    order: -2
```

## Custom

It's easy to add new button in `moon-menu`. And here's an example about add gitter sidecar.

1. Add config
```yml
moon_menu:
  chat:
    icon: fa fa-comments
```

2.  In `${hexo-dir}/scripts/any.js`, Add custom head
```js
const path = require('path');
const injector = require('hexo-extend-injector2')(hexo);
injector.register('body-end', `<script>
((window.gitter = {}).chat = {}).options = {
  room: 'your-room-name',
  activationElement: false
};
</script>`);
injector.register('body-end', '<script src="https://sidecar.gitter.im/dist/sidecar.v1.js" async defer></script>');
injector.register('js', path.resolve(hexo.base_dir, 'any/gitter.js'));
```

3. In `${hexo-dir}/any/gitter.js`, create custom function
```js
document.addEventListener('gitter-sidecar-instance-started', e => {
  // every button has it's id such as #moon-menu-item-<key>
  document.querySelector('#moon-menu-item-chat').addEventListener('click', () => {
    e.detail.chat.toggleChat(true);
  });
});
```

## Other themes

If you're not a user of the NexT or Cake theme, don't worry, you can still use this plug-in, just add fontawesome to your blog. We provide three scheme that you can choose.

### Scheme one

```bash
yarn add hexo-fontawesome
```

In `${hexo-or-theme-dir}/scripts/any.js`

```js
const { dom } = require('@fortawesome/fontawesome-svg-core');
const injector = require('hexo-extend-injector2')(hexo);
injector.register('style', dom.css());
```

### Scheme two

In `${hexo-or-theme-dir}/scripts/any.js`
```js
const injector = require('hexo-extend-injector2')(hexo);
// add fontawesome
injector.register('head-end', {
  value: '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.11.2/css/all.min.css" crossorigin="anonymous">'
});
```

### Scheme three

Add fontawesome.css in your theme layout
