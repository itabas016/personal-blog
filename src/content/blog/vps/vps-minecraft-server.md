---
title: Vps搭建Minecraft Server
description: >-
  Minecraft这是一款沙盒游戏，玩家可以再三维世界里用方块建造建筑物，中文译为我的世界。
  听说这款游戏热度特别高，可以自搭私服，拉伙伴一起玩。就用现成的VPS尝试搭建一个server.
pubDate: '2016-01-14T00:00:00.000Z'
category: Vps
tags:
  - Vps
  - Minecraft
  - Linux
ai: human
---

> [`Minecraft`](https://minecraft.net/)这是一款沙盒游戏，玩家可以再三维世界里用方块建造建筑物，中文译为**我的世界**。
听说这款游戏热度特别高，可以自搭私服，拉伙伴一起玩。就用现成的`VPS`尝试搭建一个`server`.

<!-- more -->

### Install JDK

``` bash
# CentOS
yum -y install java-1.6.0-openjdk

# Debian:
sudo apt-get install python-software-properties
sudo add-apt-repository ppa:ferramroberto/java
sudo apt-get update
sudo apt-get install sun-java6-jdk
```

### Install Screen

> Because we can't keep connection long time by SSH, so we need `Screen` tool to keep touch with the Minecraft server.

``` bash
# CentOS
yum -y install screen

# Debian
apt-get install screen
```

### Download Server client

``` bash
cd / 
mkdir Minecraft 
cd Minecraft 
wget http://s3.amazonaws.com/Minecraft.Download/versions/1.8.7/minecraft_server.1.8.7.jar
```

### Configure Server

> `Xmx` is mean the max used memory, `Xms` is mean the min used memory, so the min memory is better > 256M, because is hard to start server when the value is below 256M.

``` bash
screen -S Minecraft
cd /Minecraft
java -Xmx768M -Xms256M -jar minecraft_server.1.8.7.jar nogui
#java -Xmx256M -Xms256M -jar minecraft_server.1.8.7.jar nogui
```

### How to use

> input `ip + 25565`

PS. 用`vps`玩了两下server就挂了，低配的server不适合自建私服。

> Resources:
> <https://www.vmvps.com/how-to-using-vps-to-build-your-own-minecraft-server.html>
