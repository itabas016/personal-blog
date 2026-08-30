---
title: Oracle - Restore Point & Flash Back
description: >-
  Sometimes, varity business data need create restore point for differ
  performance test. So how to manange restore point and how to flashback, see
  the below ->
pubDate: '2016-12-12T00:00:00.000Z'
category: Database
tags:
  - Oracle
  - Script
ai: human
---

> Sometimes, varity business data need create restore point for differ performance test. So how to manange restore point and how to flashback, see the below ->

<!-- more -->

### Restore Point

``` bash
#Login sqlplus use sysdba
Sqlplus / as sysdba
```

``` SQL
--list all restore points:
SELECT NAME, SCN, TIME, DATABASE_INCARNATION#, GUARANTEE_FLASHBACK_DATABASE, STORAGE_SIZE 
	FROM V$RESTORE_POINT;

-- also simple syntax
select scn, GUARANTEE_FLASHBACK_DATABASE,TIME,name from v$restore_point;

--drop old restore point:
DROP RESTORE POINT ICC_20160824;

--create new restore point:
CREATE RESTORE POINT ICC_20160830 GUARANTEE FLASHBACK DATABASE;
```

### Flash Back

``` SQL
-- flashback.sql

spool flashback.log
startup mount;
flashback database to restore point "ICC_20161014"
alter database open resetlogs;
spool off
exit

```

``` bash
#!/bin/bash
#
# file name: flashback.sh
# author: itabas
#

ORACLE_UNQNAME=perfcli
ORACLE_SID=perfcli2
echo stopping RAC database
srvctl stop database -d perfcli
srvctl status database -d perfcli
rm -f flashback.log
echo starting sqlplus
sqlplus "/ as sysdba" @flashback.sql
cat flashback.log
srvctl start instance -d perfcli -i "perfcli1"
srvctl status database -d perfcli
echo stopping  oracle services
srvctl stop service -d perfcli
echo starting oracle services
srvctl start service -d perfcli
srvctl status service -d perfcli
```

> Of course, if your oracle is ASM cluster, maybe have many instances, just modify related instance script, will be all right.

#### other node example

``` bash
#!/bin/bash
#
# file name: flashback.sh
# author: itabas
#

#Node1:
ORACLE_UNQNAME=perfcdb
ORACLE_SID=perfcdb1
echo `date`
echo stopping RAC database
srvctl stop database -d perfcdb
srvctl status database -d perfcdb
rm -f flashback.log
echo starting sqlplus
sqlplus "/ as sysdba" @flashback.sql
cat flashback.log
echo starting instance 2
srvctl start instance -d perfcdb -i "perfcdb2"
srvctl status database -d perfcdb
echo stopping  oracle services
srvctl stop service -d perfcdb
echo starting oracle services
srvctl start service -d perfcdb
srvctl status service -d perfcdb


#Node2:
ORACLE_UNQNAME=perfcdb
ORACLE_SID=perfcdb2
echo stopping RAC database
srvctl stop database -d perfcdb
srvctl status database -d perfcdb
rm -f flashback.log
echo starting sqlplus
sqlplus "/ as sysdba" @flashback.sql
cat flashback.log
srvctl start instance -d perfcdb -i "perfcdb1"
srvctl status database -d perfcdb
echo stopping  oracle services
srvctl stop service -d perfcdb
echo starting oracle services
srvctl start service -d perfcdb
srvctl status service -d perfcdb
```
