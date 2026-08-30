---
title: Raspberry Pi3 有趣玩法
description: >-
  前两天又看到了用树莓派可以做FM射频广播，感觉挺好玩的。另外简单的还有网络音频播放器，如果实现语音播报功能的话，类似的可以实现正点报时，闹钟提醒还有智能语音对话，当然咯这些的实现后面有时间的话一个一个来玩
pubDate: '2017-11-10T00:00:00.000Z'
category: Raspberry
tags:
  - Raspberry
  - 树莓派
  - FM射频
  - 网络播放器
  - 网易云音乐
ai: human
---

前两天又看到了用树莓派可以做FM射频广播，感觉挺好玩的。另外简单的还有网络音频播放器，如果实现语音播报功能的话，类似的可以实现正点报时，闹钟提醒还有智能语音对话，当然咯这些的实现后面有时间的话一个一个来玩~

<!-- more -->

## FM射频广播 ##

[项目来源参照](https://github.com/ma6174/fmpi)

``` bash
# download package
git clone https://github.com/ma6174/fmpi.git ~/Programs/fmpi

# setup.sh have duplicate step
# manually install dependency
sudo apt-get install python-setuptools mpg123 -y
sudo easy_install web.py
sudo easy_install wsgilog

# copy main application
cd fmpi-master
sudo cp pifm /usr/bin/

# run start.sh
. start.sh
```

源程序`fmpi.py`主要是豆瓣FM，后期可以介入网易云或喜马拉雅电台。

## 网络播放器 ##

[项目来源参照](https://github.com/yaphone/RasWxNeteaseMusic)

``` bash
# download source code
git clone https://github.com/yaphone/RasWxNeteaseMusic.git ~/Programs/pi-netease

# install dependency
sudo apt-get install python-dev
sudo pip install requests future crypto bs4 pycrypto

# run
cd ~/Programs/pi-netease
python run.py
```

数据源采用网易云音乐，微信二维码扫描登陆，测试结果并不理想。
