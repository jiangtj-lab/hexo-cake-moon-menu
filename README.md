# hexo-cake-moon-menu

This plugin from [hexo-theme-inside](https://github.com/ike-c/hexo-theme-inside), thank ike-c.

![npm](https://img.shields.io/npm/v/hexo-cake-moon-menu.svg)
[![Theme](https://img.shields.io/badge/Theme-NexT(Pisces&Gemini):7.3.0-blue.svg)](https://theme-next.org)
[![Theme](https://img.shields.io/badge/Theme-Cake:1.1.0-blue.svg)](https://github.com/jiangtj/hexo-theme-cake)

Want to use in muse/mist see [moon-menu-for-muse-mist-example](https://github.com/jiangtj-lab/moon-menu-for-muse-mist-example)

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
You can config by `moon_menu` in `hexo` `theme` or `data` config files.

In hexo or theme:
```yml
moon_menu:
  back2top:
    enable: true
  back2bottom:
    enable: true
```

In `moon_menu.yml` data file:
```yml
back2top:
  enable: true
back2bottom:
  enable: true
```

You can find more info in [default config file](default.yaml).

## Custom

It's easy to add new button in `moon-menu`.

Here's an example about add gitter sidecar.

1. Add custom head
```js
hexo.extend.filter.register('theme_inject', function(injects) {
  injects.head.file('sidecar', 'views/sidecar.swig', {}, {cache: true});
});
```

2. In `views/sidecar.swig`, create custom function
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

## Debug
```bash
# init this project
yarn install
yarn link
# get example
git clone --recursive git@github.com:jiangtj-lab/hexo-theme-cake-example.git example
cd example
yarn install
# add test link
yarn add hexo-cake-moon-menu
yarn link hexo-cake-moon-menu
# run, see http://localhost:4000
hexo s
```
