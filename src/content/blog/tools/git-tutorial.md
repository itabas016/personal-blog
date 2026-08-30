---
title: Source Control - Git Tutorial
description: >-
  能在刚开始开始时就能解除source
  control版本管理工具，那真是让你的开发之路清晰不少。正好所在的开发小组敢于大胆的汲取新知识，对于自己也是受益颇多。
pubDate: '2013-05-13T00:00:00.000Z'
category: Tools
tags:
  - Git
ai: human
---

> 能在刚开始开始时就能解除source control版本管理工具，那真是让你的开发之路清晰不少。正好所在的开发小组敢于大胆的汲取新知识，对于自己也是受益颇多。

<!-- more -->

### Overview

> git初始化配置，`.git/config` 属性值在这个文件里。

``` bash
# config username
git config –global user.name "Your Name"
# config email
git config –global user.email "you@yourdomain.com"
```
> 生成公钥

``` bash
$ cd ~/.ssh
$ ls
authorized_keys2  id_dsa       known_hosts
config            id_dsa.pub

$ ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/schacon/.ssh/id_rsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /Users/schacon/.ssh/id_rsa.
Your public key has been saved in /Users/schacon/.ssh/id_rsa.pub.
The key fingerprint is:
43:c5:5b:5f:b1:f1:50:43:ad:20:a6:92:6a:1f:9a:3a schacon@agadorlaptop.local

$ cat ~/.ssh/id_rsa.pub
ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAklOUpkDHrfHY17SbrmTIpNLTGK9Tjom/BWDSU
GPl+nafzlHDTYW7hdI4yZ5ew18JH4JW9jbhUFrviQzM7xlELEVf4h9lFX5QVkbPppSwg0cda3
Pbv7kOdJ/MTyBlWXFCR+HAo3FXRitBqxiX1nKhXpHAZsMciLq8V6RjsNAQwdsdMFvSlVK/7XA
t3FaoJoAsncM1Q9x5+3V0Ww68/eIFmb1zuUFljQJKprrX88XypNDvjYNby6vw/Pb0rwert/En
mZ+AW4OZPnTPI89ZPmVMLuayrD2cE86Z/il8b+gw3r3+1nKatmIkjn2so1d01QraTlMqVSsbx
NrRFi9wrf+M7Q== schacon@agadorlaptop.local
```

> PS. `git config --global`全局设置，`git config --global http.proxy http://127.0.0.1:1080/` 设置git走代理。

``` bash
$ git config --h
error: unknown option `h'
usage: git config [options]

Config file location
    --global              use global config file
    --system              use system config file
    --local               use repository config file
    -f, --file <file>     use given config file
    --blob <blob-id>      read config from given blob object

Action
    --get                 get value: name [value-regex]
    --get-all             get all values: key [value-regex]
    --get-regexp          get values for regexp: name-regex [value-regex]
    --get-urlmatch        get value specific for the URL: section[.var] URL
    --replace-all         replace all matching variables: name value [value_regex]
    --add                 add a new variable: name value
    --unset               remove a variable: name [value-regex]
    --unset-all           remove all matches: name [value-regex]
    --rename-section      rename section: old-name new-name
    --remove-section      remove a section: name
    -l, --list            list all
    -e, --edit            open an editor
    --get-color <slot>    find the color configured: [default]
    --get-colorbool <slot>
                          find the color setting: [stdout-is-tty]

Type
    --bool                value is "true" or "false"
    --int                 value is decimal number
    --bool-or-int         value is --bool or --int
    --path                value is a path (file or directory name)

Other
    -z, --null            terminate values with NUL byte
    --includes            respect include directives on lookup
