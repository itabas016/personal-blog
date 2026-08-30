---
title: 'Oracle - Session, Users, Profiles Management'
description: >-
  This article is about oracle daily maintaince, mainly contains dbausers,
  v$session and dbaprofiles the three parts.
pubDate: '2016-12-20T00:00:00.000Z'
category: Database
tags:
  - DataBase
ai: human
---

> This article is about oracle daily maintaince, mainly contains `dba_users`, `v$session` and `dba_profiles` the three parts.

<!-- more -->

### Manage oracle users

> Each Oracle database has a list of valid database users. To access a database, a user must run a database application and connect to the database instance using a valid user name defined in the database.

> See the below example:

``` SQL
DEFINE USERNAME = 'BD_ROGER'

-- drop user completely
DROP USER &USERNAME CASCADE;

-- create user completely
CREATE USER &USERNAME
  IDENTIFIED BY &USERNAME
  DEFAULT TABLESPACE DATAUSR
  TEMPORARY TABLESPACE TEMP
  PROFILE DEFAULT
  ACCOUNT UNLOCK;

-- 2 Roles for &USERNAME 
GRANT RESOURCE TO &USERNAME;
GRANT CONNECT TO &USERNAME;
ALTER USER &USERNAME DEFAULT ROLE ALL;

-- 12 System Privileges for &USERNAME 
GRANT CREATE ANY TABLE TO &USERNAME;
GRANT CREATE ANY INDEX TO &USERNAME;
GRANT LOCK ANY TABLE TO &USERNAME;
GRANT CREATE ANY TRIGGER TO &USERNAME;
GRANT CREATE SEQUENCE TO &USERNAME;
GRANT CREATE VIEW TO &USERNAME;
GRANT MANAGE TABLESPACE TO &USERNAME;
GRANT UNLIMITED TABLESPACE TO &USERNAME;
GRANT CREATE JOB TO &USERNAME;
GRANT SELECT ANY TABLE TO &USERNAME;
GRANT DROP ANY TABLE TO &USERNAME;
GRANT ALTER ANY TABLE TO &USERNAME;

-- 2 Object Privileges for &USERNAME 
GRANT EXECUTE ON SYS.DBMS_CRYPTO TO &USERNAME;
GRANT EXECUTE ON SYS.DBMS_REDEFINITION TO &USERNAME;
GRANT EXECUTE on DBMS_AQADM to &USERNAME;
GRANT EXECUTE on DBMS_AQ to &USERNAME;
GRANT CREATE MATERIALIZED VIEW to &USERNAME;
```

### Users and Profiles overview

```
TABLE NAME 			DESCRIPTION
-----------			--------------------------------------------
DBA_USERS			Describes all users of the database
ALL_USERS			Lists users visible to the current user, but does not describe them
USER_USERS			Describes only the current user
DBA_TS_QUOTAS/USER_TS_QUOTAS	Describes tablespace quotas for users
USER_PASSWORD_LIMITS		Describes the password profile parameters that are assigned to the user
USER_RESOURCE_LIMITS		Displays the resource limits for the current user
DBA_PROFILES			Displays all profiles and their limits
RESOURCE_COST			Lists the cost for each resource
V$SESSION			Lists session information for each current session, includes user name
V$SESSTAT			Lists user session statistics
V$STATNAME			Displays decoded statistic names for the statistics shown in the V$SESSTAT view
PROXY_USERS			Describes users who can assume the identity of other users
```

``` SQL
--list all users with account status and profile
SELECT USERNAME, PROFILE, ACCOUNT_STATUS FROM DBA_USERS;

-- list expired user and combine sql to execute
select 'alter user ' || username || ' identified by ' || username || ' account unlock;' 
	from dba_users 
	where account_status like '%EXPIRED%' and Username like '%ROGER';

-- list currently database profiles
select profile, resource_name, resource_type, limit from dba_profiles;

PROFILE RESOURCE NAME				TYPE 	LIMIT
---------------------------------------------------
DEFAULT	COMPOSITE_LIMIT			KERNEL		UNLIMITED
DEFAULT	SESSIONS_PER_USER		KERNEL		UNLIMITED
DEFAULT	CPU_PER_SESSION			KERNEL		UNLIMITED
DEFAULT	CPU_PER_CALL			KERNEL		UNLIMITED
DEFAULT	LOGICAL_READS_PER_SESSION	KERNEL		UNLIMITED
DEFAULT	LOGICAL_READS_PER_CALL		KERNEL		UNLIMITED
DEFAULT	IDLE_TIME			KERNEL		UNLIMITED
DEFAULT	CONNECT_TIME			KERNEL		UNLIMITED
DEFAULT	PRIVATE_SGA			KERNEL		UNLIMITED
DEFAULT	FAILED_LOGIN_ATTEMPTS		PASSWORD	10
DEFAULT	PASSWORD_LIFE_TIME		PASSWORD	UNLIMITED
DEFAULT	PASSWORD_REUSE_TIME		PASSWORD	UNLIMITED
DEFAULT	PASSWORD_REUSE_MAX		PASSWORD	UNLIMITED
DEFAULT	PASSWORD_VERIFY_FUNCTION	PASSWORD	NULL
DEFAULT	PASSWORD_LOCK_TIME		PASSWORD	1
DEFAULT	PASSWORD_GRACE_TIME		PASSWORD	7


-- PS. EXPIRED(GRACE) - 宽限期限已过期
-- modify profile password never expired
ALTER PROFILE DEFAULT LIMIT PASSWORD_LIFE_TIME UNLIMITED;
```

