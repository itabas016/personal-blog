---
title: Sublime Text 快捷键备忘
description: Sublime 火了可不止两三年，如果是前端开发，或者是写脚本，可真是神器。只可惜我这做后端开发的接触这个倒挺早，却一直没有深入。 比较常见的就不写了
pubDate: '2016-10-10T00:00:00.000Z'
category: Tools
tags:
  - Sublime
  - Shortcut
  - Editor
ai: human
---

> Sublime 火了可不止两三年，如果是前端开发，或者是写脚本，可真是神器。只可惜我这做后端开发的接触这个倒挺早，却一直没有深入。
> 比较常见的就不写了~

<!-- more --> 
### General
```
Alt：调出菜单
Ctrl + Shift + P：调出命令板（Command Palette）
Ctrl + `：调出控制台
Ctrl + X：删除当前行
Ctrl + M：跳转到对应括号
Ctrl + U：软撤销，撤销光标位置
Ctrl + /：注释当前行
Ctrl + Shift + /：当前位置插入注释
Ctrl + F2：设置/删除标记
Ctrl + Alt + /：块注释，并Focus到首行，写注释说明用的
Ctrl + Shift + A：选择当前标签前后，修改标签用的
```
### Editing
```
Ctrl + Enter：在当前行下面新增一行然后跳至该行
Ctrl + Shift + Enter：在当前行上面增加一行并跳至该行
Ctrl + ←/→：进行逐词移动
Ctrl + Shift + ←/→进行逐词选择
Ctrl + ↑/↓移动当前显示区域
Ctrl + Shift + ↑/↓移动当前行
```
### Selecting
```
Ctrl + D：选择当前光标所在的词并高亮该词所有出现的位置，再次Ctrl + D选择该词出现的下一个位置，在多重选词的过程中，使用Ctrl + K进行跳过，使用Ctrl + U进行回退，使用Esc退出多重编辑
Ctrl + L：选择行，重复可依次增加选择下一行
Ctrl + Shift + L：将当前选中区域打散
Ctrl + J：把当前选中区域合并为一行
Ctrl + M：在起始括号和结尾括号间切换
Ctrl + Shift + M：快速选择括号间的内容
Ctrl + Shift + J：快速选择同缩进的内容
Ctrl + Shift + Space：快速选择当前作用域（Scope）的内容
Ctrl + KU 改为大写
Ctrl + KL 改为小写

```
### Finding&Replacing
```
Ctrl+P：搜索项目中的文件
F3：跳至当前关键字下一个位置
Shift + F3：跳到当前关键字上一个位置
Alt + F3：选中当前关键字出现的所有位置
Ctrl + F/H：进行标准查找/替换，之后：
	Alt + C：切换大小写敏感（Case-sensitive）模式
	Alt + W：切换整字匹配（Whole matching）模式
	Alt + R：切换正则匹配（Regex matching）模式
Ctrl + Shift + H：替换当前关键字
Ctrl + Alt + Enter：替换所有关键字匹配
Ctrl + Shift + F：多文件搜索&替换
Ctrl + Shift + V：粘贴并格式化
```
### Jumping
```
Ctrl + P：跳转到指定文件，输入文件名后可以：
    @ 符号跳转：输入@symbol跳转到symbol符号所在的位置
    # 关键字跳转：输入#keyword跳转到keyword所在的位置
    : 行号跳转：输入:12跳转到文件的第12行。
Ctrl + R：跳转到指定符号
Ctrl + G：跳转到指定行号
```
### Window
```
Ctrl + Shift + N：创建一个新窗口
Ctrl + N：在当前窗口创建一个新标签
Ctrl + W：关闭当前标签，当窗口内没有标签时会关闭该窗口
Ctrl + Shift + W：关闭所有打开文件
Ctrl + Shift + T：恢复刚刚关闭的标签
Ctrl + K + B：开关侧栏
```
### Screen
```
F11：切换普通全屏
Shift + F11：切换无干扰全屏
Alt + Shift + 2：进行左右分屏
Alt + Shift + 8：进行上下分屏
Alt + Shift + 5：进行上下左右分屏
分屏之后，使用Ctrl + 数字键跳转到指定屏，使用Ctrl + Shift + 数字键将当前屏移动到指定屏
```

### Plugin

> 启用Package Control `Menu – View – Show Console`
```
import urllib2,os;pf='Package Control.sublime-package';ipp=sublime.installed_packages_path();os.makedirs(ipp) if n
```
> install plugin `Ctrl+Shift+P` input `install Pacakge - Enter`

##### ZenCoding
> 不得不用的一款前端开发方面的插件，Write less , show more.安装后可直接使用，Tab键触发，Alt+Shift+W是个代码机器。

##### Alignment
> 代码对齐，如写几个变量，选中这几行，Ctrl+Alt+A，哇，齐了。

##### Prefixr
> 写 CSS可自动添加 -webkit 等私有词缀，Ctrl+Alt+X触发。

##### Tag
> Html格式化，右键Auto-Format Tags on Ducument。

##### Clipboard History
> 剪贴板历史记录，显示更多历史复制，Ctrl+Shift+V触发。

##### SideBarEnhancements
> 侧栏右键功能增强，非常实用

##### Theme – Soda
> 完美的编码主题，用过的都说好，Setting user里面添加”theme”: “Soda Dark.sublime-theme”

##### GBK to UTF8
> 将文件编码从GBK转黄成UTF8，菜单 – File里面找

##### SFTP
> 直接编辑 FTP 或 SFTP 服务器上的文件，绝对FTP浮云

##### WordPress
> 集成一些WordPress的函数，对于像我这种经常要写WP模版和插件的人特别有用

##### PHPTidy
> 整理排版PHP代码

##### YUI Compressor
> 压缩JS和CSS文件

Resources: 
<http://www.jianshu.com/p/7833f29c5aae>
<http://www.daqianduan.com/4820.html>