```
### Basic command

``` bash
git config		初始化属性设置
git init 		创建了一个git库，在当前目录中产生一个.git（git仓库） 的子目录。
git add 		将当前工作目录中更改或者新增的文件加入到git的索引中.
git commit 		提交当前工作目录的修改内容。
git status 		查看版本库的状态。
git log 		查看历史日志，包含每次的版本变化。每次版本变化对应一个commit id。
git merge 		把服务器上下载下来的代码和本地代码合并，或者进行分支合并。如果合并有冲突，git会有提示。。
git checkout 	切换到分支。
git clean		复位
git mv 			重命名一个文件、目录或者链接。
git branch 		创建分支。
git branch -d 	删除分支。
git rebase 		一般在将服务器最新内容合并到本地时使用，例如：在版本C时从服务器上获取内容到本地，修改了本地内容，此时想把本地修改的内容提交到服务器上；但发现服务器上的版本已经变为G了，此时就需要先执行Git rebase，将服务器上的最新版本合并到本地。例如： 用下面两幅图解释会比较清楚一些，rebase命令执行后，实际上是将分支点从C移到了G，这样分支也就具有了从C到G的功能。
git reset 		库的逆转与恢复。git reset的概念比较复杂。它的命令形式：git reset [--mixed | --soft | --hard] [<commit-ish>] 。
git reverse 	还原某次对版本的修改。
git tag 		创建、列出、删除或者验证一个标签对象
git clone 		取出服务器的仓库的代码到本地建立的目录中。
git remote		远端仓库
git pull 		从服务器的仓库中获取代码，和本地代码合并。与服务器交互，从服务器上下载最新代码，等同于： Git fetch + Git merge。
git push 		将本地commit的代码更新到远程版本库中，例如 “git push origin”就会将本地的代码更新到名为orgin的远程版本库中。
git fetch 		从服务器的仓库中下载代码。	与服务器交互，从服务器上下载最新代码,相当于从远程获取最新版本到本地，不会自动merge，比git pull更安全些。

```

### Advance command

#### Git Submodule

> 仓库子模块(git-submodule), 公共代码库一般都是以子仓库的模式存在和维护的。
> 详细的介绍会在后面的文章概述->**[here](../../../../../2014/08/23/tools/git-submodule/)**

#### Merging vs Rebasing

> git rebase 和 git merge 都是用来合并分支，只不过方式不太相同。git rebase 经常被人认为是一种 Git 巫术，初学者应该避而远之。但如果使用得当，它能省去太多烦恼。在这篇文章中，我们会通过比较找到Git工作流中所有可以使用rebase的机会。

> See the detail **[here](https://www.atlassian.com/git/tutorials/merging-vs-rebasing/)**
> 译文参见 **[这里](https://github.com/geeeeeeeeek/git-recipes/wiki/5.1-%E4%BB%A3%E7%A0%81%E5%90%88%E5%B9%B6%EF%BC%9AMerge%E3%80%81Rebase%E7%9A%84%E9%80%89%E6%8B%A9)**
#### Resetting, Checking Out, and Reverting

> git reset 、 git checkout 和 git revert 都是用来撤销代码仓库中的某些更改，所以我们经常弄混。在这篇文章中，我们比较最常见的用法，分析在什么场景下该用哪个命令。

> See the detail **[here](https://www.atlassian.com/git/tutorials/resetting-checking-out-and-reverting/)**
> 译文参见**[这里](https://github.com/geeeeeeeeek/git-recipes/wiki/5.2-%E4%BB%A3%E7%A0%81%E5%9B%9E%E6%BB%9A%EF%BC%9AReset%E3%80%81Checkout%E3%80%81Revert%E7%9A%84%E9%80%89%E6%8B%A9)**

#### Git Hooks

> Git 钩子是在 Git 仓库中特定事件发生时自动运行的脚本。它可以让你自定义Git内部的行为，在开始周期中的关键点触发自定义的行为，自动化或者优化你开发工作流中任意部分。

> See the detail **[here](https://www.atlassian.com/git/tutorials/git-hooks)**
> 译文参见 **[这里](https://github.com/geeeeeeeeek/git-recipes/wiki/5.4-Git%E9%92%A9%E5%AD%90%EF%BC%9A%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BD%A0%E7%9A%84%E5%B7%A5%E4%BD%9C%E6%B5%81)**

#### Refs and the Reflog

> 提交是 Git 的精髓所在，你无时不刻不在创建和缓存提交、查看以前的提交，或者用各种Git命令在仓库间转移你的提交。在这章中，我们研究提交的各种引用方式，以及涉及到的 Git 命令的工作原理。我们还会学到如何使用 Git 的引用日志查看看似已经删除的提交。

> See the detail **[here](https://www.atlassian.com/git/tutorials/refs-and-the-reflog)**
> 译文参见 **[这里](https://github.com/geeeeeeeeek/git-recipes/wiki/5.5-Git%E6%8F%90%E4%BA%A4%E5%BC%95%E7%94%A8%E5%92%8C%E5%BC%95%E7%94%A8%E6%97%A5%E5%BF%97)**

> Resoures:
> https://www.atlassian.com/git/tutorials
> https://git-scm.com/book/zh/v1/%E6%9C%8D%E5%8A%A1%E5%99%A8%E4%B8%8A%E7%9A%84-Git-%E7%94%9F%E6%88%90-SSH-%E5%85%AC%E9%92%A5
> https://www.atlassian.com/git/tutorials/advanced-overview
> https://git-scm.com/book/zh/v1/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97
> https://github.com/geeeeeeeeek/git-recipes/wiki
