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