> see the example:

``` SQL
-- Profile Resource Limits
CREATE PROFILE app_user LIMIT 
   SESSIONS_PER_USER          UNLIMITED 
   CPU_PER_SESSION            UNLIMITED 
   CPU_PER_CALL               3000 
   CONNECT_TIME               45 
   LOGICAL_READS_PER_SESSION  DEFAULT 
   LOGICAL_READS_PER_CALL     1000 
   PRIVATE_SGA                15K
   COMPOSITE_LIMIT            5000000; 


-- Profile Password Limits
CREATE PROFILE app_user2 LIMIT
   FAILED_LOGIN_ATTEMPTS 5
   PASSWORD_LIFE_TIME 60
   PASSWORD_REUSE_TIME 60
   PASSWORD_REUSE_MAX 5
   PASSWORD_VERIFY_FUNCTION verify_function
   PASSWORD_LOCK_TIME 1/24
   PASSWORD_GRACE_TIME 10;
```

### Sessions

``` SQL
-- list all session with status, os run user, machine name, and which program
select sid, serial#, username, status, osuser, machine, program, module  from v$session;


-- kill session by sid & serial# value
ALTER SYSTEM KILL SESSION '6, 16409' IMMEDIATE;
```

### Privilege and Role overview


``` bash
# Table Name - Description

DBA_COL_PRIVS
ALL_COL_PRIVS
USER_COL_PRIVS
# DBA view describes all column object grants in the database. 
# ALL view describes all column object grants for which the current user or PUBLIC is the object owner, grantor, or grantee. # USER view describes column object grants for which the current user is the object owner, grantor, or grantee.

ALL_COL_PRIVS_MADE
USER_COL_PRIVS_MADE
# ALL view lists column object grants for which the current user is object owner or grantor. 
# USER view describes column object grants for which the current user is the grantor.

ALL_COL_PRIVS_RECD
USER_COL_PRIVS_RECD
# ALL view describes column object grants for which the current user or PUBLIC is the grantee. 
# USER view describes column object grants for which the current user is the grantee.

DBA_TAB_PRIVS
ALL_TAB_PRIVS
USER_TAB_PRIVS
# DBA view lists all grants on all objects in the database. 
# ALL view lists the grants on objects where the user or PUBLIC is the grantee. 
# USER view lists grants on all objects where the current user is the grantee.

ALL_TAB_PRIVS_MADE
USER_TAB_PRIVS_MADE
# ALL view lists the all object grants made by the current user or made on the objects owned by the current user. 
# USER view lists grants on all objects owned by the current user.

ALL_TAB_PRIVS_RECD
USER_TAB_PRIVS_RECD
# ALL view lists object grants for which the user or PUBLIC is the grantee. 
# USER view lists object grants for which the current user is the grantee.

DBA_ROLES	
# This view lists all roles that exist in the database.

DBA_ROLE_PRIVS
USER_ROLE_PRIVS
# DBA view lists roles granted to users and roles. 
# USER view lists roles granted to the current user.

DBA_SYS_PRIVS
USER_SYS_PRIVS
# DBA view lists system privileges granted to users and roles. 
# USER view lists system privileges granted to the current user.

ROLE_ROLE_PRIVS	
# This view describes roles granted to other roles. 
# Information is provided only about roles to which the user has access.

ROLE_SYS_PRIVS	
# This view contains information about system privileges granted to roles. 
# Information is provided only about roles to which the user has access.

ROLE_TAB_PRIVS	
# This view contains information about object privileges granted to roles. 
# Information is provided only about roles to which the user has access.

SESSION_PRIVS
# This view lists the privileges that are currently enabled for the user.

SESSION_ROLES
# This view lists the roles that are currently enabled to the user.
```

> Resources:
> http://kannan-oracle.blogspot.com/2012/06/how-to-show-user-profile-and-change-its.html
