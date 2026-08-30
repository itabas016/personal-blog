---
title: SS加速的解决方案
description: 根据vps的特点选择适合自己的加速方案，Openvz和Kvm以及Xen (如何检测Vps架构↓↓↓) 不同架构处理方式也是不同。
pubDate: '2016-09-06T00:00:00.000Z'
category: Vps
tags:
  - SS
  - SS加速
  - Vps
  - Linux
ai: human
---

> 根据vps的特点选择适合自己的加速方案，Openvz和Kvm以及Xen (**[如何检测Vps架构↓↓↓](#more)**) 不同架构处理方式也是不同。

<!-- more -->

```
#91yun check script
wget -N --no-check-certificate https://raw.githubusercontent.com/91yun/code/master/vm_check.sh && bash vm_check.sh

```

### [net-speeder](https://github.com/snooda/net-speeder)

> 在高延迟不稳定链路上优化单线程下载速度

> 开启了net-speeder的服务器上对外ping时看到的是4倍，实际网络上是2倍流量。另外两倍是内部dup出来的，不占用带宽。 另外，内部dup包并非是偷懒未判断。。。是为了更快触发快速重传的。 

> net-speeder不依赖ttl的大小，ttl的大小跟流量无比例关系。不存在windows的ttl大，发包就多的情况。

#### Installation

> 一键安装script

##### ubuntu/debian
``` bash
shell wget --no-check-certificate https://raw.githubusercontent.com/tennfy/debian_netspeeder_tennfy/master/debian_netspeeder_tennfy.sh chmod a+x debian_netspeeder_tennfy.sh bash debian_netspeeder_tennfy.sh
```

##### centos
```
wget --no-check-certificate https://gist.github.com/LazyZhu/dc3f2f84c336a08fd6a5/rawd8aa4bcf955409e28a262ccf52921a65fe49da99/net_speeder_lazyinstall.sh sh net_speeder_lazyinstall.sh
```

> source code `make` and `make install`

> **net-speed** [opensource](https://github.com/snooda/net-speeder)

#### How to use

`cp ./net_speeder /usr/bin`

> #comments:
> `parameter: net_speeder netdisk rule (bpf)` 
> `net_speeder venet0 "ip"`

``` bash
/usr/bin/net_speeder venet0 "ip"
# add netspeed to 
echo 'nohup /usr/bin/net_speeder venet0 "ip" >/dev/null 2>&1 &' >> /etc/rc.local
```

### [kcptun](https://github.com/xtaci/kcptun)

> Kcptun是一个非常简单和快速的，基于 KCP 协议的 UDP 隧道，它可以将 TCP 流转换为 KCP+UDP 流。而 KCP 是一个快速可靠协议，能以比 TCP 浪费10%-20%的带宽的代价，换取平均延迟降低 30%-40%，且最大延迟降低三倍的传输效果。
> Kcptun是 KCP 协议的一个简单应用，可以用于任意 TCP 网络程序的传输承载，以提高网络流畅度，降低掉线情况。由于 Kcptun 使用 Go 语言编写，内存占用低（经测试，在64M内存服务器上稳定运行），而且适用于所有平台，甚至 Arm 平台。

#### Installation

> **[一键安装script](https://blog.kuoruan.com/110.html)**

``` bash
wget --no-check-certificate https://raw.githubusercontent.com/kuoruan/kcptun_installer/master/kcptun.sh
chmod +x ./kcptun.sh
./kcptun.sh
```

``` bash
# configure kcptun server port:
please input kcptun server port [1-65535]: (default 29900)

# configure speed ip:
please input speed ip [0.0.0.0 ~ 255.255.255.255]: (default 127.0.0.1)

# configure speed port:
please input speed port [1-65535]: (default 12948)

# configure kcptun password:
please input kcptun password: (default it's a secrect)
```

### [finalspeed](https://github.com/91yun/finalspeed)

> FinalSpeed是高速双边加速软件,可加速所有基于tcp协议的网络服务,在高丢包和高延迟环境下,仍可达到90%的物理带宽利用率,即使高峰时段也能轻松跑满带宽.
> 适用与Openvz, 并且占用内存大

#### Installation

> 一键安装script

``` bash
wget -N --no-check-certificate https://raw.githubusercontent.com/91yun/finalspeed/master/install_fs.sh && bash install_fs.sh
```

> 一键卸载script

``` bash
wget -N --no-check-certificate https://raw.githubusercontent.com/91yun/finalspeed/master/install_fs.sh && bash install_fs.sh uninstall
```

#### How to use

```
# install path: /fs/
# log path: /fs/server.log

# start
/etc/init.d/finalspeed start

# stop
/etc/init.d/finalspeed stop

# check status&log
/etc/init.d/finalspeed status
```

##### [windows client download](https://github.com/91yun/finalspeed/raw/master/finalspeed_install1.0.exe)
##### [linux & os x client download](https://raw.githubusercontent.com/91yun/finalspeed/master/finalspeed_client.zip)

Resource: <https://www.91yun.org/archives/615>
