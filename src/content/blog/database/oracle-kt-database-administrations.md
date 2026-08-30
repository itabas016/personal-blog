---
title: Oracle - Database Administrations
description: >-
  This part mainly talk about these points: Import and export of database Start
  and Stop database Starting and stopping Nodes in the RAC Manage available
  sessions
pubDate: '2016-09-27T00:00:00.000Z'
category: Database
tags:
  - Oracle
  - KT
ai: human
---

> This part mainly talk about these points:

> * **Import and export of database**
> * **Start and Stop database**
> * **Starting and stopping Nodes in the RAC**
> * **Manage available sessions**

<!-- more -->

### Import and export of database
> Oracle's `export` (**exp**) and `import` (**imp**) utilities are used to perform logical database backup and recovery. When exporting, database objects are dumped to **a binary file** which can then be imported into another Oracle database.
> This `exp/imp` is different from `expdp/impdp` in `Data Pump`, The detail about datapump will talk in other article.
> The `export/import` utilities are commonly used to perform the following tasks:

> * Backup and recovery (small databases only, say < `+50GB`, if bigger, use `RMAN` instead)
> * Move data between Oracle databases on different platforms (for example from Solaris to Windows)
> * Reorganization of data / eliminate database fragmentation (`export`, `drop` and `re-import` tables)
> * Upgrade databases from extremely old versions of Oracle (when in-place upgrades are not supported by the Database Upgrade Assistant any more)
> * Detect database corruption. Ensure that all the data can be read
> * Transporting tablespaces between databases

#### How to use
> Look for the `imp` and `exp` executables in your `$ORACLE_HOME/bin` directory. One can run them interactively, using command line parameters, or using parameter files. Look at the `imp/exp` parameters before starting. These parameters can be listed by executing the following commands: `exp help=yes` or `imp help=yes`.
The following examples demonstrate how the `imp/exp` utilities can be used:
``` SQL
exp scott/tiger file=emp.dmp log=emp.log tables=emp rows=yes indexes=no
exp scott/tiger file=emp.dmp tables=(emp,dept)

imp scott/tiger file=emp.dmp full=yes
imp scott/tiger file=emp.dmp fromuser=scott touser=scott tables=dept

-- using a parameter file:
exp userid=scott/tiger@orcl parfile=export.txt

--where export.txt contains:
BUFFER=10000000
FILE=account.dmp
FULL=n
OWNER=scott
GRANTS=y
COMPRESS=y
```
#### Export with query
> From Oracle 8i one can use the `QUERY=` export parameter to selectively unload a subset of the data from a table. You may need to escape special chars on the command line.
> For example: `query=\"where deptno=10\"`. Look at these examples:
``` SQL
exp scott/tiger tables=emp query="where deptno=10"
exp scott/tiger file=abc.dmp tables=abc query=\"where sex=\'f\'\" rows=yes
```
#### Other Questions
> Before one imports rows into **already populated tables**, one needs to **truncate** or **drop** these tables to get rid of the old data. If not, the new data will be **appended to the existing tables**. One must always `DROP` existing Sequences before re-importing. If the sequences are not dropped, they will generate numbers inconsistent with the rest of the database.
> Note: It is also advisable to **drop indexes** before importing to speed up the import process. Indexes can easily be recreated after the data was successfully imported.

### Start and Stop database
#### Start database
> Ensure oracle other service such as `lsnrctl`, `srvctl`, `crsctl` is work.
> Oracle start has thress modes, step by step start oracle:
> * **NOMOUNT**
> PS. This mode just **create instance**, does not **mount database**, And just create memory structures and service processess for oracle instance, It can not open any data file.
> In this mode, only access the dictionary views related **SGA**, contains `VPARAMETER`, `VSGA`, `VPROCESS`, `VSESSION` etc. Because these views is get from SGA area.
> What you can do:
> > **create new database**
> > **rebuild control files**

> * **MOUNT**
> PS. This mode will mount database, but database status is closed, so client user can't operate the database.
> In this mode, only access the dictionary views related **Control files**, contains `VTHREAD`, `VCONTROLFILE, VDATABASE`, `VDATAFILE`, `V$LOGFILE` etc. Because these views is get from Control files.
> What you can do:
> > **Rename datafile**
> > **Add/Del/Rename rebuild log files**
> > **Execute database recover completely**
> > **Change database to Archive mode**

> * **OPEN**
> PS. Normal mode to start database. If occurred any error, please use `STARTUP FORCE`
``` bash
su - oracle
sqlplus / as sysdba
SQL> HELP STARTUP
[FORCE] [RESTRICT] [PFILE=filename] [QUIET] [ MOUNT [dbname] |
[ OPEN [open_db_options] [dbname] ] | NOMOUNT ]
```
#### Stop database
> Shutdown the database has four methods: 
> * **NORMAL**
> This mode will forbid new client create connection, the current executing transtracion is still doing.

> * **IMMEDIATE**
> This mode will not wait users active disconnection and will enforce the transtractions

> * **TRANSACTIONAL**
> This mode will wait users not commit transactions to commit.

> * **ABORT**
> This mode will ignore everything. Be careful~
``` bash
su - oracle
sqlplus / as sysdba
SQL> HELP SHUTDOWN
SHUTDOWN [ABORT|IMMEDIATE|NORMAL|TRANSACTIONAL [LOCAL]]
```
### Starting and stopping Nodes in the RAC
#### Start Node
``` bash
# check status of instance
$ $CRS_HOME/bin/crs_stat

# seen cases when CRS says OFFLINE but pmon is still running so double checking here
$ ps -ef | grep <instance_name> | grep pmon

# start one of the instance on one of the nodes if not running
$ srvctl start database -d <database name> -i <instance name>
```
#### Stop Node
``` bash
# verify instance running
$ ps -ef | grep <instance_name> | grep pmon

# shutdown one of the instance on one of the nodes
$ srvctl stop database -d <database name> -i <instance name>

# check status of instance to make sure it’s down
$ $CRS_HOME/bin/crs_stat

# verify instance not running
$ ps -ef | grep <instance_name> | grep pmon
```
### Manage available sessions
#### Enabling and Disabling Restricted Session
``` SQL
select logins from v$instance;
alter system enable restricted session;
alter system disable restricted session;
```

#### Disconnect session
``` SQL
SELECT SID, SERIAL#, STATUS
  FROM V$SESSION
  WHERE USERNAME = 'AWSUSER';
alter system disconnect session;
```

#### Kill session
``` SQL
alter system kill session ' sid, serial#' IMMEDIATE;
```

> Resources:
<http://docs.oracle.com/cd/B28359_01/server.111/b28319/exp_imp.htm#i1023983>
<http://www.orafaq.com/wiki/Import_Export_FAQ>
<https://docs.oracle.com/cd/E11882_01/rac.112/e41960/admin.htm#RACAD812>
