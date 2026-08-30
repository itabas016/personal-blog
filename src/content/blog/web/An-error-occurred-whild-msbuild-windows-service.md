---
title: An error occurred whild msbuild windows service
description: >-
  这段时间在迁移旧项目到teamcity，在package .vdproj project时遇到了这个错An error occurred while
  validating. HRESULT = '8000000A' 查了很多方法才解决这个问题 stackoverflow上给出的权威解答是这样的：
pubDate: '2016-06-27T00:00:00.000Z'
category: Web
tags:
  - Powershell
  - MSbuild
  - CI
  - Teamcity
ai: human
---

> 这段时间在迁移旧项目到teamcity，在package *.vdproj project时遇到了这个错`An error occurred while validating. HRESULT = '8000000A'`
查了很多方法才解决这个问题

> stackoverflow上给出的权威解答是这样的：

<!-- more -->
> Unfortunately we couldn't address all cases of the command line issue for this release as we're still investigating the appropriate way to address them. What we do have is a workaround that we believe will work for almost all of them. 
> If you are still suffering this issue then you can try to change the DWORD value for the following registry value to 0:
> `HKEY_CURRENT_USER\Software\Microsoft\VisualStudio\12.0_Config\MSBuild\EnableOutOfProcBuild (VS2013)` or `HKEY_CURRENT_USER\Software\Microsoft\VisualStudio\14.0_Config\MSBuild\EnableOutOfProcBuild (VS2015)`
> If this doesn't exist you can create it as a DWORD.

> 但是我的agent vm 有很多台，于是写了个script


``` powershell
#add_registy_procbuild_ps.ps1
$ProcBuildRegistryPath = "HKCU:\Software\Microsoft\VisualStudio\14.0_Config\MSBuild"
$ProcBuildRegistryName = "EnableOutOfProcBuild"
$ProcBuildValue = "0"

"Add DWORD paramter for Proc build registry..."
IF(!(Test-Path $ProcBuildRegistryPath)) {
     "Add:"
     New-Item -Path $ProcBuildRegistryPath -Force | Out-Null
          New-ItemProperty -Path $ProcBuildRegistryPath -Name $ProcBuildRegistryName -Value $ProcBuildValue `
               -PropertyType DWORD -Force | Out-Null }
ELSE {
     "Modify:"
     New-ItemProperty -Path $ProcBuildRegistryPath -Name $ProcBuildRegistryName -Value $ProcBuildValue `
          -PropertyType DWORD -Force | Out-Null }
```

> then execute this script in cmd

```
powershell -ExecutionPolicy ByPass -File \\172.16.xx.xx\c$\script\add_registy_procbuild_ps.ps1
```

> Good Job, 完美解决~

Resource: 
<http://stackoverflow.com/questions/8648428/an-error-occurred-while-validating-hresult-8000000a>
