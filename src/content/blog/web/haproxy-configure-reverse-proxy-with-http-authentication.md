---
title: Load Balance - HAProxy Configure Reverse Proxy With HTTP Authentication
description: >-
  最近在做另一个项目的performance测试，前端是用的HAProxy做负载均衡，以前都是用Nginx,
  HAProxy不是怎么熟，所以趁此机会把HAProxy梳理一遍。相对于后端，两台webserver, 分别有几块不同的performance测试：
  纯http访问，不涉及UI表单的匿名访问; 另一种UI p…
pubDate: '2016-08-25T00:00:00.000Z'
category: Web
tags:
  - HAProxy
  - Load Balance
ai: human
---

> 最近在做另一个项目的performance测试，前端是用的HAProxy做负载均衡，以前都是用Nginx, HAProxy不是怎么熟，所以趁此机会把HAProxy梳理一遍。相对于后端，两台webserver, 分别有几块不同的performance测试：
> 纯http访问，不涉及UI表单的匿名访问; 
> 另一种UI part涉及 Http Authentication表单的提交。

<!-- more -->

> **see the frist HA configuration:**

``` bash
# HA version
HA-Proxy version 1.4.19 2012/01/07
Copyright 2000-2011 Willy Tarreau <w@1wt.eu>
```

``` bash
global
        #maxconn         32768
        user            nobody
        group           nobody
        daemon
        nbproc          8
defaults
        stats           enable
        stats           realm Haproxy\ Statistics
        stats           uri /haproxy?stats
        stats           auth username:password
listen perf-psm
        bind            192.168.192.203:80
        mode            http
        balance         roundrobin
        maxconn         327680
        clitimeout      60000
        srvtimeout      60000
        contimeout      5000
        retries         3
        server          ibs03  192.168.192.207:80 weight 3 check
        server          ibs04  192.168.192.208:80 weight 3 check
        option          forwardfor
        option          httpclose 
        option          redispatch
        option          splice-request
        option          splice-response
```
> PS. HA version is too old, so used the diffence way to configure.
> The detail HA forward configuration see **[here](http://serverfault.com/questions/127491/haproxy-forward-to-a-different-web-server-based-on-uri)** **<--** 

> 重点说一下包含`HTTP Authentication`的HA配置，这一部分查了很多资料才解决**http keeplive**的问题。
> 并且这一部分的Authentication分**Basic**和**Windows**两种方式首先先看一下配置：

![haproxy-iis](/screenshots/haproxy-iis.png)

> Above screenshots, it is depend on windows authentication, enable provides contains Negotiate and NTLM

> **see the windows authentication configuration:**

``` bash
# add userlist for HA
userlist authusers
        group engdomain users entriqeng
        user entriqeng insecure-password entriqeng

# add ACL fiter for HA
listen perf-psm
	#option httpclose
	acl AuthOkay_Negotiate http_auth(authusers)
	http-request auth realm getuiauth if AuthOkay_Negotiate
```
> If used windows **basic authentication**, please modify these code block:

``` bash
listen perf-psm
	#option httpclose
	Acl AuthOkay_Basic http_auth(authusers)
	http-request auth realm getuiauth_Basic if !AuthOkay_Basic 
```

> Special attention, `option httpclose` because this version is `1.4.19` is didn't support `http-keep-alive`, so when used windows authentication, must comment this.
> And the detail answer please click **[here](http://stackoverflow.com/questions/28162452/how-to-make-ha-proxy-keepalive)** **<--**
> BTW, the detail **ACL** used way please click **[here](http://www.techrawr.com/2009/09/18/using-the-acl-in-haproxy-for-load-balancing-named-virtual-hosts/)** **<--**

> Of course, the detail way and analysis check the forward charecters, please use the **fiddler**.

> **sample track**
``` bash
BASIC:
Authorization: Basic ZW5nZG9tYWluXGVudHJpcWVuZzplbnRyaXFlbmc=

NTLM:
Authorization: Negotiate TlRMTVNTUAABAAAAB4IIogAAAAAAAAAAAAAAAAAAAAAFAs4OAAAADw==
WWW-Authenticate: Negotiate 
TlRMTVNTUAACAAAAEgASADgAAAAFgomi/ndd97GuRJAAAAAAAAAAAK4ArgBKAAAABgGxHQAAAA9FAE4ARwBEAE8ATQBBAEkATgACABIARQBOAEcARABPAE0AQQBJAE4AAQAUAFAARQBSAEYALQBJAEIAUwAwADMABAAaAGUAbgBnAGQAbwBtAGEAaQBuAC4AYwBvAG0AAwAwAHAAZQByAGYALQBpAGIAcwAwADMAL........
```
