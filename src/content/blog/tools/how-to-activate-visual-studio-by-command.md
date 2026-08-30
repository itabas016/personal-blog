---
title: How to activate visual studio by command
description: >-
  vm agent 太多时候需要批量执行， 其实就一个bat脚本就可搞定。 ps：最后5位是vs的MPC code, 根据不同的vs version
  找到相对应的MPC code Resource:
pubDate: '2016-06-27T00:00:00.000Z'
category: Tools
tags:
  - Visual Studio
  - Script
ai: human
---

> vm agent 太多时候需要批量执行， 其实就一个`bat`脚本就可搞定。

``` bat
cd C:\Program Files (x86)\Microsoft Visual Studio 14.0\Common7\IDE
StorePID.exe xxxxx-xxxxx-xxxxx-xxxxx-xxxxx 07060
pause
```
> ps：最后5位是vs的MPC code, 根据不同的vs version 找到相对应的MPC code~

Resource: 
<https://msdn.microsoft.com/en-us/library/mt270173.aspx>
