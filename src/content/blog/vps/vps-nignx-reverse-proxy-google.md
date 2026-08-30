---
title: Nginx搭建Google反向代理
description: '其实很简单，拥有一台Vps, 一个domain, 还有一个SSL, 剩下的操作就是反向代理+证书。 PS. 风险有可能自己的vps会英勇牺牲，慎重'
pubDate: '2016-01-17T00:00:00.000Z'
category: Vps
tags:
  - Vps
  - Nginx
  - Google
ai: human
---

> 其实很简单，拥有一台`Vps`, 一个`domain`, 还有一个`SSL`, 剩下的操作就是反向代理+证书。
> PS. 风险有可能自己的`vps`会英勇牺牲~，慎重~

<!-- more -->

### Simple reverse way 

``` bash
# modify nginx conf

server
{
    listen          80;
    server_name     yourdomain.me;  #your domain
    location / {
        proxy_pass          http://www.google.com/;  #reverse domain
        proxy_redirect      off;
        proxy_set_header    X-Real-IP       $remote_addr;
        proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

> just browse <http://yourdomain.me>就ok了。

### Reverse proxy by SSL

> First, 开启`Nginx SSL`支持, 可以在[Namecheap](https://www.namecheap.com), [startssl](https://www.startssl.com/), 申请免费的`SSL`证书

#### Manage SSL
``` bash
mkdir -p /root/ssl && cd /root/ssl
```

#### Generate crt and key
``` bash
openssl req -new -newkey rsa:2048 -nodes -out example.com.csr -keyout example.com.key -subj "/C=US/ST=CA/L=Los Angeles/O=Example Inc./OU=Web Security/CN=example.com"
```

#### Post csr file to SSL CA Parter

> 验证好域名以后会颁发给你一个`.crt`文件，我们命名为 `example.com.crt`

#### Configure Google Reverse

``` bash
# vi /etc/nginx/sites-enabled/google.conf

server {
	listen 80;
	server_name example.com;
	return 301 https://example.com$request_uri;
	# http to https
    location / {
          rewrite ^/(.*)$ https://<yourdomain.name>$1 permanent;
}

server {
	listen 443 ssl;
	server_name example;
 
	ssl on;
	ssl_certificate /root/ssl/example.com.crt;
	ssl_certificate_key /root/ssl/example.com.key;

        ssl_prefer_server_ciphers on;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers EECDH+aRSA+AES;
        keepalive_timeout 70;
        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 10m;

	resolver 8.8.8.8;

	location / {
		google on;
		google_scholar "scholar.google.com";
	}
}
```

### Advance reverse proxy

> 在`reverse proxy`是替换原网页信息，需要引入第三方扩展模块：[`substitutions`](https://github.com/yaoweibin/ngx_http_substitutions_filter_module)
> 除此之外还有一个便捷配置`reverse proxy`的模块[`ngx_http_google_filter_module`](https://github.com/cuber/ngx_http_google_filter_module)

#### Use subs_filter module to optimize page request

``` bash 
# download source code
git clone https://github.com/yaoweibin/ngx_http_substitutions_filter_module.git

<!-- this block I think unnecessary
# add thirdparty modules
# cd nginx-1.9.3
# ./configure \
> --with-cc-opt='-g -O2 -fPIE -fstack-protector-strong -Wformat -Werror=format-security -D_FORTIFY_SOURCE=2' --with-ld-opt='-Wl,-Bsymbolic-functions -fPIE -pie -Wl,-z,relro -Wl,-z,now' --prefix=/usr/share/nginx --conf-path=/etc/nginx/nginx.conf --http-log-path=/var/log/nginx/access.log --error-log-path=/var/log/nginx/error.log --lock-path=/var/lock/nginx.lock --pid-path=/run/nginx.pid --http-client-body-temp-path=/var/lib/nginx/body --http-fastcgi-temp-path=/var/lib/nginx/fastcgi --http-proxy-temp-path=/var/lib/nginx/proxy --http-scgi-temp-path=/var/lib/nginx/scgi --http-uwsgi-temp-path=/var/lib/nginx/uwsgi --with-debug --with-pcre-jit --with-ipv6 --with-http_ssl_module --with-http_stub_status_module --with-http_realip_module --with-http_auth_request_module --with-http_addition_module --with-http_dav_module --with-http_geoip_module --with-http_gzip_static_module --with-http_image_filter_module --with-http_spdy_module --with-http_sub_module --with-http_xslt_module --with-mail --with-mail_ssl_module \
> --add-module=../ngx_http_substitutions_filter_module \
> --add-module=../ngx_http_google_filter_module
-->

# need recompile make & make intall nginx 
./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module --with-http_gzip_static_module --with-ipv6 --add-module=/path/to/ngx_http_substitutions_filter_module

make
make install
```

##### How to use subs_filter

> * `subs_filter $1 $2`	

``` bash
#replace `$1` to `$2`, support regex expression

subs_filter www.google.com yourdomain.me;
subs_filter st(\d*).example.com $1.example.com ir;
```
> * `subs_filter_types mime-type [mime-types]`

``` bash
#mean repace file type, defaut is text/html
```
##### nginx conf by `subs_filter` sample

``` bash
location / {
    proxy_redirect off;
    proxy_pass https://www.google.com/;
    proxy_set_header Host www.google.com;
    proxy_set_header User-Agent $http_user_agent;
    proxy_set_header Referer http://www.google.com;
    proxy_set_header Accept-Encoding "";
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto https;

```

#### Use proxy_cache module to speed request

> 增加`proxy module`参数

``` bash
# http layer
proxy_connect_timeout      5;
proxy_read_timeout         60;
proxy_send_timeout         5;
proxy_buffer_size          16k;
proxy_buffers              4 64k;
proxy_busy_buffers_size    128k;
proxy_temp_file_write_size 128k;
proxy_temp_path            /home/cache/temp;
proxy_cache_path           /home/cache/g4w levels=1:2 keys_zone=cache_g4w:3m inactive=7d max_size=5g; 
#7d means delete in 7days inactive, 5g means cache size

#Location layer
proxy_cache_key "$scheme://$host$request_uri";	#cache key rule, will auto clear
proxy_cache cache_g4w;			#cache section name, must same as previous define
proxy_cache_valid  200 304 3h;	#200 304 status will cache 3 hours
proxy_cache_valid 301 3d;		#301 status will cache 3 days
proxy_cache_valid any 1m;		#any other status will cache 1 minute
proxy_cache_use_stale invalid_header error timeout http_502;  
#when backend occurred error, 502 status or timeout, will start expire cache strategy
```

#### Check is work

``` bash
# nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful

# systemctl restart nginx
# server restart
service nginx restart
```

> Resources；
> <https://www.nginx.com/resources/admin-guide/reverse-proxy/>
> <https://zhgcao.github.io/2016/06/09/nginx-reverse-proxy-google/>
> <https://ttt.tt/162/>
> <https://hack0nair.me/2014-10-25-how-to-setup-reverse-proxy-by-nginx/>
