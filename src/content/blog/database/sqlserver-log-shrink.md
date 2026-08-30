---
title: SqlServer log shrink (日志库收缩)
description: ''
pubDate: '2012-07-22T00:00:00.000Z'
category: Database
tags:
  - DataBase
  - Script
  - SqlServer
ai: human
---

``` sql
USE [master]  
GO  
ALTER DATABASE MobileStatLog SET RECOVERY SIMPLE WITH NO_WAIT  
GO 
ALTER DATABASE MobileStatLog SET RECOVERY SIMPLE   --simple model  
GO  
USE MobileStatLog
GO  
DBCC SHRINKFILE (N'MobileStatLog_Log' , 5, TRUNCATEONLY)  
GO  
USE [master]
GO  
ALTER DATABASE MobileStatLog SET RECOVERY FULL WITH NO_WAIT  
GO  
ALTER DATABASE MobileStatLog SET RECOVERY FULL  --restore for full model 
GO 
```
