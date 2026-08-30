---
title: Raspberry Pi3 服务部署
description: '其实网上教程是挺多的，这里只列出我自己所用到的几个，samba,nginx,aria2,git...'
pubDate: '2016-06-16T00:00:00.000Z'
category: Raspberry
tags:
  - Raspberry
  - NAS
  - Web Server
  - Git Server
  - Aria2
  - 树莓派
ai: human
---

其实网上教程是挺多的，这里只列出我自己所用到的几个，`samba`,`nginx`,`aria2`,`git`...

<!-- more -->
## Samba

``` bash
$ sudo apt-get install samba samba-common-bin -y

$ sudo cp /etc/samba/smb.conf /etc/samba/smb.conf.orig

#modify conf
$ sudo vim /etc/samba/smb.conf
```

修改以下内容：
``` vim
[share] 
comment = Guest access shares 
path = /home/pi/shares 
browseable = yes 
writable = yes 
#read only = yes 
guest ok = yes 
public = yes 

[NAS] 
comment = NAS folder 
path = /home/pi/nas/ 
browseable = yes 
writable = yes 
valid users = pi
```

restart service
``` bash
$ sudo service samba restart
or
$ sudo service smbd restart
```

## Web Server

常见的lightweight web server有`Nginx|Haproxy|Apache|lighttppd + PHP|Flask + Mysql|Sqlite`.
下面以nginx为例

### Install and Configure Nginx+Php
``` bash
$ sudo apt-get install nginx
$ sudo apt-get install php5-fpm
```

修改nginx配置文件
``` bash
$ sudo vi /etc/nginx/sites-available/default
```

注意nginx所运行的user和wwwroot目录的文件所有者
``` bash
server {
	listen 8080;
	## listen for ipv4; this line is default and implied
	server_name $domain_name;
	root /var/www;
	index index.html index.htm index.php;
	access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    location ~\.php$ {
                fastcgi_pass unix:/var/run/php5-fpm.sock;
                fastcgi_split_path_info ^(.+\.php)(/.*)$;
                fastcgi_index index.php;
                fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
                fastcgi_param HTTPS off;
                try_files $uri =404;
                include fastcgi_params;
        }
}
```

restart nginx server, create test php
``` php
<?php echo phpinfo(); ?>
```

关于nginx的详细配置可以参见blog内nginx其他文章。

### Configure MySQL and phpMyAdmin
Install `MySQL`, `phpMyAdmin`, and `php5-mysql`.

``` bash
$ sudo apt-get install mysql-server mysql-client php5-mysql phpmyadmin
```

