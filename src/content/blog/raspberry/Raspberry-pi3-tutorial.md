---
title: Raspberry Pi3 Tutorial
description: >-
  Prepare 树莓派支持的OS还是挺多的，凭爱好所需。 其他操作系统Raspbian, Ubuntu, Arch Linux ARM,Debian
  Squeeze,Gentoo Linux Google Chrome OS,FreeBSD,Android 4.0(Ice Cream
  Sandwich).官方下载…
pubDate: '2016-06-09T00:00:00.000Z'
category: Raspberry
tags:
  - Raspberry
  - 树莓派
ai: human
---

## Prepare

树莓派支持的OS还是挺多的，凭爱好所需。
其他操作系统`Raspbian`, `Ubuntu`, `Arch Linux ARM`,`Debian Squeeze`,`Gentoo Linux Google Chrome OS`,`FreeBSD`,`Android 4.0(Ice Cream Sandwich)`.官方下载地址戳[这里](https://www.raspberrypi.org/downloads/raspbian/)

<!-- more -->
### 刷入img

我用的[win32 DiskManager](https://sourceforge.net/projects/win32diskimager/) 16GSD卡。

### ssh

没有配显示屏，可以用ssh直接登入。
树莓派默认是开启SSH，port 22，所以在当前的局域网络找到IP `arp -a`，就可以登入了。 当然网上也有其他的办法, portscan等什么工具的。
![rasp-arp](/screenshots/rasp-win-arp.png)

另一种方式可以用VNC登入，详细可以参照raspberry config [配置篇](Raspberry-pi3-config)。

### 开启ROOT user

raspberry 默认的user是`pi`, 默认password是`raspberry`

``` bash
// config root user name & password, btw, password will input twice 
$ sudo passwd root

// active root
$ sudo passwd --unlock root
```
`reboot`即可生效。
