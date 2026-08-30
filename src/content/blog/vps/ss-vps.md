---
title: 科学上网
description: 科学上网请使用socks代理软件，Bandwagonhost推广码戳这里
pubDate: '2015-08-15T00:00:00.000Z'
category: Vps
tags:
  - SS
  - Vps
  - Linux
ai: human
---

> 科学上网请使用socks代理软件，Bandwagonhost推广码**[戳这里](https://bandwagonhost.com/aff.php?aff=4208)**

<!-- more -->

> 当前脚本是python版一键安装， 其他版本参照Resource 

### SS Installation

> OS: CentOS 6，7，Debian，Ubuntu
> Memory：≥128M

#### Default Configuration

> `server port`: customize (default 8989)
> `client port`: 1080
> `password`: customize (default teddysun.com)
> #Note: This script default create single user, if configure multiple users, 
please modify `/etc/shadowsocks.json`, then restart service.

``` bash
wget --no-check-certificate https://raw.githubusercontent.com/teddysun/shadowsocks_install/master/shadowsocks.sh
chmod +x shadowsocks.sh
./shadowsocks.sh 2>&1 | tee shadowsocks.log
```
> output
```
Congratulations, shadowsocks install completed!
Your Server IP:your_server_ip
Your Server Port:your_server_port
Your Password:your_password
Your Local IP:127.0.0.1
Your Local Port:1080
Your Encryption Method:aes-256-cfb

Welcome to visit:https://teddysun.com/342.html
Enjoy it!
```
#### Windows Client Download

> <https://github.com/shadowsocks/shadowsocks-windows/releases>

### SS Deinstallation

``` bash
./shadowsocks.sh uninstall
```

### Configuration Sample

``` bash
#/etc/shadowsocks.json
{
    "server":"0.0.0.0",
    "local_address":"127.0.0.1",
    "local_port":1080,
    "port_password":{
         "8989":"password0",
         "9001":"password1",
         "9002":"password2",
         "9003":"password3",
         "9004":"password4"
    },
    "timeout":300,
    "method":"aes-256-cfb",
    "fast_open": false
}
```

### How to use

```
#start
/etc/init.d/shadowsocks start
#stop
/etc/init.d/shadowsocks stop
#restart
/etc/init.d/shadowsocks restart
#check status
/etc/init.d/shadowsocks status
```


Resources:
[秋水逸冰](https://teddysun.com/) - [Python版一键安装](http://teddysun.com/342.html)
[秋水逸冰](https://teddysun.com/) - [Go版一键安装](http://teddysun.com/392.html)
