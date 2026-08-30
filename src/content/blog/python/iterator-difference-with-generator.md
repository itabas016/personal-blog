---
title: Python - 迭代器和生成器区别(Iterator vs Generator)
description: >-
  下面简单说一下迭代器和生成器的区别： 通常生成器是通过调用一个或多个yield表达式构成的函数。每个生成器都是迭代器。
  而迭代器是一个抽象的概念，包括了iterable和iterator这两种实现。
pubDate: '2017-09-17T00:00:00.000Z'
category: Python
tags:
  - Python
  - Iterator
  - Generator
ai: human
---

下面简单说一下迭代器和生成器的区别：

通常生成器是通过调用一个或多个`yield`表达式构成的函数。每个生成器都是迭代器。
而迭代器是一个抽象的概念，包括了`iterable`和`iterator`这两种实现。

<!-- more -->

### Iterator & Generator ###

* `iterable`: 它表示了一个可以重复迭代的对象，判断一个对象是否可以`iterable`, 是否可以`for`循环, 是否定义了`__getitem__`方法, 是否定义了`__iter__`方法返回一个`iterator` 
* `iterator`: 特殊之处是只能迭代一次，判断一个对象是否是`iterator`，是否定义了`__iter__`方法，并且必须返回自身，是否定义了`__next__`方法

**PS. `str`和`list`都是典型的`iterable`而不是`iterator`**

用一个公交车的例子再来看一遍：
``` python
class Bus(object):   # 只是iterable而不是iterator

    def __init__(self, *args):
        self.stops = list(args)

    def __iter__(self):  # 并没有返回自身
        return BusStopIterator(self)

class BusStopIterator(object):  # iterator

    def __init__(self, bus):
        self.stops = bus.stops
        self.index = 0

    def __iter__(self):
        return self

    def __next__(self):
        if self.index == len(self.stops):
            raise StopIteration
        stop = self.stops[self.index]
        self.index += 1
        return stop

if __name__ == '__main__':
    bus = Bus('XinZhuang RailWay Station', 'WaiHuan Road', 'LianHua Road', 'JinJiangLeYuan')
    for stop in bus:
        print(stop)
```

* `generator`: 看如下表达式，两者是等价的。

``` python
def squares(length):
    for i in range(length):
        yield i*i

squares = [i**2 for i in range(10)]
```

用`yield`实现斐波那契数列：
``` python 
def fibonacci():
    a=b=1
    yield a
    yield b
    while True:
        a,b = b,a+b
        yield b
```
