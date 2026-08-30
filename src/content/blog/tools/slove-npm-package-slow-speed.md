---
title: npm package下载超级慢有没有
description: '最近一直在学nodeJS, npm package manager 这是必不可少的。原因挺简单，在国内访问外网太慢。。。大家都懂得 两种解决方案:'
pubDate: '2016-10-29T00:00:00.000Z'
category: Tools
tags:
  - Node
  - Package
  - NPM
ai: human
---

> 最近一直在学nodeJS, npm package manager 这是必不可少的。原因挺简单，在国内访问外网太慢。。。大家都懂得~
> 两种解决方案:

<!-- more -->
### solution 1 replace registry url

> 用其它registry url 来加速npm，有`cnpm`, `taobao npm`, 具体还要看包的完整性及所需要的依赖。
```
npm config set registry http://registry.cnpmjs.org  npm info underscore

#vim node_modules\npm.npmrc
registry = http://registry.cnpmjs.org
```
> cnpm offical configuration, 一键完成
```
npm install -g cnpm --registry=http://r.cnpmjs.org
```
> 其它registry-url: `https://registry.npm.taobao.org`

### solution 2 use proxy

> close npm https
```
npm config set strict-ssl false 
```
> configure npm proxy address

> 如果有ss代理的话，推荐这种方式。
```
npm config set proxy=http://127.0.0.1:8087
npm config set registry=http://registry.npmjs.org
```
> if clean proxy
```
npm config delete http-proxy
npm config delete https-proxy
```

Resource：<http://www.uedbox.com/npm-install-slow-solution/>
