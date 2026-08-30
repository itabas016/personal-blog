---
title: Oracle - Database Structure
description: >-
  Total four parts, Tablespaces, Datafiles, Database Blocks, Extents, Segments,
  Database Schema Objects and Database Logs
pubDate: '2016-10-14T00:00:00.000Z'
category: Database
tags:
  - Oracle
  - KT
ai: human
---

> Total four parts, `Tablespaces, Datafiles`, `Database Blocks, Extents, Segments`, `Database Schema Objects` and `Database Logs`

<!-- more -->

### Tablespace & Datafile

> Oracle Database stores logically in `tablespaces` and physically in `datadfiles` associated with the corresponding tablespace.
![tablespaces-datafiles](/ref/oracle-tablespace-datafile.gif)

#### Select database free space

``` SQL
select tablespace_name,file_id,block_id,bytes,blocks from dba_free_space; 
```

#### How to Allocate More Space for a Database

> Enlarge a database in three ways: 

##### Add a datafile to a tablespace
> ![datafile](/ref/oracle-add-datafile-to-tbs.gif)

``` SQL
-- add new datafile
alter tablespace app_data add datafile
'/oracle-datafile-path/app03.dbf' size 50m;

-- add new datafile and autoextend datafile
alter tablespace app_data add datafile
'/oracle-datafile-path/app04.dbf' size 50m
autoextend on next 5m maxsize 100m;
```

##### Add a new tablespace
> ![tbs](/ref/oracle-add-new-tbs.gif)

``` SQL
-- create new tablespace and using disk space auto mamagement
create tablespace "app_data02" 
logging
datafile '/oracle-datafile-path/app02.ora' size 5m
extent    management local segment space management auto
```

##### Increase the size of a datafile
> ![increase-size](/ref/oracle-increase-datafile-size.gif)

``` SQL
-- allow already exisit datafile autoextend
alter database datafile '/oracle-datafile-path/app03.dbf'
autoextend on next 5m maxsize 100m;

-- manually resize already exisit datafile
alter database datafile '/oracle-datafile-path/app02.dbf'
resize 100m;
```

### Database Blocks, Extents, Segments
> From logical side to divide, `Blocks < Extents < Segments < Tablespaces`
> ![structure](/ref/oracle-structure.jpg)

#### Data Block
> Oracle Database manages the storage space in the datafiles of a database in units called **`data blocks`**. A data block is the smallest unit of data used by a database. In contrast, at the physical, operating system level, all data is stored in bytes. Each operating system has a `block size`. Oracle Database requests data in multiples of Oracle Database data blocks, not operating system blocks.

> The standard block size is specified by the `DB_BLOCK_SIZE` initialization parameter, default value is `8192 bytes`.

#### Extents
> An `extent` is a logical unit of database storage space allocation made up of a number of contiguous data blocks. One or more extents in turn make up a `segment`. When the existing space in a segment is completely used, Oracle Database allocates `a new extent` for the `segment`.
``` SQL
Related system tables: `DBA_EXTENTS`, `USER_EXTENTS`.
```
#### Segments
> A `segment` is a set of extents that contains all the data for a specific logical storage structure within a tablespace. For example, for each table, Oracle Database allocates one or more extents to form that table's data segment, and for each index, Oracle Database allocates one or more extents to form its index segment.
> Inculde the specific data objects: `Table`, `Index`, `Cluster Table`, and `user segments`, `undo segments` and all the types `segements`.
``` SQL
Related system tables: `DBA_SEGMENTS`, `USER_SEGMENTS`.
```
#### Tablespaces
> A database is divided into one or more logical storage units called **`tablespaces`**. Tablespaces are divided into logical units of storage called `segments`, which are further divided into `extents`. Extents are a collection of contiguous `blocks`.

> When create default tablespace, contains `SYSTEM TABLESPACE`, `SYSAUX TABLESPACE`, `UNDO TABLESPACE`, `USERS TABLESPACE` and `TEMP TABLESPACE`.
``` SQL
Related views: `V$TABLESPACE`, `V$DATAFILE`, `V$TEMPFILE`.
```
### Database Schema Objects

> A `schema` is a collection of logical structures of data, or schema objects. A `schema` is owned by a database user and has the same name as that user. Each user owns a single schema. Schema objects can be created and manipulated with SQL and include the following types of objects:

