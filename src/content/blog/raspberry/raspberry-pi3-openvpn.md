---
title: Raspberry Pi3 搭建OpenVPN
description: OpenVPN采用OpenSSL加密，并且可以选择443端口。
pubDate: '2016-09-11T00:00:00.000Z'
category: Raspberry
tags:
  - Raspberry
  - OpenVpn
  - 树莓派
ai: human
---

> `OpenVPN`采用`OpenSSL`加密，并且可以选择`443`端口。

<!-- more -->

### Install Server

``` bash
sudo apt-get install openvpn    
cp -r /usr/share/doc/openvpn/examples/easy-rsa/ /etc/openvpn/
```

### Generate CA 

#### Configure parameters
``` bash
cd /etc/openvpn/easy-rsa/2.0

# modify ./vars parameters

# Increase this to 2048 if you
# are paranoid.  This will slow
# down TLS negotiation performance
# as well as the one-time DH parms
# generation process.
export KEY_SIZE=2048
# In how many days should the root CA key expire?
export CA_EXPIRE=3650
# In how many days should certificates expire?
export KEY_EXPIRE=3650
# These are the default values for fields
# which will be placed in the certificate.
# Don't leave any of these fields blank.
export KEY_COUNTRY="TW"
export KEY_PROVINCE="Taiwan"
export KEY_CITY="Taipei"
export KEY_ORG="TakoBear"
export KEY_EMAIL="me@myhost.mydomain"
export KEY_EMAIL=mail@host.domain
export KEY_CN=changeme
export KEY_NAME=changeme
export KEY_OU=changeme
export PKCS11_MODULE_PATH=changeme
export PKCS11_PIN=1234
```

#### Generate CA step by step
``` bash
source ./vars
./clean-all
./build-ca
./build-key-server server
./build-key client
./build-dh
```

#### Copy CA Keys for Client
``` bash
cd /etc/openvpn/easy-rsa/2.0/keys

# copy ca.crt client.crt client.key to local
```

### Configure OpenVPN Server
``` bash
local xxx.xxx.xxx.xxx    
port 1194	#default port is 1194    
proto tcp	#default protcol is UDP    
dev tun
ca /etc/openvpn/easy-rsa/2.0/keys/ca.crt
cert /etc/openvpn/easy-rsa/2.0/keys/server.crt
key /etc/openvpn/easy-rsa/2.0/keys/server.key      
dh  /etc/openvpn/easy-rsa/2.0/keys/dh1024.pem    
server 10.8.0.0 255.255.255.0    
ifconfig-pool-persist ipp.txt
push "redirect-gateway def1"    
push "dhcp-option DNS 8.8.8.8"
push "dhcp-option DNS 8.8.4.4"    
client-to-client
keepalive 10 120
comp-lzo    
max-clients 50    
user nobody
group nogroup    
persist-key
persist-tun    
status openvpn-status.log    
log-append  openvpn.log    
verb 3    
mute 20 
```

### Start OpenVPN
``` bash
/etc/init.d/openvpn start
```

### Install Client

> Download URL: <http://openvpn.se/download.html>

#### Client configuration sample
``` bash
# vpn.ovpn

client
dev tun
proto tcp
remote example.org 1194    # change example.org to your server ip
resolv-retry infinite
nobind
persist-key
persist-tun
ca &quot;C:\\Program Files\\OpenVPN\\easy-rsa\\keys\\ca.crt&quot;
cert &quot;C:\\Program Files\\OpenVPN\\easy-rsa\\keys\\client.crt&quot;
key &quot;C:\\Program Files\\OpenVPN\\easy-rsa\\keys\\client.key&quot;
remote-cert-tls server
comp-lzo
verb 3
mute 20
```

#### Support ipv4
``` bash
# /etc/sysctl.conf
net.ipv4.ip_forward=1

# reload
sysctl -p
```

#### Conigure iptables

```
iptables -F
iptables -t nat -A POSTROUTING -s 10.8.0.0/24 -o venet0 -j MASQUERADE
iptables -A INPUT -p tcp -m state --state NEW --dport 22 -j ACCEPT
iptables -t nat -A PREROUTING -p udp -m udp --dport 53 -j DNAT --to-destination 8.8.8.8
iptables -A INPUT -p udp --dport 1194 -j ACCEPT
iptables -A INPUT -s 10.8.0.0/24 -p all -j ACCEPT
iptables -A FORWARD -d 10.8.0.0/24 -j ACCEPT
iptables -A INPUT -i tun+ -j ACCEPT
iptables -A FORWARD -i tun+ -j ACCEPT
iptables -t nat -A POSTROUTING -s 10.8.0.0/24 -j SNAT --to-source xxx.xxx.xxx.xxx

# quick save
iptables-save &gt; /etc/network/iptables
```

> Resources:
> <http://www.zhengyali.com/?p=52>
> <http://shumeipai.net/thread-578-1-1.html?_dsign=e5591959>
> <http://buzzdao.myds.me:1111/setup-l2tp-pptp-openvpn-on-ubuntu.html>
