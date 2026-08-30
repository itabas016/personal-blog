---
title: 自建Ngrok服务器 - 内网穿透
description: >-
  Secure tunnels to localhost I want to expose a local server behind a NAT or
  firewall to the internet Offical Site:
pubDate: '2016-09-24T00:00:00.000Z'
category: Vps
tags:
  - Vps
  - Ngrok
ai: human
---

> **Secure tunnels to localhost**
> I want to expose a local server behind a NAT or firewall to the internet~
> Offical Site: <https://ngrok.com/>

<!-- more -->

### Prepare
#### Download code
> 可以直接在官网上下载OS对应的`package`, ` unzip /path/to/ngrok.zip`, `$ ./ngrok help`
> 当然从`git`源码下载也ok.
``` bash
git clone https://github.com/inconshreveable/ngrok.git
cd ngrok
```
#### Configure dns
``` bash
ngrok.yourdomain.com     -------> A记录到你的VPS IP
*.ngrok.yourdomain.com   ------->  CNAME到ngrok.yourdomain.com
```
#### Generate CA
``` bash
export NGROK_DOMAIN="grok.yourdomain.com"

openssl genrsa -out rootCA.key 2048
openssl req -x509 -new -nodes -key rootCA.key -subj "/CN=$NGROK_DOMAIN" -days 36500 -out rootCA.pem
openssl genrsa -out device.key 2048
openssl req -new -key device.key -subj "/CN=$NGROK_DOMAIN" -out device.csr
openssl x509 -req -in device.csr -days 36500 -CA rootCA.pem -CAkey rootCA.key -CAcreateserial -out device.crt 
cp rootCA.pem assets/client/tls/ngrokroot.crt
cp device.crt assets/server/tls/snakeoil.crt 
cp device.key assets/server/tls/snakeoil.key
```

### Make

#### Server sample

``` bash
# 服务端运行在Linux下，我们不需要任何操作
# 发布server版
make release-server
# make release-xxx会把asset文件里面的东西打包成一个可执行文件

# 运行服务端
# 帮助信息
./ngrokd -h
Usage of ./ngrokd:
  -domain string
        Domain where the tunnels are hosted (default "ngrok.com")
  -httpAddr string
        Public address for HTTP connections, empty string to disable (default ":80")
  -httpsAddr string
        Public address listening for HTTPS connections, emptry string to disable (default ":443")
  -log string
        Write log messages to this file. 'stdout' and 'none' have special meanings (default "stdout")
  -log-level string
        The level of messages to log. One of: DEBUG, INFO, WARNING, ERROR (default "DEBUG")
  -tlsCrt string
        Path to a TLS certificate file
  -tlsKey string
        Path to a TLS key file
  -tunnelAddr string
        Public address listening for ngrok client (default ":4443")

./ngrokd -domain=$NGROK_DOMAIN
# 可以指定端口
./ngrokd -domain=$NGROK_DOMAIN -httpAddr=":8080" -httpsAddr=":8081"
```

#### Client sample
``` bash
# 假设我要在mac上运行客户端，需要在编译命令前加上一些参数
GOOS=darwin GOARCH=amd64 make release-client
# 编译好后scp到本地
scp xxx xxx


# 下面开始本地配置

# 打开配置文件
vim ngrok.cfg

# 添加一下两行
# 第一行是将要绑定的域名+4443端口

server_addr: "ngrok.yourdomain.com:4443"
trust_host_root_certs: true

# 帮助信息
./ngrok -h
Examples:
    ngrok 80
    ngrok -subdomain=example 8080
    ngrok -proto=tcp 22
    ngrok -hostname="example.com" -httpauth="user:password" 10.0.0.1

# 8080就是我们要转发的端口了
./ngrok -config=./ngrok.cfg 8080

# 指定协议和端口，不指定默认是 http+https
./ngrok -config=./ngrok.cfg -proto=tcp 22

# 指定子域名，不指定就会随机生成
./ngrok -config=./ngrok.cfg -subdomain=test 8080
```

### How to run

`http://127.0.0.1:4040`外部转发页面，`ngrok`查看运行状态

``` bash
# 添加自启动服务
vim /etc/rc.local

# 添加以下命令，注意使用绝对路径
# 服务端
nohup /path/to/ngrokd -domain=ngrok.phpgao.com -log="/tmp/ngrok.log" >/dev/null 2>&1 &

# 客户端
nohup ./ngrok -config ngrok.cfg -log stdout -log-level="INFO" -subdomain=test 8080 >/tmp/ngrok.log 2>&1 &
```


> Resources:
> <https://blog.phpgao.com/ngrok_how_to.html>
> <https://blog.phpgao.com/ssh-reverse-tunnel.html>
