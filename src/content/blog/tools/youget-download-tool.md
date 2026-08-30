---
title: 再安利一款命令行下载工具
description: >-
  流媒体视频下载号称覆盖各大主流网站Youtube,Twitter, TED,Bilibili,iQIYI等等。Supported-sites
  拿当前的几个网站测试玩玩
pubDate: '2017-11-27T00:00:00.000Z'
category: Tools
tags:
  - Command Line
  - Download
  - You-Get
  - Linux
  - Tools
  - 流媒体
  - 下载
ai: human
---

流媒体视频下载号称覆盖各大主流网站`Youtube`,`Twitter`, `TED`,`Bilibili`,`iQIYI`等等。[Supported-sites](https://you-get.org/#supported-sites)
拿当前的几个网站测试玩玩~

<!-- more -->

## Install(安装) ##

我是Windows下使用，需要`python3`,`FFmpeg`(转码)和`VLC`(播放器)

``` bash
# 通过choco来安装 FFmpeg, vlc
choco install ffmpeg vlc -y

pip install you-get
```
**PS: `choco`第三方安装包参照[这里](https://chocolatey.org/installs)**

## Command(命令) ##

使用很简单，`you-get [params] <url>`
``` bash
$ you-get -h
you-get: version 0.4.964, a tiny downloader that scrapes the web.
usage: you-get [OPTION]... URL...

A tiny downloader that scrapes the web

optional arguments:
  -V, --version         Print version and exit
  -h, --help            Print this help message and exit

Dry-run options:
  (no actual downloading)

  -i, --info            Print extracted information
  -u, --url             Print extracted information with URLs
  --json                Print extracted URLs in JSON format

Download options:
  -n, --no-merge        Do not merge video parts
  --no-caption          Do not download captions (subtitles, lyrics, danmaku,
                        ...)
  -f, --force           Force overwriting existing files
  -F STREAM_ID, --format STREAM_ID
                        Set video format to STREAM_ID
  -O FILE, --output-filename FILE
                        Set output filename
  -o DIR, --output-dir DIR
                        Set output directory
  -p PLAYER, --player PLAYER
                        Stream extracted URL to a PLAYER
  -c COOKIES_FILE, --cookies COOKIES_FILE
                        Load cookies.txt or cookies.sqlite
  -t SECONDS, --timeout SECONDS
                        Set socket timeout
  -d, --debug           Show traceback and other debug info
  -I FILE, --input-file FILE
                        Read non-playlist URLs from FILE
  -P PASSWORD, --password PASSWORD
                        Set video visit password to PASSWORD
  -l, --playlist        Prefer to download a playlist

Proxy options:
  -x HOST:PORT, --http-proxy HOST:PORT
                        Use an HTTP proxy for downloading
  -y HOST:PORT, --extractor-proxy HOST:PORT
                        Use an HTTP proxy for extracting only
  --no-proxy            Never use a proxy
  -s HOST:PORT, --socks-proxy HOST:PORT
                        Use an SOCKS5 proxy for downloading
```

测试结果: 家里是20M移动，外网挂代理速度还是很不错，国内的几个站点，速度不是太理想，爱奇艺下都下不完，难道姿势不对？不过就这样吧。
``` bash
# youtube test result(use proxy, download quality 1280x720)
$  you-get --itag=247 'https://www.youtube.com/watch?v=cECkQWunAro' -x 127.0.0.1:1080
site:                YouTube
title:               LEE Chong Wei vs CHEN Long 2017 Hong Kong Open Final
stream:
    - itag:          247
      container:     webm
      quality:       1280x720
      size:          250.7 MiB (262915265 bytes)
    # download-with: you-get --itag=247 [URL]

Downloading LEE Chong Wei vs CHEN Long 2017 Hong Kong Open Final.webm ...
 100% (250.7/250.7MB) ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒[2/2]    2 MB/s
Merging video parts... Merged into LEE Chong Wei vs CHEN Long 2017 Hong Kong Open Final.webm

Saving LEE Chong Wei vs CHEN Long 2017 Hong Kong Open Final.en.srt ... Done.
```

``` bash
# TED test result
$ you-get 'https://www.ted.com/talks/mandy_len_catron_a_better_way_to_talk_about_love' -x 127.0.0.1:1080
Site:       TED.com
Title:      A better way to talk about love
Type:       MPEG-4 video (video/mp4)
Size:       101.95 MiB (106899473 Bytes)

Downloading A better way to talk about love.mp4 ...
 100% (101.9/101.9MB) ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒[1/1]    2 MB/s

```
``` bash
# Bilibili test
$ you-get --format=mp4 'https://bangumi.bilibili.com/anime/5977/play#103970'
site:                Bilibili
title:               ▒▒Ŀ▒▒▒▒▒▒ ½ [7 ▒▒▒ֵĶ▒▒▒]
stream:
    - format:        mp4
      container:     mp4
      size:          98.3 MiB (103063182 bytes)
    # download-with: you-get --format=mp4 [URL]

Downloading ▒▒Ŀ▒▒▒▒▒▒ ½ (7 ▒▒▒ֵĶ▒▒▒).mp4 ...
 100% ( 98.3/ 98.3MB) ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒[1/1]  755 kB/s

Downloading ▒▒Ŀ▒▒▒▒▒▒ ½ (7 ▒▒▒ֵĶ▒▒▒).cmt.xml ...
```

``` bash
# iQIYI test
$ you-get --format=TD 'http://www.iqiyi.com/v_19rrok801k.html'
ffmpeg version 3.4 Copyright (c) 2000-2017 the FFmpeg developers
  built with gcc 7.2.0 (GCC)
  configuration: --enable-gpl --enable-version3 --enable-sdl2 --enable-bzlib --enable-fontconfig --enable-gnutls --enable-iconv --enable-libass --enable-libbluray --enable-libfreetype --enable-libmp3lame --enable-libopenjpeg --enable-libopus --enable-libshine --enable-libsnappy --enable-libsoxr --enable-libtheora --enable-libtwolame --enable-libvpx --enable-libwavpack --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxml2 --enable-libzimg --enable-lzma --enable-zlib --enable-gmp --enable-libvidstab --enable-libvorbis --enable-cuda --enable-cuvid --enable-d3d11va --enable-nvenc --enable-dxva2 --enable-avisynth --enable-libmfx
  libavutil      55. 78.100 / 55. 78.100
  libavcodec     57.107.100 / 57.107.100
  libavformat    57. 83.100 / 57. 83.100
  libavdevice    57. 10.100 / 57. 10.100
  libavfilter     6.107.100 /  6.107.100
  libswscale      4.  8.100 /  4.  8.100
  libswresample   2.  9.100 /  2.  9.100
  libpostproc    54.  7.100 / 54.  7.100
[hls,applehttp @ 000002603fea2460] Opening 'http://dx.data.video.qiyi.com/videos/v0/20160531/72/41/8f1463dced2d029eb624aa8357863660.ts?qdv=1&qypid=385577300_04022000001000000000_4&start=0&end=1774490&hsize=1894&tag=0&v=&contentlength=1375784&qd_uid=&qd_vip=0&qd_src=3_31_312&qd_tm=1511792844379&qd_ip=b7c177e5&qd_p=b7c177e5&qd_k=0ce99ea79e7124c9adf063c9ec40cecc&qd_sc=818a00f02607bad3fcf841a2cb399f22' for reading
Input #0, hls,applehttp, from 'http://cache.m.iqiyi.com/mus/202861101/21e7451d956c0102975c361c8c6f1d10/afbe8fd3d73448c9//20160531/72/41/bbaf27dca1cc5742c13a761e67a82ade.m3u8?qd_originate=tmts_py&tvid=385577300&bossStatus=0&qd_vip=0&px=&qd_src=3_31_312&prv=&previewType=&previewTime=&from=&qd_time=1511792843835&qd_p=b7c177e5&qd_asc=b23206a0facb3fcc3854c89ca63fda45&qypid=385577300_04022000001000000000_4&qd_k=0ce99ea79e7124c9adf063c9ec40cecc&isdol=0&code=2&qd_s=otv&vf=2c976281fee262e999cd40862078c8ff&np_tag=nginx_part_tag':
  Duration: 00:23:25.00, start: 0.000000, bitrate: N/A
  Program 0
    Metadata:
      variant_bitrate : 0
    Stream #0:0: Video: h264 (High) ([27][0][0][0] / 0x001B), yuv420p(tv, bt709), 1280x720, 23.98 fps, 23.98 tbr, 90k tbn, 47.95 tbc
    Metadata:
      variant_bitrate : 0
    Stream #0:1: Audio: aac (LC) ([15][0][0][0] / 0x000F), 44100 Hz, stereo, fltp
    Metadata:
      variant_bitrate : 0
Output #0, mp4, to '航海王第312集.mp4':
  Metadata:
    encoder         : Lavf57.83.100
    Stream #0:0: Video: h264 (High) (avc1 / 0x31637661), yuv420p(tv, bt709), 1280x720, q=2-31, 23.98 fps, 23.98 tbr, 90k tbn, 90k tbc
    Metadata:
      variant_bitrate : 0
    Stream #0:1: Audio: aac (LC) (mp4a / 0x6134706D), 44100 Hz, stereo, fltp
    Metadata:
      variant_bitrate : 0
Stream mapping:
  Stream #0:0 -> #0:0 (copy)
  Stream #0:1 -> #0:1 (copy)
Press [q] to stop, [?] for help
[mp4 @ 000002603fee37a0] Timestamps are unset in a packet for stream 0. This is deprecated and will stop working in the future. Fix your code to set the timestamps properly
[mp4 @ 000002603fee37a0] pts has no valueB time=00:00:02.96 bitrate=   0.1kbits/s speed=0.778x
[http @ 000002603feb3ac0] Stream ends prematurely at 681976, should be 1375784s/s speed=0.162x
[hls,applehttp @ 000002603fea2460] Opening 'http://dx.data.video.qiyi.com/videos/v0/20160531/72/41/8f1463dced2d029eb624aa8357863660.ts?qdv=1&qypid=385577300_04022000001000000000_4&start=614670&end=1885760&hsize=1894&tag=1&v=&contentlength=468120&qd_uid=&qd_vip=0&qd_src=3_31_312&qd_tm=1511792844379&qd_ip=b7c177e5&qd_p=b7c177e5&qd_k=0ce99ea79e7124c9adf063c9ec40cecc&qd_sc=818a00f02607bad3fcf841a2cb399f22' for reading
[mpegts @ 000002603ffee840] PES packet size mismatch
```
