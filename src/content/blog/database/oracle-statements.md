---
title: 'Oracle Statements - DDL, DML, DCL, TCL'
description: >-
  DDL Data Definition Language (DDL) statements are used to define the database
  structure or schema. Some examples: DML Data Manipulation Language (DML)
  statem…
pubDate: '2016-09-03T00:00:00.000Z'
category: Database
tags:
  - Oracle
ai: human
---

### `DDL`

> **Data Definition Language (DDL)**
> statements are used to define the database structure or schema. Some examples:
``` sql
CREATE - to create objects in the database
ALTER - alters the structure of the database
DROP - delete objects from the database
TRUNCATE - remove all records from a table, including all spaces allocated for the records are removed
COMMENT - add comments to the data dictionary
RENAME - rename an object
```
### `DML`

> **Data Manipulation Language (DML)**
> statements are used for managing data within schema objects. Some examples:
```sql
SELECT - retrieve data from the a database
INSERT - insert data into a table
UPDATE - updates existing data within a table
DELETE - deletes all records from a table, the space for the records remain
MERGE - UPSERT operation (insert or update)
CALL - call a PL/SQL or Java subprogram
EXPLAIN PLAN - explain access path to data
LOCK TABLE - control concurrency
```
### `DCL`

> **Data Control Language (DCL)**
> Some examples:
``` sql
GRANT - gives user's access privileges to database
REVOKE - withdraw access privileges given with the GRANT command
```
### `TCL`

> **Transaction Control (TCL)**
> statements are used to manage the changes made by DML statements. It allows statements to be grouped together into logical transactions.
``` sql
COMMIT - save work done
SAVEPOINT - identify a point in a transaction to which you can later roll back
ROLLBACK - restore database to original since the last COMMIT
SET TRANSACTION - Change transaction options like isolation level and what rollback segment to use
```
