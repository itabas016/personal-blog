---
title: Use Redis Service Instead of Asp.Net Session Provider
description: >-
  Asp.Net Session Provider can't realize Master-Slave switching function, but
  the stable release of Redis Sentinel is shippedd since Redis 2.8. Certainly,
  the…
pubDate: '2016-09-21T00:00:00.000Z'
category: Web
tags:
  - Redis
  - Asp.Net
  - State Server
ai: human
---

> `Asp.Net` Session Provider can't realize `Master-Slave` switching function, but the stable release of `Redis Sentinel` is shippedd since `Redis 2.8`. Certainly, the sentinel function is support `Monitoring`, `Notification`, `Automatic failover` and `Configuration provider`.

> If you want to know the extra information about `Redis Sentinel`, --> **[click here](http://redis.io/topics/sentinel)**

<!-- more -->

### Aspnet Redis Provider

#### Source Code
> Go back to session provider, I found an solution in github, the open source **[see here](https://github.com/Azure/aspnet-redis-providers)**

> * If you just use redis make the session provider, this solution is completely instead of the Asp.Net session provider.
> * But if you want `master-slave` switching or mutltiple instance used in redis master-slave swtiching, I fork the project and checkout a new branch, the code --> **[see here](https://github.com/itabas016/aspnet-redis-providers)**

> BTW, How to install redis and redis sentinel please **[see here](/2016/09/20/tools/chocolate-intall-redis-windows/)**, And the detail `Redis Sentinel` configuration for windows please **[see here](https://github.com/itabas016/TutorialsPoint/blob/master/redis/sentinel.md)** 

![redis-master-slave-sentinel](/screenshots/redis-master-slave-sentinel.png)

#### Configuration for Application
> PS. The sample `web.config` configuration for `Redis Single`
``` xml
<sessionState mode="Custom" customProvider="MySessionStateStore">
    <providers>
    <!--
    <add name="MySessionStateStore"
           host = "127.0.0.1" [String]
        port = "" [number]
        accessKey = "" [String]
        ssl = "false" [true|false]
        throwOnError = "true" [true|false]
        retryTimeoutInMilliseconds = "0" [number]
        databaseId = "0" [number]
        applicationName = "" [String]
        connectionTimeoutInMilliseconds = "5000" [number]
        operationTimeoutInMilliseconds = "5000" [number]
    />
    -->
    <add name="MySessionStateStore" type="Microsoft.Web.Redis.RedisSessionStateProvider" host="127.0.0.1" accessKey="" ssl="false"/>
    </providers>
</sessionState>
```

> PS. The other sample `web.config` configuration for `Redis Sentinel`
``` xml
<connectionStrings>
	<add name="RedisConnection" connectionString="192.168.192.215:26379,192.168.192.205:26379,serviceName=mymaster,ssl=false" />
</connectionStrings>
<sessionState mode="Custom" customProvider="MySessionStateStore">
      <providers>
        <add name="MySessionStateStore" type="Microsoft.Web.Redis.RedisSessionStateProvider"
					connectionString="RedisConnection" operationTimeoutInMilliseconds="5000" />
      </providers>
</sessionState>
```

#### Question
> Above this, I think a question about `redis master ip` when redis master instance is crash, how is it switched? 
> The answer in the `Redis Sentinel` configuration, because I input the redis sentinel `ip` and `port` in the `web config`, base on the **quorum argument**.

> So, if I don't change the source code, I can't get the `master ip` when master instance crashed, but it's other way to get the IP, `Keepalived`, It will generate the `virtual IP`, and you can bind your redis instances ip, Ahha It's only support on linux, so this solution is not suitable for me.

> And the detail configuration and How to realize it, please **[see this article](/2016/09/29/web/use-keepalived-switching-master-slave-solution/)** 

> Resources:
<http://lib.csdn.net/article/redis/18114>
