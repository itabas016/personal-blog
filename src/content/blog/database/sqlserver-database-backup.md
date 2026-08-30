---
title: SqlServer的各种备份脚本
description: >-
  Full Database Backup Differential Database Backup differential backup base on
  complete backup, it's mean you should have a full backup before do this.
pubDate: '2012-03-27T00:00:00.000Z'
category: Database
tags:
  - DataBase
  - Script
  - SqlServer
ai: human
---

### Full Database Backup

``` sql
/*----------------------------------------*/
--@Database: target database name
--@Path: target backup directory end by '/' 
/*----------------------------------------*/
use master  
go  
declare @Database nvarchar(256),@Path nvarchar(2048)  
select @Database=N'MobileSaleStatMain',@Path=N'D:/backup/'  
declare @sql nvarchar(max)  
select @sql =N'BACKUP DATABASE '+@Database+N'  
    TO  DISK = '''+@Path+@Database+N'_Full_'+REPLACE(REPLACE(REPLACE(convert(nvarchar(30),getdate(),126),'-','_'),':','_'),'.','_')+N'.bak''  
WITH   
   NOFORMAT,   
   INIT,    
   NAME = N''Full Database Backup'',  
   SKIP'  
exec (@sql)  
go  
```

### Differential Database Backup

> **differential backup base on complete backup, it's mean you should have a full backup before do this.**

``` sql
use master    
go    
declare @Database nvarchar(256),@Path nvarchar(2048)    
select @Database=N'MobileSaleStatMain',@Path=N'D:/backup/'    
declare @sql nvarchar(max)    
select @sql =N'BACKUP DATABASE '+@Database+N'    
    TO  DISK = '''+@Path+@Database+N'_DIFF_'+REPLACE(REPLACE(REPLACE(convert(nvarchar(30),getdate(),126),'-','_'),':','_'),'.','_')+N'.bak''    
WITH     
   DIFFERENTIAL'    
exec (@sql) 
```

