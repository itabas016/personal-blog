---
title: 'Oracle - Instance - RAC, Memory - SGA, PGA'
description: >-
  An Oracle database server consists of an Oracle database and an Oracle
  instance. Every time a database is started, a system global area (SGA) is
  allocated an…
pubDate: '2016-10-30T00:00:00.000Z'
category: Database
tags:
  - Oracle
  - KT
ai: human
---

An Oracle database server consists of an Oracle database and an Oracle instance. Every time a database is started, a system global area (**SGA**) is allocated and Oracle background processes are started. The combination of the background processes and memory buffers is called an Oracle instance.

<!-- more -->

### Real Application Clusters(RAC)
> Multiple Instance Systems, Real Application Clusters (RAC) takes advantage of such architecture by running multiple instances that share a single physical database. In most applications, RAC enables access to a single database by users on multiple computers with increased performance.

![oracle-rac-structre](/ref/oracle-rac-structure.jpg)

> At a very high level, `RAC architecture` consists of these components:
> * Physical Nodes or Hosts
> * Physical Interconnects and interconnect protocols
> * Cluster Manager Software and Cluster Ready Services
> * Oracle Instances and Cache Fusion
> * Shared Disk System
> * Clustered File System, Raw Devices, Automatic Storage Management
> * Network Services
> * Workload Management Services ? Virtual IP configuration

### Memory Structures
> For example, memory stores program code being run and data shared among users. Two basic memory structures are associated with Oracle: the system global area and the program global area. The following subsections explain each in detail.

![oracle-mem-structure](/ref/oracle-memory-structure.gif)

#### System Global Area(SGA)
> The `System Global Area (SGA)` is a shared memory region that contains data and control information for one Oracle instance. Oracle allocates the `SGA` when an instance starts and deallocates it when the instance shuts down. Each instance has its own `SGA`.

> The information stored in the SGA is divided into several types of memory structures, including the `database buffers`, `redo log buffer`, and `the shared pool`.

##### Database Buffer Cache of the SGA
> `Database buffers` store the most recently used blocks of data. The set of database buffers in an instance is the database buffer cache. The buffer cache contains modified as well as unmodified blocks. Because the most recently (and often, the most frequently) used data is kept in memory, less disk I/O is necessary, and performance is improved.

> With automatic SGA management, you can simply set the `SGA_TARGET` initialization parameter to `1G`. If an application needs more shared pool memory, it can obtain that memory by acquiring it from the free memory in the buffer cache.

##### Redo Log Buffer of the SGA
> The `redo log buffer` stores redo entries—a log of changes made to the database. The redo entries stored in the redo log buffers are written to an online redo log, which is used if database recovery is necessary. The size of the redo log is static.

##### Shared Pool of the SGA
> The `shared pool` contains shared memory constructs, such as shared SQL areas. A shared SQL area is required to process every unique SQL statement submitted to a database. A shared SQL area contains information such as the parse tree and execution plan for the corresponding statement. A single shared SQL area is used by multiple applications that issue the same statement, leaving more shared memory for other uses.

> [The detail plain see here](https://docs.oracle.com/cd/B19306_01/server.102/b14220/memory.htm#i10093)

#### Program Global Area(PGA)
> The `Program Global Area (PGA)` is a memory buffer that contains data and control information for a server process. A PGA is created by Oracle when a server process is started. The information in a PGA depends on the Oracle configuration.

> It is a **nonshared memory** created by Oracle when a server process is started. Access to it is exclusive to that server process and is read and written only by Oracle code acting on behalf of it. The total PGA memory allocated by each server process attached to an Oracle instance is also referred to as the aggregated PGA memory allocated by the instance.

> Resources:
> <https://docs.oracle.com/cd/E11882_01/rac.112/e41960/admcon.htm#RACAD1111>
> <https://docs.oracle.com/cd/B19306_01/server.102/b14220/memory.htm>
