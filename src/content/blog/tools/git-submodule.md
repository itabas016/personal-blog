---
title: Git submodule
description: >-
  Normally, git-submodule is benefit as sub project on the third party solution
  or integration solution. So Let us talk about it.
pubDate: '2014-08-23T00:00:00.000Z'
category: Tools
tags:
  - Git
ai: human
---

> Normally, `git-submodule` is benefit as sub project on the third party solution or integration solution. So Let us talk about it.

<!-- more -->

### Create repo with submodule

``` bash
### solution 1
## prepare
cd /
mkdir testproj
cd testproj
mkdir test_master_proj test_sub_a_proj test_sub_b_proj
cd test_master_proj

# create master project
echo "# test_master_proj" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin git@github.com:itabas016/test_master_proj.git
git push -u origin master

# create sub a project
cd ../test_sub_a_proj
echo "# test_sub_a_proj" >> README.md
git init
git add README.md
git commit -m "first commit for sub a"
git remote add origin git@github.com:itabas016/test_sub_a_proj.git
git push -u origin master

# create sub b project
cd ../test_sub_b_proj
echo "# test_sub_b_proj" >> README.md
git init
git add README.md
git commit -m "first commit for sub b"
git remote add origin git@github.com:itabas016/test_sub_b_proj.git
git push -u origin master

# add the third repo for master
git submodule add git@github.com:itabas016/test_sub_a_proj.git subA
git submodule add git@github.com:itabas016/test_sub_b_proj.git subB
git status
# result:
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        new file:   .gitmodules
        new file:   subA
        new file:   subB

# push the third submodule to master
git commit -m 'thirdpart submodule A&B added.'
git push -u origin master


### solution 2
# Just use clone

# clone repo
git clone git@github.com:itabas016/test_master_proj.git

# init sub repo
git submodule init
git submodule update

# another quick way to clone master with recursive
git clone --recursive git@github.com:itabas016/test_master_proj.git
```

### Update repo with submodule

> normally, the repo update is used `git pull`, it will be resolve the conflict automatic. But when update the master repo, you should attent the sub repo whether has update, see the below:

``` bash
# master pull
git pull
git status

# if submodule has changed
git submodule update

# sometime should be run this command
git submodule update --remote

# if submodule has other denpendency repo and has updated
git submodule foreach "git submodule update"

# same as submodule master branch
git submodule update --remote --rescursive

# if just update one submodule repo
cd subA/
git pull

# if subA has denpendency with other repo
git submodule foreach "git pull" --recursive
```

### Modify repo with submodule

> when execute `git submodule update` don't checkout any branch, so the HEAD of submodule is detached state.
> when modify submodule repo, remember checkout related feature branch. 

``` bash
cd ../test_sub_a_proj
git checkout master

[submodule "subA"]
	path = subA
	url = git@github.com:itabas016/test_sub_a_proj.git
	branch = master

# modify subA folder
# modify README.md add new line

git add README.md
git commit -m "new comments added."
git push -u origin master

cd ..
git status

git add test_sub_a_proj
git commit -m 'submodule updated'
git push -u origin master

# if modify submodule repo before your change forgot to checkout remote master branch, 
# and have a commit in your local. Now we should use `cherry-pick` 
# switch submodule from detach state to remote master.

git cherry-pick a
git push -u origin master
```

### Rename/Move repo with submodule

``` bash
# use copy instead of move behavior
mkdir framework
cp -R subA framework/

# modify relatation config
# mainly .gitmodules, .git/config

sed -i 's@subA@framework/subA@' .gitmodules
sed -i 's@subA@framework/subA@' framework/subA/.git
mv .git/modules/subA .git/modules/framework/subA
sed -i 's@subA@framework/subA@' .git/modules/framework/subA/config

git rm --cached subA
git add framework/subA .gitmodules
git submodule sync -- framework/subA

# also use the below command:
cd ../test_master_proj
git rm --cached subA
rm -rf subA
rm -rf .git/modules/subA
nano -w .gitmodules
...remove subA...
nano -w .git/config
...remove subA...
git submodule add git@github.com:itabas016/test_sub_a_proj.git framework/subA -b master
git add .gitmodules
git commit -m 'subA moved to framework/subA/.'
git push -u origin master
```

### Delete repo with submodule
``` bash
cd ../test_master_proj
git rm --cached framework/subA
$ rm -rf framework/subA
$ rm -rf .git/modules/framework/subA

# remove git record: cached and folder
git rm --cached framework/subA
$ rm -rf framework/subA
$ rm -rf .git/modules/framework/subA

# update configuration and commit
$ git add .gitmodule
$ git commit -m 'framework/subA submodule removed.'
$ git push -u origin master
```

### Quick Tricks

#### Submodule foreach

``` bash
# keep all the submodule changes
git submodule foreach 'git stash'

# switch checkout all the submodule to a new branch
git submodule foreach 'git checkout -b featureA'

# generate difference master with all the submodules
git diff; git submodule foreach 'git diff'
```

#### Useful alias commands

``` bash
git config alias.sdiff '!'"git diff && git submodule foreach 'git diff'"
git config alias.spush 'push --recurse-submodules=on-demand'
git config alias.supdate 'submodule update --remote --merge'

# then run the below commands:
git supdate
git spush
```

> Resources:
> http://easior.is-programmer.com/posts/42541.html
> https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97
