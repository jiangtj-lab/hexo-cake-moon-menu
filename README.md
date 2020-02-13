# hexo-cake-moon-menu

This plugin from [hexo-theme-inside](https://github.com/ike-c/hexo-theme-inside), thank ike-c.

**If you've come here from my post, check out the [1.x](https://github.com/jiangtj-lab/hexo-cake-moon-menu/tree/1.x) branch code.**

![npm](https://img.shields.io/npm/v/hexo-cake-moon-menu.svg)
[![Theme](https://img.shields.io/badge/Theme-NexT(Pisces&Gemini):7.3.0-blue.svg)](https://theme-next.org)
[![Theme](https://img.shields.io/badge/Theme-Cake:1.1.0-blue.svg)](https://github.com/jiangtj/hexo-theme-cake)

# Preview
![image](https://user-images.githubusercontent.com/15902347/61098652-41f0ee80-a492-11e9-9c75-bb8fad0aa058.png)
![image](https://user-images.githubusercontent.com/15902347/61098668-51703780-a492-11e9-984c-a17c1509a4c6.png)
![image](https://user-images.githubusercontent.com/15902347/61098577-1110b980-a492-11e9-930e-cd0c677f7714.png)
![image](https://user-images.githubusercontent.com/15902347/61098595-1ff76c00-a492-11e9-8c66-0a702b390961.png)

## How to use

```bash
yarn add hexo-cake-moon-menu
```

## Config

In hexo `_config.yml` (here is default config, if don't change it, nothing need to append)

```yml
back2top:
  enable: true
  icon: fa fa-chevron-up
  func: back2top
  order: -1
back2bottom:
  enable: true
  icon: fa fa-chevron-down
  func: back2bottom
  order: -2
```

## Custom

It's easy to add new button in `moon-menu`.

Here's an example about add gitter sidecar.

1.  In `${hexo-dir}/scripts/any.js`, Add custom head
```js
const fs = require('fs');
const path = require('path');
const injector = require('hexo-extend-injector2')(hexo);
const { Cache } = require('hexo-util');
const cache = new Cache();
injector.register('head_end', () => {
  return cache.apply('gitter', () => {
    return fs.readFileSync(path.resolve(hexo.base_dir, 'views/gitter.html'), 'utf8');
  });
});
```

2. In `${hexo-dir}/views/sidecar.swig`, create custom function
```html
<script src="https://sidecar.gitter.im/dist/sidecar.v1.js" async defer></script>
<script>
  ((window.gitter = {}).chat = {}).options = {
    room: 'your-room-name',
    activationElement: false
  };
  // create custom function
  var openGitter = function() {};
  document.addEventListener('gitter-sidecar-ready', function(e) {
    var GitterChat = e.detail.Chat;
    var chat = new GitterChat({
      room: 'your-room-name',
      activationElement: false
    });
    openGitter = () => {
      chat.toggleChat(true);
    }
  });
</script>
```

3. Add config
```yml
moon_menu:
  chat:
    icon: fa fa-comments
    func: openGitter
```

## Other themes

If you're not a user of the NexT or Cake theme, don't worry, you can still use the plug-in, but you'll need to do some extra configuration

You need to configure some for the [hexo-extend-injector2](https://github.com/jiangtj/hexo-extend-injector2) plugin.

- [environmental requirements](https://github.com/jiangtj/hexo-extend-injector2/issues/5)
- load stylus injector
- add fontawesome, if not exist.

Here are the actions for the default theme

In `${hexo-or-theme-dir}/scripts/any.js`
```js
const injector = require('hexo-extend-injector2')(hexo);
// load stylus injector
injector.loadStylusPlugin();
// add fontawesome
injector.register('head-end', {
  value: '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.11.2/css/all.min.css" crossorigin="anonymous">'
});
```

Append some to `${theme-dir}/source/css/style.styl` (This may not be needed in the future, see [this plan](https://github.com/jiangtj/hexo-extend-injector2/issues/4))
```styl
injector("style")
```


