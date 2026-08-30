---
title: Hexo + Next 踩坑提醒
description: >-
  这几年NodeJS太火了，就准备把之前记录的blog用Hexo重构以下。网上的教程真是太多了，参照官方的文档Hexo
  本打算自己写主题的，现在还是用现成的吧Next | yilia, Yilia是基于webpack构建的其性能比Next要高。目前我采用的Next,
  比较容易踩坑的地方记一下。
pubDate: '2016-10-21T00:00:00.000Z'
category: Web
tags:
  - Hexo
  - Blog
ai: human
---

这几年NodeJS太火了，就准备把之前记录的blog用Hexo重构以下。网上的教程真是太多了，参照官方的文档[Hexo](https://hexo.io/)
本打算自己写主题的，现在还是用现成的吧[Next](http://theme-next.iissnan.com/getting-started.html) | [yilia](https://github.com/litten/hexo-theme-yilia), Yilia是基于webpack构建的其性能比Next要高。目前我采用的Next, 比较容易踩坑的地方记一下。

<!-- more -->

### How to create new menu
```
$ hexo new page tags

#修改`/tag/index.md`, type为tags, 禁用comments将value改为false
---
title: tags
date: 2016-xx-xx 12:38:22
type: "tags"
comments: false
---
```
### How to change social icon
对于缺少的icon可用globe代替，也可以通过[FontAwesome](http://fontawesome.io/icons/)搜索你喜欢的来替换
```
social_icons:
  enable: true
  # Icon Mappings.
  # KeyMapsToSocalItemKey: NameOfTheIconFromFontAwesome
  GitHub: github
  Twitter: twitter
  Facebook: facebook
  Telegram: telegram
  Instagram: instagram
  Weibo: weibo
```
### How to active search function
安装`hexo-generator-search`plugin, 生成blog content index. 更多详细配置参照[hexo-generator-search](https://github.com/PaicHyperionDev/hexo-generator-search)
```
$ npm install hexo-generator-search --save

#modify _config.yml 增加以下内容
search:
  path: search.xml
  field: post
```
### How to generate feed xml
安装`hexo-generator-feed`plugin, 更多详细配置参照[hexo-generator-feed](https://github.com/itabas016/hexo-generator-feed)
```
$ npm install hexo-generator-feed

#modify _config.yml 增加以下内容
#Feed Atom
feed:
  type: atom
  path: atom.xml
  limit: 20
```
### How to improve SEO by sitemap
安装`hexo-generator-sitemap`plugin, 更多详细配置参照[hexo-generator-sitemap](https://github.com/hexojs/hexo-generator-sitemap)
```
$ npm install hexo-generator-sitemap

#modify _config.yml 增加以下内容

#sitemap
sitemap:
  path: sitemap.xml
```
### How to deploy to github
安装`hexo-deployer-git`plugin, 更多详细配置参照[hexo-deployer-git](https://github.com/hexojs/hexo-deployer-git)
```
$ npm install hexo-deployer-git --save
```
### How to bind a personal domain
cd source目录下，添加CNAME文件
```
$ cd source/
$ touch CNAME
$ vim CNAME # input you personal domain
$ git add CNAME
$ git commit -m "add CNAME"
```
