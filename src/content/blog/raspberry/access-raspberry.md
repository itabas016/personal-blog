---
title: 外网访问树莓派
description: '在网上搜了下，大概有这么几种方法，当然你要是有公网的IP, 并且80端口是开启的便能直接ssh了，只不过大多数运营商都不会暴露这些...'
pubDate: '2016-09-08T00:00:00.000Z'
category: Raspberry
tags:
  - Raspberry
  - Ngrok
  - 树莓派
ai: human
---

> 在网上搜了下，大概有这么几种方法，当然你要是有公网的IP, 并且80端口是开启的便能直接ssh了，只不过大多数运营商都不会暴露这些...

<!-- more -->

### 公网IP直接访问

> 一般通过路由器(不管是一级路由还是N级路由)拿到的IP都是运营商提供的内网IP, 比如
```
10.0.0.0 - 10.255.255.255
172.16.0.0 - 172.31.255.255
192.168.0.0 - 192.168.255.255
```

#### 获取外网IP

> 参考IP查询网址：

> <http://www.ip138.com/>
> <http://ip.qq.com/>
> <http://jsonip.com/>
> <http://www.net.cn/static/customercare/yourip.asp/>
> <http://www.infosniper.net/>
> <http://bgp.he.net/>

> 如果外网IP不固定会变化，可以通过脚本来邮件发送，虽然这种方法比较笨，不过临时用用是可行的。

脚本可参照[`get_extenal_ip.py`](https://github.com/itabas016/PythonTrip/blob/master/sublime/extenral_ip.py)

#### 端口映射

> 在路由器端做端口映射，如果是二级或三级路由，并且需要有上级路由的权限，不然此方法不通。

> Resource: <http://www.jianshu.com/p/981520f10ed3>

> 这样通过`IP+Port`访问`Raspberry`就行了。

### Vpn

> 顾名思义就是让Raspberry与你当前的Client处于同一个网段，然后通过内网ssh.

> 所以要在`vps`上搭建`VPN`, 然后树莓派和控制端都连上`VPN`

### SSH内网穿透

> 原理是这样的假设`vps`地址是`10.10.10.10`，树莓派通过`ssh`连接到`vps`，同时将`vps`上某个端口比如`8888`映射到树莓派的`ssh`端口比如`22`，这样在`vps`上访问8888端口就相当于访问树莓派的`22`端口。
``` bash
$ ssh -f -N -R 8888:localhost:22 username@10.10.10.10
```

#### Autossh

> `autossh`可以使断开的`ssh`重连。

##### Add ssh public key

##### Configure auto connect when crash

``` bash
$ ssh-copy-id username@10.10.10.10
```

##### Start autossh

``` bash
$ autossh -M 5678 -fNR 8888:localhost:22 username@10.10.10.10
```

##### Auto Start autossh

``` bash
$ cat /etc/rc.local | grep autossh
su pi -c "autossh -M 5678 -fNR 8888:localhost:22 username@10.10.10.10"
```

> Resources: <https://github.com/ma6174/blog/issues/7>

#### Dynamic DNS

> 常用的[花生壳](http://hsk.oray.com/)动态域名, 当然还有很多其他免费的`DNS`运营商。

> <http://www.noip.com/>
> <https://duckdns.org/>
> <http://www.dnsdynamic.org/>
> <http://www.dynu.com/>
> <http://www.changeip.com/dns.php>
> ......

> 注册一个免费的壳域名，在路由器端`DNS`解析输入申请的壳域名账号及密码，配置完成。所有的工作都交给了壳域名来操作。

> 如果还做了端口映射，请用壳域名+映射端口来`ssh`

> Resource: 
> <http://hsk.oray.com/get/?icn=hsk_get&ici=hsk_home-grid#topology>
> <http://hsk.oray.com/news/4168.html>

#### [Ngrok](https://ngrok.com/)

> `ngrok`目前是非常流行的反向代理服务，可以进行内网穿透，支持80端口以及自定义`tcp`端口转发。
> 这样即使你的树莓派没有公网IP也可以使用SSH远程登陆。

> Offical Website: <https://ngrok.com/> 
> Open Source: <https://github.com/inconshreveable/ngrok>

##### Download & Install

``` bash
mkdir -p ~/proj/ngrok && cd ~/proj/ngrok
wget http://7xl5gf.com1.z0.glb.clouddn.com/assets/natapp/download/ngrok_linux_arm.zip
unzip ngrok_linux_arm.zip
chmod 755 ngrok
```

> 添加configuration

``` bash
# nano ngrok.cfg

server_addr: "ngrok.natapp.cn:4443" 
trust_host_root_certs: false
# because client no ssl, so this value isfalse
```

##### Net port Mapping

> **`http & https 80 port`**
``` bash
./ngrok -config ngrok.cfg -subdomain **example** 80 -subdomain
```

> **`TCP port mapping`**
``` bash
./ngrok -proto=tcp -config ngrok.cfg 22
```

> TCP port didn't support subdomain, it's need configure tcp parameter manmually.

> **`Mutiple ports mapping`**
``` bash
# nano ./ngrok.cfg
tunnels:
    http:
    proto:
    http: 80
    subdomain: example
    ssh:
    proto:
    tcp: 22
    remote_port: 55699
# start
./ngrok -config=ngrok.cfg start http ssh
``` 

> 详细配置参照这篇文章[自建ngrok server进行内网穿透](http://io.itabas.com/2016/09/24/vps/ngrok-server/)

> Resources: 
> <https://www.rpicn.org/documentation/remote-access/access-over-internet/ngrok/>
> <https://blog.phpgao.com/ngrok_how_to.html>
