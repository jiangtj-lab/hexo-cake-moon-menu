# hexo-cake-moon-menu

This plugin from [hexo-theme-inside](https://github.com/ike-c/hexo-theme-inside), thank ike-c.

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

In `math.yml` data file:
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
  injects.head.file('custom', 'views/head.swig', {}, {cache: true});
});
```

2. In `views/head.swig`, create custom function
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
