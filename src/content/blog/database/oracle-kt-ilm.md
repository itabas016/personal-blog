---
title: Oracle - ILM
description: >-
  ILM is mean Information Lifecycle Management. It's practice of applying
  policies for effective management of information throughout its useful life.
  Implemen…
pubDate: '2016-11-09T00:00:00.000Z'
category: Database
tags:
  - Oracle
  - KT
ai: human
---

> `ILM` is mean Information Lifecycle Management. It's practice of applying policies for effective management of information throughout its useful life.

> **Implementing ILM Using Oracle Database**
> The offical documentation see **[here](https://docs.oracle.com/cd/B28359_01/server.111/b32024/part_lifecycle.htm)**

<!-- more -->

> And mainly four steps:

> * `Define the Data Classes`
> * `Create Storage Tiers for the Data Classes`
> * `Create Data Access and Migration Policies`
> * `Define and Enforce Compliance Policies`

> In fact, in our production, I need to handle a unpartition table to `ILM`, so I should `archive data` and `create partition` and `add customize policy`. 
> See the below steps:

### Archive Database

``` SQL
@IBSArch.par
set serveroutput on;
set verify off;

spool IBSArchive.log

prompt
prompt Attempting to create the user used for archived data ....
@@scripts/createarchuser

prompt
prompt Create objects in BD schema
@@scripts/createBDobjects

prompt
prompt Attempting to create private synonyms for BD database objects in the arch schema
@@scripts/createsynonyms

prompt
prompt Attempting to add new DSN for archived data
--create new DSN for archived data
@@scripts/createDSN

prompt
prompt Attempting to create a scheduler job to run the partitioning of Businessdata
--create new DSN for archived data
@@scripts/createPartitionJob

spool off;
exit;
```

### VPD - Virtual Private Database

``` SQL
@IBSArch.par
set serveroutput on;
set verify off;

spool IBSVPD.log

prompt
prompt Attempting to create the VPD profiles
@@scripts/createvpdprofiles
```

> These resource files see [here](https://github.com/itabas016/ilm-script).