> **`Tables`**, **`Views`**, **`Materialized Views`**, **`Indexes`**, **`Sequence`**, **`Synonyms`**, **`Clusters`**, **`Constraints`**, **`Tiggers`**, **`Database links`**

#### Tables
> Tables is very basic and simple. You know how to operate table `CURD`, and tables row, column, etc. Certainly, Tables has a lot of others properties, and divide `Partitioned Tables`, `Nested Tables`, `Temporary Tables`. etc.

``` SQL
-- create table
CREATE TABLE table_name
( 
  column1 datatype [ NULL | NOT NULL ],
  ...
  column_n datatype [ NULL | NOT NULL ]
);

-- create as
CREATE TABLE new_table
  AS (SELECT * FROM old_table);

-- primary key - create / alter / drop / enable
CREATE TABLE table_name
(
  column1 datatype null/not null,
  CONSTRAINT constraint_name PRIMARY KEY (column1)
);

ALTER TABLE table_name
ADD CONSTRAINT constraint_name PRIMARY KEY (column1, column2, ... column_n);

ALTER TABLE table_name
DISABLE CONSTRAINT constraint_name;

ALTER TABLE table_name
ENABLE CONSTRAINT constraint_name;

-- alter table - multiple / modify / dorp column / rename
ALTER TABLE table_name
  ADD column_name column-definition;

ALTER TABLE table_name
  MODIFY column_name column_type;

ALTER TABLE table_name
  DROP COLUMN column_name;

ALTER TABLE table_name
  RENAME TO new_table_name;

-- drop table
DROP TABLE [schema_name].table_name
[ CASCADE CONSTRAINTS ]
[ PURGE ];
```
> [Tables Overview click here](https://docs.oracle.com/cd/B28359_01/server.111/b28318/schema.htm#CNCPT211)
> [Tables Manage click here](https://docs.oracle.com/cd/B28359_01/server.111/b28310/tables.htm#i1008063)

#### Views

> It's a virtual table that doesn't physically exist, rather it's created by a query joining one or more other tables.

``` SQL
-- create view
CREATE VIEW view_name AS
  SELECT columns
  FROM tables
  [WHERE conditions];

-- update view
CREATE OR REPLACE VIEW view_name AS
  SELECT columns
  FROM table
  WHERE conditions;

-- drop view
DROP VIEW view_name;

-- dml statements and join views - same as table operation
UPDATE emp_dept
     SET loc = 'BOSTON'
     WHERE ename = 'SMITH';
```
> [Views Overview click here](https://docs.oracle.com/cd/B28359_01/server.111/b28318/schema.htm#CNCPT311)
> [Views Manage click here](https://docs.oracle.com/cd/B28359_01/server.111/b28310/views001.htm#ADMIN11774)

#### Materialized Views
> `Materialized views` are schema objects that can be used to summarize, compute, replicate, and distribute data. They are suitable in various computing environments such as data warehousing, decision support, and distributed or mobile computing:

``` SQL
-- Creating Materialized Aggregate Views
CREATE MATERIALIZED VIEW LOG ON times
   WITH ROWID, SEQUENCE (time_id, calendar_year)
   INCLUDING NEW VALUES;

CREATE MATERIALIZED VIEW LOG ON products
   WITH ROWID, SEQUENCE (prod_id)
   INCLUDING NEW VALUES;

CREATE MATERIALIZED VIEW sales_mv
   BUILD IMMEDIATE
   REFRESH FAST ON COMMIT
   AS SELECT t.calendar_year, p.prod_id, 
      SUM(s.amount_sold) AS sum_sales
      FROM times t, products p, sales s
      WHERE t.time_id = s.time_id AND p.prod_id = s.prod_id
      GROUP BY t.calendar_year, p.prod_id;
```

> And the detail usage will talk about in the later article~
> [Materialized Views Overview click here](https://docs.oracle.com/cd/B28359_01/server.111/b28318/schema.htm#CNCPT411)
> [Materialized Views Examples click here](https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_6002.htm)

#### Indexes
> `Indexes` are optional structures associated with `tables` and `clusters`. You can create many `indexes` for a `table` as long as the combination of `columns` differs for each `index`. You can create more than one `index` using the same `columns` if you specify distinctly different combinations of the `columns`.

> Oracle Database provides several indexing schemes, `B-tree`, `Hash cluster`, `Bitmap`, etc., By default, Oracle creates `B-tree` indexes.

``` SQL
-- syntax
CREATE [UNIQUE] INDEX index_name
  ON table_name (column1, column2, ... column_n)
  [ COMPUTE STATISTICS ];

-- create a function-based index
CREATE [UNIQUE] INDEX index_name
  ON table_name (function1, function2, ... function_n)
  [ COMPUTE STATISTICS ];

-- rename index
ALTER INDEX index_name
  RENAME TO new_index_name;

-- make index invisible / visible
ALTER INDEX index INVISIBLE;
ALTER INDEX index VISIBLE;

-- collect statistics on index
ALTER INDEX index_name
  REBUILD COMPUTE STATISTICS;

-- monitoring index usage - enable / disable
ALTER INDEX index MONITORING USAGE; --enable
ALTER INDEX index NOMONITORING USAGE; --disable

-- monitoring space use of indexes
SELECT PCT_USED FROM INDEX_STATS WHERE NAME = 'index';

-- drop index
DROP INDEX index_name;

```
> [Indexes Overview click here](https://docs.oracle.com/cd/B28359_01/server.111/b28318/schema.htm#CNCPT811)
> [Indexes Manage click here](https://docs.oracle.com/cd/B28359_01/server.111/b28310/indexes.htm#i1007132)

#### Sequence
> `Sequences` are database objects from which multiple users can generate **unique** integers. The sequence generator generates sequential numbers, which can help to generate `unique primary keys` automatically, and to coordinate keys across `multiple rows` or `tables`.

> Special attention, **Uses and Restrictions of `NEXTVAL` and `CURRVAL`**
```
# cann't be used in these places:
A subquery
A view query or materialized view query
A SELECT statement with the DISTINCT operator
A SELECT statement with a GROUP BY or ORDER BY clause
A SELECT statement that is combined with another SELECT statement with the UNION, INTERSECT, or MINUS set operator
The WHERE clause of a SELECT statement
DEFAULT value of a column in a CREATE TABLE or ALTER TABLE statement
The condition of a CHECK constraint
```
``` SQL
-- create syntax - alter same as create, replace CREATE to ALTER
CREATE SEQUENCE sequence_name
  MINVALUE value
  MAXVALUE value
  START WITH value
  INCREMENT BY value
  CACHE value;
-- drop
DROP SEQUENCE sequence_name;
```
> [Sequence Overview click here](https://docs.oracle.com/cd/B28359_01/server.111/b28318/schema.htm#CNCPT611)
> [Sequence Manage click here](https://docs.oracle.com/cd/B28359_01/server.111/b28310/views002.htm#ADMIN11792)

#### Synonyms
> A `synonym` is an alias for a schema object. Synonyms can provide a level of security by masking the name and owner of an object and by providing location transparency for remote objects of a distributed database. Also, they are convenient to use and reduce the complexity of SQL statements for database users.

> You can create both `public` and `private` synonyms. A `public synonym` is owned by the special user group named `PUBLIC` and is accessible to every user in a database. A `private synonym` is contained in the schema of a specific user and available only to the user and to grantees for the underlying object.

``` SQL
-- I think the sql statement is very clear to express
-- create syntax
CREATE [OR REPLACE] [PUBLIC] SYNONYM [schema .] synonym_name
  FOR [schema .] object_name [@ dblink];

CREATE PUBLIC SYNONYM public_emp FOR jward.emp

-- synonyms in dml statements
/*
* If you have only the SELECT privilege on the jward.emp table, 
* and the synonym jward.employee is created for jward.emp, 
* you can query the jward.employee synonym, 
* but you cannot insert rows using the jward.employee synonym.
* And if a synonym named employee refers to a table or view,
* then the following statement is valid:
*/
INSERT INTO employee (empno, ename, job)
    VALUES (emp_sequence.NEXTVAL, 'SMITH', 'CLERK');

-- drop
DROP [PUBLIC] SYNONYM [schema .] synonym_name [force];
DROP PUBLIC SYNONYM public_emp;
```
> [Synonyms Overview click here](https://docs.oracle.com/cd/B28359_01/server.111/b28318/schema.htm#CNCPT711)
> [Synonyms Manage click here](https://docs.oracle.com/cd/B28359_01/server.111/b28310/views003.htm#ADMIN11805)

#### Constraints

> Totally contains `PRIMARY KEY CONSTRAINT`, `UNIQUE CONSTRAINT`, `FOREIGN KEY CONSTRAINT`, `NOT NULL CONSTRAINT` and `CHECK CONSTRAINT`, etc.

##### PRIMARY KEY CONSTRAINT
> A `primary` key constraint designates a column as the primary key of a table or view. A **composite primary key** designates a combination of columns as the `primary` key. When you define a primary key constraint inline, you need only the `PRIMARY KEY` keywords. When you define a primary key constraint out of line, you must also specify one or more columns. You must define a composite primary key out of line.

> A primary key constraint combines a `NOT NULL` and `UNIQUE` constraint in one declaration.

``` SQL
-- syntax
-- create
CREATE TABLE table_name
(
  column datatype null/not null,
  CONSTRAINT constraint_name PRIMARY KEY (column)
);

-- alter
ALTER TABLE table_name
ADD CONSTRAINT constraint_name PRIMARY KEY (column1, column2, ... column_n);

-- drop
ALTER TABLE table_name
DROP CONSTRAINT constraint_name;

-- enable / disable
ALTER TABLE table_name
ENABLE/DISABLE CONSTRAINT constraint_name;
```

##### UNIQUE CONSTRAINT
> A `unique` constraint designates a column as a unique key. A **composite unique key** designates a combination of columns as the `unique` key. When you define a unique constraint inline, you need only the `UNIQUE` keyword. When you define a unique constraint out of line, you must also specify one or more columns. You must define a composite unique key out of line.

> To satisfy a unique constraint, no two rows in the table can have the same value for the unique key. However, the unique key made up of a single column can contain nulls. To satisfy a composite unique key, no two rows in the table or view can have the same combination of values in the key columns. Any row that contains nulls in all key columns automatically satisfies the constraint. However, two rows that contain nulls for one or more key columns and the same combination of values for the other key columns violate the constraint.

``` SQL
-- syntax it's same as primary key
-- create
CREATE TABLE table_name
(
  column1 datatype [ NULL | NOT NULL ],
  column2 datatype [ NULL | NOT NULL ],
  ...

  CONSTRAINT constraint_name UNIQUE (uc_col1, uc_col2, ... uc_col_n)
);

-- alter
ALTER TABLE table_name
ADD CONSTRAINT constraint_name UNIQUE (column1, column2, ... column_n);

-- drop
ALTER TABLE table_name
DROP CONSTRAINT constraint_name;

-- enable / disable
ALTER TABLE table_name
ENABLE/DISABLE CONSTRAINT constraint_name;
```
##### FOREIGN KEY CONSTRAINT
> A `foreign key` constraint (also called a referential integrity constraint) designates a column as the foreign key and establishes a relationship between that foreign key and a specified primary or unique key, called the **referenced key**. A **composite foreign key** designates a combination of columns as the foreign key.

> You can define a foreign key constraint on a single key column either inline or out of line. You must specify a composite foreign key and a foreign key on an attribute out of line.

> To satisfy a composite foreign key constraint, the composite foreign key must refer to a composite unique key or a composite primary key in the parent table or view, or the value of at least one of the columns of the foreign key must be null.

> `Specifc Attention ON DELETE Clause`
> The ON DELETE clause lets you determine how Oracle Database automatically maintains referential integrity if you remove a referenced primary or unique key value. If you omit this clause, then Oracle does not allow you to delete referenced key values in the parent table that have dependent rows in the child table.

> * Specify `CASCADE` if you want Oracle to remove dependent foreign key values.

> * Specify `SET NULL` if you want Oracle to convert dependent foreign key values to `NULL`. You cannot specify this clause for a virtual column, because the values in a virtual column cannot be updated directly. Rather, the values from which the virtual column are derived must be updated.

``` SQL
-- syntax
-- create
CREATE TABLE table_name
(
  column1 datatype null/not null,
  column2 datatype null/not null,
  ...

  CONSTRAINT fk_column
    FOREIGN KEY (column1, column2, ... column_n)
    REFERENCES parent_table (column1, column2, ... column_n)
);

-- alter
ALTER TABLE table_name
ADD CONSTRAINT constraint_name
   FOREIGN KEY (column1, column2, ... column_n)
   REFERENCES parent_table (column1, column2, ... column_n);
```
##### NOT NULL CONSTRAINT
> A `NOT NULL` constraint prohibits a column from containing nulls. The `NULL` keyword by itself does not actually define an integrity constraint, but you can specify it to explicitly permit a column to contain nulls. You must define `NOT NULL` and `NULL` using inline specification. If you specify neither `NOT NULL` nor `NULL`, then the default is `NULL`.
> `NOT NULL` constraints are the only constraints you can specify inline on `XMLType and `VARRAY` columns.
> To satisfy a `NOT NULL` constraint, every row in the table must **contain a value** for the column.

> * You cannot specify `NULL` or `NOT NULL` in a **view** constraint.

> * You cannot specify `NULL` or `NOT NULL` for an attribute of an object. Instead, use a `CHECK` constraint with the `IS [NOT] NULL` condition.

##### CHECK CONSTRAINT
> A `check` constraint lets you specify a condition that each row in the table must **satisfy**. To satisfy the constraint, each row in the table must make the condition either `TRUE` or unknown (due to a null). When Oracle evaluates a check constraint condition for a particular row, any column names in the condition refer to the column values in that row.

> The syntax for inline and out-of-line specification of check constraints is the same. However, inline specification can refer only to the column (or the attributes of the column if it is an object column) currently being defined, whereas out-of-line specification can refer to multiple columns or attributes.

> `Restrictions on Check Constraints`

> * You cannot specify a `check constraint` for a **view**. However, you can define the view using the `WITH CHECK OPTION` clause, which is equivalent to specifying a check constraint for the view.
> * The condition of a check constraint can refer to any column in the table, but it cannot refer to columns of other tables.

> [Constraints Detail click here](https://docs.oracle.com/cd/B28359_01/server.111/b28286/clauses002.htm#SQLRF52163)
> [Constraints Manage click here](http://docs.oracle.com/cd/B28359_01/server.111/b28310/general005.htm#ADMIN11537)

#### Tiggers

> Database `triggers` are procedures that are stored in the database and activated ("**fired**") when specific conditions occur, such as adding a row to a table. You can use triggers to supplement the standard capabilities of the database to provide a highly customized database management system.

``` SQL
/*
*create trigger statement it can be defined as firing
* BEFORE or AFTER the triggering event, or INSTEAD OF it.
* AFTER / BEFORE [DML] Statements
*/
-- create an AFTER DELETE trigger
CREATE [ OR REPLACE ] TRIGGER trigger_name
AFTER DELETE
   ON table_name
   [ FOR EACH ROW ]

DECLARE
   -- variable declarations

BEGIN
   -- trigger code

EXCEPTION
   WHEN ...
   -- exception handling

END;

-- trigger enable / disable
ALTER TRIGGER trigger_name ENABLE; --single
ALTER TABLE table_name ENABLE ALL TRIGGERS; --all

ALTER TRIGGER trigger_name DISABLE; --single
ALTER TABLE table_name DISABLE ALL TRIGGERS; --all

-- drop trigger
DROP TRIGGER trigger_name;
```
> [Enabling and Disabling Triggers Detail click here](https://docs.oracle.com/cd/B28359_01/server.111/b28310/general004.htm#ADMIN11534)

#### Clusters
> A `cluster` provides an optional method of storing table data. A `cluster` is made up of a group of tables that share the same data blocks. The tables are grouped together because they share common columns and are often used together. 

> `primary benefits: `

> * Disk I/O is reduced and access time improves for joins of clustered tables.

> * The `cluster key` is the **column**, or **group of columns**, that the clustered tables have in common. You specify the columns of the cluster key when creating the cluster. You subsequently specify the same columns when creating every table added to the cluster. Each cluster key value is stored only once each in the cluster and the cluster index, no matter how many rows of different tables contain the value.

> And the detail usage will talk about in the later article~
> [Clusters Overview click here](https://docs.oracle.com/cd/B28359_01/server.111/b28318/schema.htm#CNCPT608)
> [Clusters Manage click here](https://docs.oracle.com/cd/B28359_01/server.111/b28310/clustrs.htm#i1006586)

#### Database links
> A `database link` is a schema object in one database that enables you to access objects on another database. The other database need not be an Oracle Database system. However, to access non-Oracle systems you must use Oracle Heterogeneous Services.

> By the type, It's contain `private`, `public`, and `global` database links.

``` SQL
-- create
CREATE [SHARED] [PUBLIC] DATABASE LINK <link_name>
CONNECT TO CURRENT_USER
USING '<service_name>';

-- create tnsnames entry for conn_link
conn_link =
  (DESCRIPTION =
    (ADDRESS_LIST =
      (ADDRESS = (PROTOCOL = TCP)(HOST = perrito2)(PORT = 1521))
    )
    (CONNECT_DATA =
      (SERVICE_NAME = orabase)
    )
  )

conn uwclass/uwclass

CREATE DATABASE LINK conn_user
USING 'conn_link';

desc user_db_links

set linesize 121
col db_link format a20
col username format a20
col password format a20
col host format a20

SELECT * FROM user_db_links;
SELECT * FROM all_db_links;
SELECT table_name, tablespace_name FROM user_tables@conn_user;

-- close db link
ALTER SESSION CLOSE DATABASE LINK <link_name>;
ALTER SESSION CLOSE DATABASE LINK curr_user;

-- drop db link
DROP [PUBLIC] DATABASE LINK <link_name>;
DROP [PUBLIC] DATABASE LINK test_link;

-- test db link
BEGIN
  ALTER SESSION CLOSE DATABASE LINK remove_db;

  SELECT table_name
  INTO i
  FROM all_tables@remote_db
  WHERE rownum = 1;
EXCEPTION
  WHEN OTHERS THEN
    RAISE_APPLICATION_ERROR(-20999, 'No Connection');
END;
```
> [Database links Overview click here](https://docs.oracle.com/cd/B28359_01/server.111/b28310/ds_concepts002.htm#ADMIN12083)
> [Database link pl/sql](http://psoug.org/reference/db_link.html)

### Database logs

#### Redo logs
> `Redo logs` contain a record of changes that were made to datafiles. Redo logs are stored in redo log groups, and you must have **at least two redo log groups** for your database. After the redo log files in a group have filled up, the log writer process (`LGWR`) switches the writing of redo records to a new redo log group.

> And specific point:
> * Record of how to reproduce a change
> * Used for Rolling forward database changes
> * Stored in redo log files
> * Protect against data loss.

##### How to detect
> To find sessions generating lots of redo, you can use either of the following methods. Both methods examine the amount of undo generated. When a transaction generates undo, it will automatically generate redo as well. 

``` SQL
/*
* Query V$SESS_IO. 
* This view contains the column BLOCK_CHANGES which indicates 
* how much blocks have been changed by the session. 
* High values indicate a session generating lots of redo.
*/
SELECT s.sid, s.serial#, s.username, s.program, i.block_changes
FROM v$session s, v$sess_io i
WHERE s.sid = i.sid
ORDER BY 5 desc, 1, 2, 3, 4;

/*
* Query V$TRANSACTION.
* These view contains information about the amount of undo blocks 
* and undo records accessed by the transaction 
* (as found in the USED_UBLK and USED_UREC columns).
*/
SELECT s.sid, s.serial#, s.username, s.program, t.used_ublk, t.used_urec
FROM v$session s, v$transaction t
WHERE s.taddr = t.addr
ORDER BY 5 desc, 6 desc, 1, 2, 3, 4;
```
#### Archive logs
> Oracle Database can automatically save the inactive group of redo log files to one or more offline destinations, known collectively as the `archived redo log` (also called the **archive log**). The process of turning redo log files into archived redo log files is called **archiving**.

##### How to detect archive mode:
``` bash
sqlplus / as sysdba
SQL> archive log list
Database log mode              No Archive Mode
Automatic archival             Disabled
Archive destination            USE_DB_RECOVERY_FILE_DEST
Oldest online log sequence     25
Current log sequence           27

SQL> show parameter recovery_file_dest
NAME                                 TYPE        VALUE
------------------------------------ ----------- ------------------------------
db_recovery_file_dest                string      /u01/app/oracle/flash_recovery
                                                 _area
db_recovery_file_dest_size           big integer 3852M
```
##### How to enable / disable archive
``` bash
# first shutdown database
SQL> shutdown immediate
# then startup mount
SQL> startup mount
# alter database archive mode
SQL> alter database archivelog;
SQL> alter database open;
SQL> archive log list
Database log mode              Archive Mode
Automatic archival             Enabled
Archive destination            /u02/app/oracle/oradata/orcl/arch
Oldest online log sequence     25
Next log sequence to archive   27
Current log sequence           27
# switch log file location
SQL> alter system switch logfile;
SQL> host 
$ ls /u02/app/oracle/oradata/orcl/arch

# disable archive is almost same as enable
# just change this one:
SQL> alter database noarchivelog;
```

#### Undo logs
> `Undo tablespaces` are special tablespaces used solely for storing undo information. 
> You cannot create any other `segment types` (for example, `tables or indexes`) in `undo tablespaces`. Each database contains **zero or more** undo tablespaces. In automatic undo management mode, each Oracle instance is assigned **one (and only one)** undo tablespace. 
> Undo data is managed within an undo tablespace using undo segments that are automatically created and maintained by Oracle.

> And undo records are used to：
> * Roll back transactions when a ROLLBACK statement is issued
> * Recover the database
> * Provide read consistency
> * Analyze data as of an earlier point in time by using Oracle Flashback Query
> * Recover from logical corruptions using Oracle Flashback features 

> but, It's different with redo:
> * Record of how to undo a change.
> * Used for Rollback, read-consistency
> * Stored in Undo Segments
> * Protect against inconsistent reads in multiuser systems

##### How to detect

``` SQL
/*
* V$TRANSACTION linked with V$SESSION will show current used undo blocks for ongoing transactions.
*/
SELECT a.sid, a.username, b.used_urec, b.used_ublk
FROM v$session a, v$transaction b
WHERE a.saddr = b.ses_addr
ORDER BY b.used_ublk DESC

/*
* V$SESSTAT provides another view, which uses the undo kind of view, 
* but we must avoid getting lost in the maze of Oracle statistics and focusing on just one: 
* Undo change vector size, which will accumulate the bytes of undo used during the session lifetime.
*/

SELECT a.sid, b.name, a.value
FROM v$sesstat a, v$statname b
WHERE a.statistic# = b.statistic#
AND a.statistic# = 176<– Which stands for undo change vector size
ORDER BY a.value DESC
```

#### Logs and Directories

##### How to detect log in sql statement
``` SQL
-- Displays all redo log groups for the database and indicates which need to be archived.
SELECT GROUP#, THREAD#, SEQUENCE#, MEMBERS, ARCHIVED, STATUS FROM SYS.V$LOG;

-- Shows if the database is in ARCHIVELOG or NOARCHIVELOG mode 
-- and if MANUAL (archiving mode) has been specified.
SELECT LOG_MODE FROM SYS.V$DATABASE;

-- Displays information about the state of the various archive processes for an instance.
SELECT * FROM SYS.V$ARCHIVE_PROCESSES;

-- Displays historical archived log information from the control file. 
-- If you use a recovery catalog, the RC_ARCHIVED_LOG view contains similar information.
SELECT * FROM SYS.V$ARCHIVED_LOG;

-- Describes the current instance, all archive destinations, 
-- and the current value, mode, and status of these destinations.
SELECT * FROM SYS.V$ARCHIVE_DEST;
```

##### How to list oracle directories
``` SQL
-- list all directories in the database.
select owner, directory_name, directory_path from dba_directories;

-- list logfiles member
select member from v$logfile;
```

> Resources: 
> <http://psoug.org/index.htm>
> <https://docs.oracle.com/cd/B28359_01/server.111/b28318/physical.htm>
> <http://database.51cto.com/art/200910/158936.htm>
> <https://docs.oracle.com/cd/B28359_01/server.111/b28318/logical.htm>
> <http://www.jianshu.com/p/4d388f148737>
> <https://oraclenz.wordpress.com/2008/06/22/differences-between-undo-and-redo/>
