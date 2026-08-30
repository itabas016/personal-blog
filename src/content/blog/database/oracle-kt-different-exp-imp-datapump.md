---
title: Oracle - What's the different between Traditional Export/Import and Datapump
description: >-
  Datapump Datapump is an ORACLE database external utility, which is used to
  transfer objects between databases. This utility is coming from ORACLE 10g
  databas…
pubDate: '2016-10-16T00:00:00.000Z'
category: Database
tags:
  - Oracle
  - KT
ai: human
---

### Datapump
> `Datapump` is an ORACLE database external utility, which is used to transfer objects between databases. This utility is coming from **ORACLE 10g** database. It has more enhancements than the traditional `exp/imp` utilities. This utility also makes dump files, which are in binary formats with database objects, object metadata and their control information. The `expdp` and `impdp` commands can be executed in three ways,

> * **Command line interface** (specify `expdp/impdp` parameters in command line)
> * **Parameter file interface** (specify `expdp/impdp` parameters in a separate file)
> * **Interactive-command interface** (entering various commands in export prompt)

<!-- more -->

> There are five different modes of data unloading using expdp. They are,

> * **Full Export Mode** (entire database is unloaded)
> * **Schema Mode** (this is the default mode, specific schemas are unloaded)
> * **Table Mode** (specified set of tables and their dependent objects are unloaded)
> * **Tablespace Mode** (the tables in the specified tablespace are unloaded)
> * **Transportable Tablespace Mode** (only the metadata for the tables and their dependent objects within a specified set of tablespaces are unloaded)

#### Create database directories
``` bash
su - oracle
export ORACLE_SID=orcl
sqlplus / as sysdba
```
``` SQL
-- unlock user
SQL> ALTER USER scott IDENTIFIED BY tiger ACCOUNT UNLOCK;

-- create dir
SQL> CREATE OR REPLACE DIRECTORY test_dir AS '/u01/app/oracle/oradata/orcl';

-- grant privilage
SQL> GRANT READ, WRITE ON DIRECTORY test_dir TO scott;
Grant succeeded.
-- select
SQL> SELECT directory_path FROM dba_directories WHERE directory_name = 'DATA_PUMP_DIR';
```

#### TABLE BASED IMPORT AND EXPORT
``` bash
$ export ORACLE_SID=orcl
$ expdp scott/tiger tables=EMP,DEPT directory=TEST_DIR dumpfile=EMP_DEPT.dmp logfile=expEMP_DEPT.log

$ export ORACLE_SID=orcl
$ impdp scott/tiger tables=EMP,DEPT directory=TEST_DIR dumpfile=EMP_DEPT.dmp logfile=impEMP_DEPT.log
CONTENT={ALL | DATA_ONLY | METADATA_ONLY}
# All loads all the metadata as well as data from the source dump file.
# DATA_ONLY only loads row data into the tables no database objects are created.
# METADATA_ONLY only creates database objects, no data is inserted.
```

#### SCHEMA BASED IMPORT AND EXPORT
``` bash
$ export ORACLE_SID=orcl
$ expdp scott/tiger schemas=SCOTT directory=TEST_DIR dumpfile=SCOTT.dmp logfile=expSCOTT.log

$ export ORACLE_SID=orcl
$ impdp scott/tiger schemas=SCOTT directory=TEST_DIR dumpfile=SCOTT.dmp logfile=impSCOTT.log
CONTENT={ALL | DATA_ONLY | METADATA_ONLY}
```

#### FULL DATABASE IMPORT AND EXPORT
``` bash
$ export ORACLE_SID=orcl
$ expdp system/password full=Y directory=TEST_DIR dumpfile=DB10G.dmp logfile=expDB10G.log

$ export ORACLE_SID=orcl
$ impdp system/password full=Y directory=TEST_DIR dumpfile=DB10G.dmp logfile=impDB10G.log
CONTENT={ALL | DATA_ONLY | METADATA_ONLY}
```

#### Datapump jobs
``` SQL
select * from dba_datapump_jobs;
```
> Even if you exit the prompt or press `ctrl+c` at the command prompt or exit from the client side the datapump jobs will continue to run at the server.

``` bash
-- To reattach with the running job enter the following command.
$ expdp system/password attach=qq
```
> If the `import` or `export` job is to be **stopped temporarily** then type the following command.
``` bash
-- press CTRL+C
Export> STOP_JOB=IMMEDIATE
Are you sure you wish to stop this job ([y]/n): y
```

> In order to resume the job do the following.
``` bash
export ORACLE_SID=orcl
$expdp hr/hr ATTACH=qq
Export> CONTINUE_CLIENT
```

#### Datapump EXCLUDE/INCLUDE parameters
> The `exclude` and `include` parameters availbale with expdp,impdp can be used as **metadata filters** so that one can specify any objects like `tables,indexes,triggers, procedure` to be excluded or included during export or import operation

> syntax:
``` bash
EXCLUDE=[object_type]:[name_clause],[object_type]:[name_clause]
INCLUDE=[object_type]:[name_clause],[object_type]:[name_clause]

-- examples
expdp SCHEMAS=scott EXCLUDE=SEQUENCE,TABLE:”IN (’EMP’,'DEPT’)”;
impdp SCHEMAS=scott INCLUDE=PACKAGE,FUNCTION, PROCEDURE,TABLE:”=’EMP’”
```

> btw, use other way `xx.par` to store these parameters:

``` bash
-- Parameter file:exp.par
DIRECTORY = my_dir
DUMPFILE = exp_tab.dmp
LOGFILE = exp_tab.log
SCHEMAS = scott
INCLUDE = TABLE:”IN (’EMP’, ‘DEPT’)”
```
``` bash
expdp system/manager parfile=exp.par
```

### Advantages of Datapump
> * Data Pump Export and Import operations are processed in the database as a Data Pump job, which is much more efficient that the client-side execution of original Export and Import. 
> * Data Pump operations can take advantage of the server’s parallel processes to read or write multiple data streams simultaneously.
> * Data Pump differs from original Export and Import in that all jobs run primarily on the server using server processes. These server processes access files for the Data Pump jobs using directory objects that identify the location of the files. The directory objects enforce a security model that can be used by DBAs to control access to these files.
> * Datapump has a very powerful interactive command-line mode which allows the user to monitor and control Data Pump Export and Import operations.Datapump allows you to disconnect and reconnect to the session
> * Because Data Pump jobs run entirely on the server, you can start an export or import job, detach from it, and later reconnect to the job to monitor its progress.
> * Data Pump gives you the ability to pass data between two databases over a network (via a database link), without creating a dump file on disk. 
> * Datapump uses the Direct Path data access method (which permits the server to bypass SQL and go right to the data blocks on disk) has been rewritten to be much more efficient and now supports Data Pump Import and Export.
> * Another amazing feature is that you can "PAUSE" and "RESUME" data pump jobs on demand.


### What's the difference
> * Datapump operates on a group of files called **dump file sets**. However, normal export operates on **a single file**.
> * Datapump access files in the **server** (using **ORACLE directories**). Traditional export can access files in **client** and server both (not using ORACLE directories).
> * Exports `(exp/imp)` represent database metadata information as `DDLs` in the dump file, but in datapump, it represents in `XML` document format.
> * Datapump has parallel execution but in `exp/imp` **single stream** execution.
> * Datapump does not support `sequential media` like **tapes**, but traditional export supports.


> Resources:
<http://www.orafaq.com/wiki/Datapump>
<http://its-all-about-oracle.blogspot.com/2013/06/expimp-vs-datapump-expdpimpdp.html>
