---
title: Raspberry Pi3 配置
description: >-
  Rasp config 直接$sudo raspi-config进入： Expand Filesystem：将系统扩展到整个SD卡，必须执行，一路敲回车即可
  Change User Password：修改密码及账号，若要修改，请牢记 Boot
  Options：启动选项，选desktop，下次启动将直接进入桌面系统…
pubDate: '2016-06-10T00:00:00.000Z'
category: Raspberry
tags:
  - Raspberry
  - 树莓派
ai: human
---

## Rasp config

直接`$sudo raspi-config`进入：

* `Expand Filesystem`：将系统扩展到整个SD卡，必须执行，一路敲回车即可
* `Change User Password`：修改密码及账号，若要修改，请牢记
* `Boot Options`：启动选项，选`desktop`，下次启动将直接进入桌面系统
* `Wait for Network at Boot`：等待网络唤醒，服务器模式
* `Internationalisation Options`：地区和语言设置，选择`zh_CN UTF-8`，即可切换到中文模式
* `Enable Camera`：CSI摄像头开启或关闭，选择enable则开启
* `Add to Rastrack`：将树莓派加入Rastrack社区
* `Overclock`：超频，一般不超频，若要超频请谨慎操作，并做好散热
* `Advanced Options`：高级选项，包括`Overscan`, `Hostname`, `Memory Split(内存分配)`, `SSH`等
* `About raspi-config`：本机相关信息。

<!-- more -->

## Update software resource

如果不熟悉自带的nano编辑器，请安装编辑利器`vim`, 修改sources, 不然update太慢了。

``` bash
//install vim
$ sudo apt-get install vim -y

$ sudo vim /etc/apt/sources.list

#modify
deb http://mirrors.aliyun.com/raspbian/raspbian/ jessie main non-free contrib rpi
deb-src http://mirrors.aliyun.com/raspbian/raspbian/ jessie main non-free contrib rpi

//update
$ sudo apt-get update

//upgrade
$ sudo apt-get upgrade -y

```

## Configure static IP & WIFI

_~~默认是启用DHCP自动获取IP. 修改network配置~~_
``` bash
$ sudo vim /etc/network/interfaces
```

_~~如果设置有线网卡ip~~_
``` bash
iface eth0 inet static 
address 192.168.1.2 # 设定的静态IP地址 
netmask 255.255.255.0 # 网络掩码 
gateway 192.168.1.1 # 网关
```

_~~如果设置无线网卡~~_
``` bash
iface wlan0 inet static 
wpa-ssid Your_Wifi_SSID 
wpa-psk Your_Wifi_Password 
address 192.168.1.2 # 设定的静态IP地址 
netmask 255.255.255.0 # 网络掩码 
gateway 192.168.1.1 # 网关 
network 192.168.1.1 # 网络地址
#wpa-roam /etc/wpa_supplicant/wpa_supplicant.conf
```

**PS.以上方法很长时间导致我无法ssh树莓派，迫使吃灰中。最近有空闲下来，重新刷了jessie**

**!!!! `/etc/network/interface`里面明明写的很清楚：**

``` bash
# interfaces(5) file used by ifup(8) and ifdown(8)

# Please note that this file is written to be used with dhcpcd
# For static IP, consult /etc/dhcpcd.conf and 'man dhcpcd.conf'

# Include files from /etc/network/interfaces.d:
source-directory /etc/network/interfaces.d

auto lo
iface lo inet loopback

iface eth0 inet manual

allow-hotplug wlan0
auto wlan0
iface wlan0 inet manual
    wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf

```

于是 查看`dhcpcd`文档，`man dhcpcd.conf`

``` bash
static value
             Configures a static value.  If you set ip_address then dhcpcd will not attempt to obtain a lease and
             just use the value for the address with an infinite lease time.

             Here is an example which configures a static address, routes and dns.
                   interface eth0
                   static ip_address=192.168.0.10/24
                   static routers=192.168.0.1
                   static domain_name_servers=192.168.0.1

             Here is an example for PPP which gives the destination a default route.  It uses the special destination
             keyword to insert the destination address into the value.
                   interface ppp0
                   static ip_address=
                   destination routers

```

所以只需在`/etc/dhcpcd.conf`下面加上以下设置

**PS.目前的策略仍是eth0静态IP, wlan0自动获取IP, wlan1中继**
``` bash
interface eth0
static ip_address=192.168.11.x/24
static routers=192.168.11.1
static domain_name_servers=114.114.114.114 119.29.29.29
# dns server using telcom dns or dnspod dns
```

然后配置无线SSID认证：
``` bash
sudo sh -c "wpa_passphrase your_ssid your_password >> /etc/wpa_supplicant/wpa_supplicant.conf"

```

最后restart network即可。

## Remote 

因为默认是打开ssh的，所以通过vnc访问rasp需要安装xrdp
``` bash
$ sudo apt-get install xrdp
```

## ohters configuration

设置中文，系统却显示乱码，是因为系统缺少中文字库。
``` bash
$ sudo apt-get install ttf-wqy-microhei ttf-wqy-zenhei xfonts-wqy
```
