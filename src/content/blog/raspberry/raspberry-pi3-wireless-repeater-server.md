---
title: Raspberry Pi3 打造无线中继服务器
description: >-
  既然rasp又活了一开始想着用它来搞个WIFI中继。之前对这个原理不是很懂，也不知道具体是怎么实现的，这次搞一搞。
  后来摸索着不妨就单开个热点做梯子用，其实中继模式和桥接模式很类似，表面上看可以简单的说只是无线SSID广播不同的信号，实际在实现上还是有诸多区别，这里就记一下所趟的坑。
pubDate: '2017-11-13T00:00:00.000Z'
category: Raspberry
tags:
  - Raspberry
  - Wireless
  - Wireless Repeater
  - Wireless Bridger
  - Router
  - 树莓派
  - 无线中继
ai: human
---

既然rasp又活了一开始想着用它来搞个WIFI中继。之前对这个原理不是很懂，也不知道具体是怎么实现的，这次搞一搞。

后来摸索着不妨就单开个热点做梯子用，其实中继模式和桥接模式很类似，表面上看可以简单的说只是无线SSID广播不同的信号，实际在实现上还是有诸多区别，这里就记一下所趟的坑。

<!-- more -->

## 准备工作 ##

主要参考了网上的教程

我的是一个板子(包含内置的有线网卡eth0和无线网卡wlan0)，一根网线，一个无线网卡wlan1(用来做梯子用)。

### Static IP ###

之前已经准备好了eth0静态ip, wlan0动态获取。主要是有线网卡比较稳定适合用静态ip。

