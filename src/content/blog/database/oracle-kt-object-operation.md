---
title: 'Oracle - Basic SQL, Store Procedures(Functions, Packages)'
description: >-
  Goals: Have a grasp of both SQL DML (Data Manipulation Language) and DDL (Data
  Definition Language). DML covers items such as Select, Update, Insert and
  Dele…
pubDate: '2016-09-14T00:00:00.000Z'
category: Database
tags:
  - Oracle
  - KT
ai: human
---

> **Goals:**

> Have a grasp of both SQL **DML (Data Manipulation Language)** and **DDL (Data Definition Language)**.
> **DML** covers items such as `Select`, `Update`, `Insert` and `Delete`.  
> You should understand all the major clauses such as `WHERE`, `GROUP BY`, `HAVING`, and `ORDER BY`.  Should be comfortable with **sub queries** and **joins**.
> **DDL** covers items such as `CREATE TABLE` and `ALTER TABLE`
> You should understand how to create and modify tables and indexes and know the difference between deleting records, truncating a table, or dropping it! And… don’t forget views!

> _The detail about **DML&DDL** click [here](/2016/09/03/database/oracle-statements/)_

<!-- more -->

### Special clause in DML
#### Special clause
``` SQL
-- group by syntax
SELECT expression1, expression2, ... expression_n, 
       aggregate_function (aggregate_expression)
FROM tables
[WHERE conditions]
GROUP BY expression1, expression2, ... expression_n;

-- having syntax
SELECT expression1, expression2, ... expression_n, 
       aggregate_function (aggregate_expression)
FROM tables
[WHERE conditions]
GROUP BY expression1, expression2, ... expression_n
HAVING having_condition;

-- order by syntax
SELECT expressions
FROM tables
[WHERE conditions]
ORDER BY expression [ ASC | DESC ];

-- complex example
SELECT DEPTNO, COUNT(*), SUM(SAL) FROM EMP
	WHERE JOB = 'CLERK'
	GROUP BY DEPTNO
	HAVING SUM(SAL) >=500 AND COUNT(*) <> 1
```

#### Subqueries
> see the below related clause examples:

##### WHERE clause
``` SQL
SELECT * 
FROM all_tables tabs
WHERE tabs.table_name IN (SELECT cols.table_name
                          FROM all_tab_columns cols
                          WHERE cols.column_name = 'SUPPLIER_ID');
```
##### FROM clause
``` SQL
SELECT suppliers.name, subquery1.total_amt
FROM suppliers,
 (SELECT supplier_id, SUM(orders.amount) AS total_amt
  FROM orders
  GROUP BY supplier_id) subquery1
WHERE subquery1.supplier_id = suppliers.supplier_id;
```
##### SELECT clause
``` SQL
SELECT tbls.owner, tbls.table_name,
  (SELECT COUNT(column_name) AS total_columns
   FROM all_tab_columns cols
   WHERE cols.owner = tbls.owner
   AND cols.table_name = tbls.table_name) subquery2
FROM all_tables tbls;
```

#### Joins
> * Oracle **INNER JOIN** (or sometimes called **SIMPLE JOIN**)
> * Oracle **LEFT OUTER JOIN** (or sometimes called **LEFT JOIN**)
> * Oracle **RIGHT OUTER JOIN** (or sometimes called **RIGHT JOIN**)
> * Oracle **FULL OUTER JOIN** (or sometimes called **FULL JOIN**)

##### INNER JOIN
![inner-join](/ref/inner_join.gif)
``` SQL
SELECT columns
FROM table1 
INNER JOIN table2
ON table1.column = table2.column;
```

##### LEFT JOIN
![left-join](/ref/left_outer_join.gif)
``` SQL
SELECT columns
FROM table1
LEFT [OUTER] JOIN table2
ON table1.column = table2.column;
```

##### RIGHT JOIN
![right-join](/ref/right_outer_join.gif)
``` SQL
SELECT columns
FROM table1
RIGHT [OUTER] JOIN table2
ON table1.column = table2.column;
```

##### FULL JOIN
![full-join](/ref/full_outer_join.gif)
``` SQL
SELECT columns
FROM table1
FULL [OUTER] JOIN table2
ON table1.column = table2.column;
```
### Store Procedures
>  PL/SQL is a third generation language that has the expected procedural and namespace constructs, and its tight integration with SQL makes it possible to build complex and powerful applications. Because PL/SQL is executed in the database, you can include SQL statements in your code without having to establish a separate connection.

> The main types of program units you can create with PL/SQL and store in the database are **standalone procedures** and **functions**, and **packages**. Once stored in the database, these PL/SQL components, collectively known as **stored procedures**, can be used as building blocks for several different applications.

``` SQL
-- Creating Procedures and Functions syntax
CREATE OR REPLACE procedure_name(arg1 data_type, ...) AS
BEGIN
  ....
END procedure_name;

CREATE OR REPLACE function_name(arg1 data_type, ...) AS
BEGIN
  ....
END function_name;
```

> **Procedures** and **functions** that are defined within a package are known as **packaged subprograms**. Procedures and functions that are nested within other subprograms or within a PL/SQL block are called **local subprograms**; they exist only inside the enclosing block and cannot be referenced externally.

> Packages usually have two parts: **a specification** and **a body**.

``` SQL
-- The standard package specification
CREATE OR REPLACE PACKAGE package_name AS
  type definitions for records, index-by tables
  constants
  exceptions
  global variable declarations
  procedure procedure_1(arg1, ...);
  ...
  function function_1(arg1,...) return datat_ype;
  ...
END package_name;
```
> The **package body** contains the code that implements these subprograms, the code for all private subprograms that can only be invoked from within the package, and the queries for the cursors. You can change the implementation details inside the package body without invalidating the calling applications.

``` SQL
CREATE OR REPLACE PACKAGE BODY package_name AS
  PROCEDURE procedure_1(arg1,...) IS
    BEGIN
      ...
    EXCEPTION 
      ...
    END procedure_1;
  ...
  FUNCTION function_1(arg1,...)  RETURN data_type IS result_variable data_type
    BEGIN
      ...
      RETURN result_variable;
    EXCEPTION
      ...
  END function_1;
  ...
END package_name;
```

> Resources:
<https://docs.oracle.com/cd/B19306_01/server.102/b14200/queries007.htm>
<https://docs.oracle.com/cd/B28359_01/appdev.111/b28843/tdddg_procedures.htm>
