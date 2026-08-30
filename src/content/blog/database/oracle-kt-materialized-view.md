---
title: Oracle - Materialized View
description: >-
  A materialized view, or snapshot as they were previously known, is a table
  segment whose contents are periodically refreshed based on a query, either
  against…
pubDate: '2016-11-09T00:00:00.000Z'
category: Database
tags:
  - Oracle
  - KT
ai: human
---

> A `materialized view`, or `snapshot` as they were previously known, is a table segment whose contents are periodically refreshed based on a query, either against a local or remote table. Using materialized views against remote tables is the simplest way to achieve replication of data between sites.

<!-- more -->

### Overview

> Oracle uses `materialized views` (also known as **snapshots** in prior releases) to replicate data to non-master sites in a replication environment and to cache **expensive queries** in a data warehouse environment. 

> A `materialized view` is a replica of a target master from a **single point** in time. The master can be either a master table at a master site or a master materialized view at a materialized view site. Whereas in multi-master replication tables are continuously updated by other master sites, materialized views are updated from one or more masters through individual batch updates, known as a refreshes, from a single master site or master materialized view site.
![oracle-mv-view.png](/ref/oracle-mv-view.png)

### Create Materialized View
``` SQL
-- Master Database Site
SELECT * FROM DBA_MVIEW_LOGS WHERE MASTER='<BASE TABLE NAME>',
CREATE MATERIALIZED VIEW LOG ON <BASE TABLE> TABLESPACE <TABLESPACE NAME> WITH <PRIMARY KEY>/<ROWID>;
DROP MATERIALIZED VIEW LOG ON <Schema>.<Table_Name>;

-- MView Database Site
CREATE DATABASE LINK <NAME> CONNECT TO <Master DB Schema Name> 
IDENTIFIED BY < Master DB Schema Password> USING '<Master DB TNS>';

CREATE MATERIALIZED VIEW "USERNAME"."MVIEW_NAME"
ORGANIZATION HEAP PCTFREE 10 PCTUSED 0 INITRANS 2 MAXTRANS 255 NOCOMPRESS NOLOGGING
STORAGE(INITIAL 1048576 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT)
TABLESPACE "<Tablespace Name>"
BUILD IMMEDIATE
USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255
STORAGE(INITIAL 1048576 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT)
TABLESPACE ""<Tablespace Name>"
REFRESH FAST ON DEMAND START WITH sysdate+0 NEXT TRUNC(SYSDATE+1)+6/24 -- Morning 6 AM
-- REFRESH FAST ON DEMAND START WITH sysdate+0 NEXT SYSDATE + 5/(60*24)  -- Every 5 Mins
-- REFRESH COMPLETE ON DEMAND START WITH sysdate+0 NEXT SYSDATE + 30/(60*24) -- Every 30 Mins
-- REFRESH COMPLETE ON DEMAND START WITH sysdate+0 NEXT SYSDATE + 1
WITH PRIMARY KEY USING DEFAULT LOCAL ROLLBACK SEGMENT
DISABLE QUERY REWRITE
--WITH ROWID USING DEFAULT LOCAL ROLLBACK SEGMENT
DISABLE QUERY REWRITE
AS SELECT
COLUMN_1 Col_Alias_Name ,
COLUMN_2 Col_Alias_Name,
COLUMN_3 Col_Alias_Name,
--NULL Col_Alias_Name,,
--CAST(NULL as varchar2(1)) Col_Alias_Name,,
FROM <Master Schema>.<Master Base Table>@<DB_LINK Name>;
```

### ALTER/DROP Materialized View
``` SQL
ALTER MATERIALIZED VIEW <MVIEW_NAME>
REFRESH COMPLETE ON DEMAND START WITH sysdate+0 NEXT SYSDATE + 30/(60*24);
DROP MATERIALIZED VIEW LOG ON <MVIEW_NAME>;
```

### Query Materialized View
``` SQL
-- Find All JOBs/MViews Related to Master DB
col JOB FOR 9999
col OWNER for a8
col MASTER_LINK for a15
col HOST for a10
col FAST_REFRESHABLE for a8
col STALENESS for a9
col COMPILE_STATE for a8
col MVIEW_NAME for a20
col "REFRH MOD-METHOD BLD_MOD" for a22
col INTERVAL FOR a24

SELECT 
  JOB
 ,a.OWNER,MVIEW_NAME
 ,UPDATABLE
 ,REWRITE_ENABLED
 ,MASTER_LINK
 ,c.HOST
 ,REFRESH_MODE||'-'||REFRESH_METHOD||'-'||BUILD_MODE "REFRH MOD-METHOD BLD_MOD"
 ,FAST_REFRESHABLE
 ,LAST_REFRESH_TYPE
 ,to_char(LAST_REFRESH_DATE,'dd-Mon-yy hh24:mi:ss') LAST_REFRESH_DATE
 ,COMPILE_STATE
 ,INTERVAL
 ,USE_NO_INDEX
FROM  DBA_MVIEWS a, DBA_REFRESH_CHILDREN b, DBA_DB_LINKS c
WHERE a.MVIEW_NAME=b.NAME
AND  a.OWNER=b.OWNER
And  MASTER_LINK in (SELECT '@'||DB_LINK from dba_db_links where UPPER(HOST) ='<Master DB Name>')
AND  SUBSTR(a.MASTER_LINK,2) = c.DB_LINK
AND  UPPER(c.HOST) ='<Master DB Name>'
Order by MASTER_LINK, MVIEW_NAME;

-- Query Materialized View Log in Master DB Site
SELECT * FROM DBA_MVIEW_LOGS WHERE MASTER='<BASE TABLE NAME>';
```

> Resources:
<http://durga-kar.blogspot.com/2015/02/materialized-view.html>