静态ip设置参照[这里](https://tech.itabas.com/2016/06/10/raspberry/raspberry-pi3-config/#Configure-static-IP-amp-WIFI)

后面修改 `/etc/network/interfaces` 和 `/etc/dhcpcd.conf` 分别添加以下配置：

``` bash
# modify /etc/network/interfaces
sudo vim /etc/network/interfaces

# add wlan1 configuration
allow-hotplug wlan1
auto wlan1
iface wlan1 inet manual

# modify /etc/dhcpcd.conf
sudo vim /etc/dhcpcd.conf

# add wlan1 dhcp configuration
interface wlan1
static ip_address=192.168.20.1/24
static routers=192.168.11.1
static domain_name_servers=114.114.114.114 119.29.29.29
```
### DNS ###

然后修改 `/etc/dnsmasq.conf`配置wlan1网段(192.168.20.0/24)：

``` bash
# modify /etc/dnsmasq.conf
sudo vim /etc/dnsmasq.conf

# uncomments add configuration
no-resolv
server=202.38.93.153
server=202.141.162.123
server=114.114.114.114
server=119.29.29.29

listen-address=127.0.0.1,192.168.20.1
dhcp-range=192.168.20.50,192.168.20.150,12h
```
### Forward ###

开启包转发 `sudo vim /etc/sysctl.conf` 

``` bash
# uncomment
net.ipv4.ip_forward=1

# run
sudo sysctl -p

# add iptables rule (nat rule for wlan0)
sudo iptables -t nat -A POSTROUTING -o wlan0 -j MASQUERADE
```

**PS.Tips:** 使用`iptables-persistent`将防火墙rules保存至`/etc/iptables/rules.v4`

``` bash
# save current rules
sudo service netfilter-persistent save
#read current rules
sudo service netfilter-persistent reload

# reload rules when restart rasp
sudo vim /etc/rc.local
# add configuration
iptables-restore < /etc/iptables/rules.v4
```

### Hostapd ###

首先需要确保当前网卡wlan1是否具有APmode或用来做中继或桥接的功能。`iw list|grep -A10 'Supported interface modes'`


``` bash
# install hostapd
sudo apt-get install hostapd

# check wlan adapter support current driver
lsusb

# currently, my driver need use r8712u
# Bus 001 Device 005: ID 0bda:8171 Realtek Semiconductor Corp. RTL8188SU 802.11n WLAN Adapter
# if hostapd doesn't support current dirver, need find driver related hostapd and manually make it

# modify hostapd configuration
sudo /etc/hostapd/hostapd.conf

# add configuration
interface=wlan1
driver=r8712udrv
ssid=My_SSID_Name
channel=10
wmm_enabled=1
wpa=2
wpa_passphrase=MYPASSWORD
wpa_key_mgmt=WPA-PSK
wpa_pairwise=TKIP
rsn_pairwise=CCMP
auth_algs=1
macaddr_acl=0

# test hostadp 
sudo hostapd -d /etc/hostapd/hostapd.conf

# change DAEMON_CONF path
sudo /etc/default/hostapd

DAEMON_CONF="/etc/hostapd/hostapd.conf"

# start SSID
sudo service hostapd start
```

## 梯子部分 ##

### Shadowsocks ###

使用`redsocks + shadowsocks`, 直接`sudo pip install shadowsocks`

``` bash
# create shadowsocks json configuration
sudo vim /etc/shadowsocks.json

# add json content
{
    "server":"xxx.xxx.xxx.xxx",
    "server_port":8989,
    "local_address":"0.0.0.0",
    "local_port":1080,
    "password":"password",
    "timeout":600,
    "method":"aes-256-cfb"
}

# test
sudo sslocal -c /etc/shadowsocks.json -d start

# add autostart
sudo sh -c "sslocal -c /etc/shadowsocks.conf -d start >> /etc/rc.local"
```

### Redsocks ###

``` bash
# install
sudo apt-get install redsocks

# modify /etc/redsocks.conf
sudo vim /etc/redsocks.conf

redsocks {  
    local_ip = 0.0.0.0;
    local_port = 12345; 
    ip = 127.0.0.1;
    port = 1080;
}

# start
sudo service redsocks start
```

### IPset Rule ###

_凡是国外ip都采用shadowsocks_, 其实这条规则有点大，如果下载BT的话风险会很大。目前先按[tony1016](https://story.tonylee.name)的配置来。

``` bash
# execute command
curl 'http://ftp.apnic.net/apnic/stats/apnic/delegated-apnic-latest' | grep ipv4 | grep CN | awk -F\| '{ printf("%s/%d\n", $4, 32-log($5)/log(2)) }' > chnroute.txt  

# export ip to ipset
sudo ipset create chnroute hash:net  
cat chnroute.txt | sudo xargs -I ip ipset add chnroute ip 

# set autostart
sudo sh -c "ipset save chnroute > /etc/chnroute.ipset"

sudo vim /etc/rc.local
# add configuration
iptables-restore < /etc/iptables/rules.v4
```

### Firewall Rule ###

``` bash
# general rule for wlan0 wlan1
sudo iptables -t nat -A POSTROUTING -o wlan0 -j MASQUERADE
sudo iptables -A FORWARD -i wlan0 -o wlan1 -m state --state RELATED,ESTABLISHED -j ACCEPT
sudo iptables -A FORWARD -i wlan1 -o wlan0 -j ACCEPT

# shadowsocks rule
sudo iptables -t nat -N SHADOWSOCKS
sudo iptables -t nat -A SHADOWSOCKS -d 67.216.202.107 -j RETURN
sudo iptables -t nat -A SHADOWSOCKS -d 0.0.0.0/8 -j RETURN
sudo iptables -t nat -A SHADOWSOCKS -d 10.0.0.0/8 -j RETURN
sudo iptables -t nat -A SHADOWSOCKS -d 127.0.0.0/8 -j RETURN
sudo iptables -t nat -A SHADOWSOCKS -d 169.254.0.0/16 -j RETURN
sudo iptables -t nat -A SHADOWSOCKS -d 172.16.0.0/12 -j RETURN
sudo iptables -t nat -A SHADOWSOCKS -d 192.168.0.0/16 -j RETURN
sudo iptables -t nat -A SHADOWSOCKS -d 224.0.0.0/4 -j RETURN
sudo iptables -t nat -A SHADOWSOCKS -d 240.0.0.0/4 -j RETURN
sudo iptables -t nat -A SHADOWSOCKS -m set --match-set chnroute dst -j RETURN
sudo iptables -t nat -A SHADOWSOCKS -p tcp -j REDIRECT --to-ports 12345
sudo iptables -t nat -A OUTPUT -p tcp -j SHADOWSOCKS
sudo iptables -t nat -A PREROUTING -p tcp -j SHADOWSOCKS

# save rules to /etc/iptables/rules.v4
sudo sh -c "iptables-save > /etc/iptables/rules.v4"
```

Reference: 

[用树莓派打造无线中继科学上网路由器](https://story.tonylee.name/2016/03/31/yong-shu-mei-pai-da-zao-wu-xian-zhong-ji-ke-xue-shang-wang-lu-you-qi/)
[将树莓派Raspberry Pi设置为无线路由器(WiFi热点AP,RTL8188CUS芯片)](https://wangye.org/blog/archives/845/)
[树莓派打造科学上网无线路由器(基于Realtek 8192cu网卡)](https://www.tongfu.info/build-wireless-router-cross-china-firewall-use-raspberrypi-and-realtek-8192cu-usb-dongle/)