Make a link of phpMyAdmin from /usr/share/phpmyadmin to /var/www/phpmyadmin.
``` bash
$ sudo ln -s /usr/share/phpmyadmin /var/www/phpmyadmin
```
上述只是简单配置。详情可参考[SETTING UP AN NGINX WEB SERVER ON A RASPBERRY PI](https://www.raspberrypi.org/documentation/remote-access/web-server/nginx.md)

另外nginx+flask也可以尝试一下，详细参考文档看这里[BUILD A PYTHON-POWERED WEB SERVER WITH FLASK](https://www.raspberrypi.org/learning/python-web-server-with-flask/worksheet/)

## Aria2 Download
### Install aria2 use apt package manager
``` bash
$ sudo apt-get install aria2
```

### Prepare configuration
``` bash
# make aria2 folder
$ sudo mkdir /etc/aria2

# make aria2 session file and configuration file
$ sudo touch /etc/aria2/aria2.session
$ sudo vim /etc/aria2/aria2.conf
```

### Configure aria2 configuration
``` bash
## Aria2 configuration ##

# download path, using harddisk base on samba
dir=/media/pi/ITABAS/download

# enable disk cache, 0 is disable,default is 16M(aria2 version>=1.16)
# 启用磁盘缓存, 0为禁用缓存, 需1.16以上版本, 默认:16M
disk-cache=32M
# enable continue process when process crash
# 断点续传
continue=true

# File pre allocation method can effectively reduce disk fragmentation,
# recommend value prealloc
# If external disk system is NTFS recommend use falloc
# 文件预分配方式, 能有效降低磁盘碎片, 默认:prealloc
# 预分配所需时间: none < falloc ? trunc < prealloc
# falloc和trunc则需要文件系统和内核支持
# NTFS建议使用falloc, EXT3/4建议trunc, MAC 下需要注释此项
file-allocation=falloc

## download connection ##

# max concurrent download connections(runtime can be modified), default is 5
# 最大同时下载任务数, 运行时可修改, 默认:5
max-concurrent-downloads=5

# max concurrent connections per server(runtime can be modified), default is 1
# 同一服务器连接数, 添加时可指定, 默认:1
max-connection-per-server=15

# download speed limit(runtime can be modified), default is 0(unlimited)
# 整体下载速度限制, 运行时可修改, 默认:0（不限制）
max-overall-download-limit=0

# sigle task download speed limit, default is 0(unlimited)
# 单个任务下载速度限制, 默认:0（不限制）
max-download-limit=0

# upload speed limit(runtime can be modified), default is 0(unlimited)
# 整体上传速度限制, 运行时可修改, 默认:0（不限制）
max-overall-upload-limit=0

# sigle task upload speed limit, default is 0(unlimited)
# 单个任务上传速度限制, 默认:0（不限制）
max-upload-limit=0

# disable ipv6, default is false
# 禁用IPv6, 默认:false
disable-ipv6=true

# minimum split file size(can be specified when added) range: 1M - 1024M, default is 20M
# 最小文件分片大小, 添加时可指定, 取值范围1M -1024M, 默认:20M
# 假定size=10M, 文件为20MiB 则使用两个来源下载; 文件为15MiB 则使用一个来源下载
min-split-size=10M

# sigle task maximum threads, default is 5
# 单个任务最大线程数, 添加时可指定, 默认:5
split=10

## progress preservation related ##

# read download session for session file
# 从会话文件中读取下载任务
input-file=/etc/aria2/aria2.session

# save download session when pause or other actions
# 在Aria2退出时保存错误的、未完成的下载任务到会话文件
save-session=/etc/aria2/aria2.session

# save session interval(seconds)
# 定时保存会话, 0为退出时才保存, 需1.16.1以上版本, 默认:0
save-session-interval=60

## RPC related ##

# enable rpc funtion, default is false
# 启用RPC, 默认:false
enable-rpc=true

# enable origin source, default is false
# 允许所有来源, 默认:false
rpc-allow-origin-all=true

# enable visit from external ip, default is false
# 允许外部访问, 默认:false
rpc-listen-all=true

# enable rpc listen port, default is 6800
# RPC端口, 仅当默认端口被占用时修改
rpc-listen-port=6800

# rpc authorized token
# 设置的RPC授权令牌, v1.18.4新增功能, 取代 --rpc-user 和 --rpc-passwd 选项
#rpc-secret=<TOKEN>

## BT/PT download related ##

# enable BT task when download file follow .torrent extension, default is true
# 当下载的是一个种子(以.torrent结尾)时, 自动开始BT任务, 默认:true
follow-torrent=true

# 客户端伪装, PT需要
peer-id-prefix=-TR2770-
user-agent=Transmission/2.77
# 强制保存会话, 即使任务已经完成, 默认:false
# 较新的版本开启后会在任务完成后依然保留.aria2文件
#force-save=false

# keep bt task without authorized, default is false
# 继续之前的BT任务时, 无需再次校验, 默认:false
bt-seed-unverified=true

# save bt metadata file, default is false
# 保存磁力链接元数据为种子文件(.torrent文件), 默认:false
bt-save-metadata=true
```

### Check aria2 is work
``` bash
$ sudo aria2c --conf-path=/etc/aria2/aria2.conf -D
```

### Create auto start service

#### created init script

``` bash
$ sudo vim /etc/init.d/aria2c
```

``` bash
#!/bin/sh
### BEGIN INIT INFO
# Provides: aria2c
# Required-Start:    $network $local_fs $remote_fs
# Required-Stop:     $network $local_fs $remote_fs
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: aria2c RPC init script.
# Description: Starts and stops aria2 RPC services.
### END INIT INFO

case "$1" in
    start)
        echo "Starting service Aria2..."
        sudo -u pi aria2c --conf-path=/etc/aria2/aria2.conf -D
        echo "Start service done."
    ;;
    stop)
        echo "Stoping service Aria2..."
        killall aria2c
        echo "Stop service done."
    ;;
    restart)
        $0 stop && sleep 3 && $0 start
   ;;
esac
exit
```
#### executable script and make auto start

``` bash
$ sudo chmod +x /etc/init.d/aria2c
$ sudo apt-get -y install chkconfig
$ sudo chkconfig --add aria2c
$ sudo update-rc.d aria2cRPC defaults
```

### aria2 UI frontend
Use [webui-aria2](https://github.com/ziahamza/webui-aria2) or [Yaaw](https://binux.github.io/yaaw/) 

**PS. base on nginx**
``` bash
$ git clone https://github.com/ziahamza/webui-aria2.git /var/www/html/

# modify nginx configuration
$ sudo vim /etc/nginx/sites-available/default

# add location configuration
location webui-aria2 {
                root html;
                index index.html index.htm;
        }

```

## Git Local Server

官方install document已经很详细了。[Setting up Git Server](https://git-scm.com/book/en/v2/Git-on-the-Server-Setting-Up-the-Server)
按步骤一步步来~
