---
title: Package Manager - Yarn vs NPM
description: >-
  Yarn is a fast, reliable, and secure dependency management tool. Open Source
  ---> Github Offical Documentation: Almost From Functional and CLI two parts to
  c…
pubDate: '2016-11-01T00:00:00.000Z'
category: Tools
tags:
  - package
  - NPM
  - Yarn
ai: human
---

Yarn is a fast, reliable, and secure dependency management tool. Open Source ---> [Github](https://github.com/yarnpkg/yarn)
Offical Documentation: <https://yarnpkg.com/en/docs>

> Almost From Functional and CLI two parts to compare, see the below: 

<!-- more -->

## Functional Differences
In `package.json`, the file where both npm as Yarn keep track of the project’s dependencies, version numbers aren’t always exact. 

> To avoid package version mis-matches, an exact installed version is pinned down in a lock file.
> Every time a module is added, Yarn creates (or updates) a `yarn.lock` file. 
> This way you can guarantee another machine installs the exact same package, while still having a range of allowed versions defined in `package.json`.

In npm, the `npm shrinkwrap` command generates a lock file as well, and `npm install` reads that file before reading `package.json`, much like how Yarn reads `yarn.lock` first. 

[yarn.lock documentation](https://yarnpkg.com/en/docs/configuration#toc-use-yarn-lock-to-pin-your-dependencies)
[npm shrinkwrap documentation](https://docs.npmjs.com/cli/shrinkwrap)

## CLI Differences

Other than some functional differences, Yarn also has different commands. 
Some npm commands were removed, others modified and a couple of interesting commands were added.

##### [`yarn global`](https://yarnpkg.com/en/docs/cli/global)
##### [`yarn install`](https://yarnpkg.com/en/docs/cli/install)
##### [`yarn add [–dev]`](https://yarnpkg.com/en/docs/cli/add)
##### [`yarn licenses [ls|generate-disclaimer]`](https://yarnpkg.com/en/docs/cli/licenses)
##### [`yarn why`](https://yarnpkg.com/en/docs/cli/why)
##### [`yarn upgrade [package]`](https://yarnpkg.com/en/docs/cli/upgrade)
##### [`yarn generate-lock-entry`](https://yarnpkg.com/en/docs/cli/generate-lock-entry)

Resources: 
<https://www.sitepoint.com/yarn-vs-npm/>
<https://www.berriart.com/blog/2016/10/npm-yarn-benchmark/>
<https://github.com/appleboy/npm-vs-yarn>
