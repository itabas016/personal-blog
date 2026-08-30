---
title: Windows Install Redis Service by Chocolate
description: >-
  Recently, a company's project that use Redis hot standby intead of Asp.Net
  state service provider. So I look around a lot of technical resources and find
  a s…
pubDate: '2016-09-20T00:00:00.000Z'
category: Tools
tags:
  - Redis
ai: human
---

> Recently, a company's project that use `Redis` hot standby intead of `Asp.Net` state service provider. 
> So I look around a lot of technical resources and find a solution: **[aspnet-redis-providers](https://github.com/Azure/aspnet-redis-providers)**

> And the detail see that article **[Use Redis service instead of Asp.Net session provider](http://io.itabas.com/2016/09/21/redis-service-instead-of-aspnet-session-provider/)**

> This article talk about **How to install redis in windows**

<!-- more -->

### Chocolate Install Redis

``` powershell
# install choco
@powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```

``` cmd
# install redis-64
choco install redis-64
```

### Redis Configuration

#### Install Redis Service

> Sample - [`redis.windows.conf`](https://github.com/itabas016/TutorialsPoint/tree/master/redis/redis-windows.conf)

``` cmd
# default port 6379
redis-server --service-install redis.windows.conf --loglevel verbose
# port 6380
redis-server --service-install --service-name Redis6380 --port 6380
```

#### Uninstall Redis Service

``` cmd
redis-server --service-uninstall --service-name Redis6380 --port 6380
```

#### Redis Service Operation

``` cmd
# start
redis-server --service-start

# stop
redis-server --service-stop
```

### Redis Sentinel Configuration

> Sample - [`redis.sentinel.conf`](https://github.com/itabas016/TutorialsPoint/tree/master/redis/windows-sentinel.conf)

``` cmd
redis-server --service-install --service-name redisSentinel sentinel.conf --sentinel
```

> And the more `Redis` please see the **[Redis Tutorials](https://github.com/itabas016/TutorialsPoint/tree/master/redis)**~
