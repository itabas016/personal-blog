---
title: Drop - Delete - Truncate 的区别
description: >-
  truncate和delete只删除数据不删除表的结构(定义); drop将删除表的结构被依赖的constrain,trigger,index;
  依赖于该表的存储过程/函数将保留,但是变为invalid状态. >
  TRUNCATE在各种表上无论是大的还是小的都非常快。如果有ROLLBACK命令DELETE将被撤销…
pubDate: '2012-08-16T00:00:00.000Z'
category: Database
tags:
  - DataBase
ai: human
---

> `truncate`和`delete`只删除数据不删除表的结构(定义);
> `drop`将删除表的结构被依赖的`constrain`,`trigger`,`index`; 依赖于该表的存储过程/函数将保留,但是变为`invalid`状态.

* > `TRUNCATE`在各种表上无论是大的还是小的都非常快。如果有`ROLLBACK`命令`DELETE`将被撤销，而`TRUNCATE`则不会被撤销。

* > `TRUNCATE`不能进行回滚操作。

* > `TRUNCATE`不触发任何`DELETE`触发器。

* > 当表被`TRUNCATE`后，这个表和索引所占用的空间会恢复到初始大小，而`DELETE`操作不会减少表或索引所占用的空间。

* > 不能`TRUNCATE`一个带有外键的表，如果要删除首先要取消外键，然后再删除。

* > `DELETE`语句执行删除的过程是每次从表中删除一行，并且同时将该行的的删除操作作为事务记录在日志中保存以便进行进行回滚操作。

* > `TRUNCATE TABLE`则一次性地从表中删除所有的数据页并不把单独的删除操作记录记入日志保存，删除行是不能恢复的。并且在删除的过程中不会激活与表有关的删除触发器。执行速度快。

* > `DELETE`语句可以通过`WHERE`对要删除的记录进行选择。而使用TRUNCATE TABLE将删除表中的所有记录。因此，`DELETE`语句更灵活。如果`DELETE`不加`WHERE`子句， `DELETE`可以返回被删除的记录数，而`TRUNCATE TABLE`返回的是`0`。如果一个表中有自增字段，使用`TRUNCATE TABLE`和没有`WHERE`子句的`DELETE`删除所有记录后，这个自增字段将起始值恢复成`1`.如果你不想这样做的话，可以在`DELETE`语句中加上永真的`WHERE`，如`WHERE 1`或`WHERE true`。`DELETE FROM table1 WHERE 1`;

> Question: 有一个拥有1亿条数据的表，只需要保留其中的5条，其他删除，怎么办？
``` sql
select * into #temp_table from bigggggg_table where caluse....;
truncate table bigggggg_table;
insert bigggggg_table select * from #temp_table;
drop table #temp_table;
```
