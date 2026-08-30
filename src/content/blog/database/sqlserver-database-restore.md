---
title: SqlServer还原脚本
description: ''
pubDate: '2013-03-27T00:00:00.000Z'
category: Database
tags:
  - DataBase
  - Script
  - SqlServer
ai: human
---

``` sql
/*----------------------------------------*/
--@filename: target bak name
--@path: target restore directory end by '/' 
/*----------------------------------------*/

declare @path nvarchar(200)
declare @filename nvarchar(400)
SET @path='D:\backup\'
SET @filename=@path+'\MobileSaleStatMain.bak'

RESTORE DATABASE MobileSaleStatMain FROM DISK = @filename
with replace,
    move 'MobileSaleStatMain' to 'D:\MSSQL\Data\MobileSaleStatMain\MobileSaleStatMain.mdf',
    move 'MobileSaleStatMain_log'  to 'D:\MSSQL\Data\MobileSaleStatMain\MobileSaleStatMain_log.ldf',
    recovery
GO

USE [MobileSaleStatMain]
GO
IF  EXISTS (SELECT * FROM sys.database_principals WHERE name = N'mobilesalestatmain')
DROP USER [mobilesalestatmain]
GO

USE [MobileSaleStatMain]
SELECT s.name
 FROM sys.schemas s
 WHERE s.principal_id = USER_ID('mobilesalestatmain');
 
 --modidy user
 ALTER AUTHORIZATION ON SCHEMA::db_owner TO dbo;
 GO
```
