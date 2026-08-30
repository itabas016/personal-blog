---
title: Oracle - How to Read a Query Plan
description: >-
  Goal: know how to generate and read a basic query plan. Understand key
  phrases, such as Full Table Scan and Nested Loops should jump out as red
  flags. Be abl…
pubDate: '2016-10-13T00:00:00.000Z'
category: Database
tags:
  - Oracle
  - KT
ai: human
---

> Goal: know how to generate and read a basic query plan.
> Understand key phrases, such as **Full Table Scan** and **Nested Loops** should jump out as red flags. Be able to generate & analyze a SQL query plan

<!-- more -->

> When you fire an SQL query to Oracle, Oracle database internally creates a **query execution plan** in order to fetch the desired data from the physical tables. The query execution plan is nothing but a set of methods on how the database will access the data from the tables. This query execution plan is crucial as different execution plans will need different cost and time for the query execution.

> How the Execution Plan is created actually depends on what type of query optimizer is being used in your Oracle database. There are two different optimizer options – **Rule based (RBO)** and **Cost based (CBO)** Optimizer. For Oracle 10g, **CBO** is the default optimizer. Cost Based optimizer enforces Oracle to generate the optimization plan by taking all the related table statistics into consideration. On the other hand, **RBO** uses a fixed set of **pre-defined rules** to generate the query plan. Obviously such fixed set of rules may not always be able to create the plan that is most efficient in nature. This is because an efficient plan will depend heavily on the nature and volume of table's data. Because of this reason, **CBO** is preferred over **RBO**.

### How to read excution plan - basic
``` SQL
SELECT PLAN_TABLE_OUTPUT 
  FROM TABLE(DBMS_XPLAN.DISPLAY(NULL, 'statement_id','BASIC'));
```

> See the below example, read detail execution four scan way:

``` SQL
-- create simple table - product
Create table (
	ID number(10)
	NAME varchar2(100)
	DESCRIPTION varchar2(255)
	SERVICE varchar2(30)
	PART_NUM varchar2(50)
	LOAD_DATE date
)

-- insert data 15000 records without index
```
### Full Table Scan
> * Whole table is read upto high water mark
> * Uses multiblock input/output
> * Buffer from FTS operation is stored in LRU end of buffer cache

``` SQL
-- explain plan
SQL> explain plan for select * from product;
Explained.

-- query plan
SQL> select * from table(dbms_xplan.display);
PLAN_TABLE_OUTPUT
----------------------------------------------------------
Plan hash value: 3917577207
-------------------------------------
| Id  | Operation          | Name   |
-------------------------------------
|   0 | SELECT STATEMENT   |        |
|   1 |  TABLE ACCESS FULL | PRODUCT|
-------------------------------------

-- use RBO instead of CBO statistic 
SQL> Analyze table product compute statistics;

-- query plan
SQL> select * from table(dbms_xplan.display);

PLAN_TABLE_OUTPUT
-----------------------------------------------------
Plan hash value: 3917577207
-----------------------------------------------------
| Id  | Operation          | Name    | Rows  | Bytes |
-----------------------------------------------------
|   0 | SELECT STATEMENT   |         | 15856 |  1254K|
|   1 |  TABLE ACCESS FULL | PRODUCT | 15856 |  1254K|
-----------------------------------------------------
```

### Index Unique Scan
> * Single block input/output
``` SQL
-- create index for test
SQL> create unique index idx_prod_id on product (id) compute statistics;
Index created.

-- explain plan
SQL> explain plan for select id from product where id = 100;
Explained.

-- query plan
SQL> select * from table(dbms_xplan.display);

PLAN_TABLE_OUTPUT
---------------------------------------------------------
Plan hash value: 2424962071
---------------------------------------------------------
| Id  | Operation          | Name        | Rows  | Bytes |
---------------------------------------------------------
|   0 | SELECT STATEMENT   |             |     1 |     4 |
|*  1 |  INDEX UNIQUE SCAN | IDX_PROD_ID |     1 |     4 |
---------------------------------------------------------
```

### Index Fast Full Scan
> * Multi block i/o possible
> * Returned rows may not be in sorted order
``` SQL
-- explain plan
SQL> explain plan for select id from product where id>10;
Explained.

-- query plan
SQL> select * from table(dbms_xplan.display);

PLAN_TABLE_OUTPUT
------------------------------------------------
Plan hash value: 2179322443
--------------------------------------------------------
| Id  | Operation            | Name       | Rows |Bytes |
--------------------------------------------------------
|   0 | SELECT STATEMENT     |            | 15849|63396 |
|*  1 |  INDEX FAST FULL SCAN| IDX_PROD_ID| 15849|63396 |
---------------------------------------------------------
```

### Index Full Scan
> * Single block i/o
> * Returned rows generally will be in sorted order

> Resources: 
<https://dwbi.org/database/oracle/38-oracle-query-plan-a-10-minutes-guide>
<https://dwbi.org/database/oracle/39-query-execution-plan-part2.html>
