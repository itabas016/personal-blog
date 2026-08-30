---
title: Python - 实例方法，类方法，静态方法和抽象方法区别
description: >-
  Python的instance方法，class方法，static方法和abstract方法。 实例方法的声明只需将第一个参数指定为self,
  静态方法无参数要求。而类方法需将第一个参数指定为类cls。抽象方法是定义在基类中的一种方法，不提供任何实现。
pubDate: '2017-09-23T00:00:00.000Z'
category: Python
tags:
  - Python
  - 静态方法
  - 类方法
  - 抽象方法
ai: human
---

Python的`instance`方法，`class`方法，`static`方法和`abstract`方法。
实例方法的声明只需将第一个参数指定为`self`, 静态方法无参数要求。而类方法需将第一个参数指定为类`cls`。抽象方法是定义在基类中的一种方法，不提供任何实现。

<!-- more -->

下面来看方法实现：

``` python
# -*- coding: utf-8 -*-

class Material(object):
    def __init__(self, cheese='', vegetables='', meat=''):
        self.cheese = cheese
        self.vegetables = vegetables
        self.meat = meat

    def get_cheese(self):
        return self.cheese

    def get_vegetables(self):
        return self.vegetables

    def get_meat(self):
        return self.meat

class Pizza(object):

    def __init__(self, size):
         self.size = size
    def get_size(self):
         return self.size

    @staticmethod
    def pure_material(x):
        return 'Pure Pizza: %s' % x

    @staticmethod
    def mix_material(x, y):
        return 'Mix Pizza: %s + %s' % (x, y)

    @classmethod
    def cook_vegetable(cls, material):
        return cls.pure_material(material.get_vegetables())

    @classmethod
    def cook_meat(cls, material):
        return cls.mix_material(material.get_cheese(), material.get_meat())


material = Material('Cheese', 'Tomatoes', 'Beaf')
p = Pizza(30)

print('Pizza size', p.get_size())
print(Pizza.cook_vegetable(material))
print(Pizza.cook_meat(material))

Output:
Pizza size 30
Pure Pizza: Tomatoes
Mix Pizza: Cheese + Beaf
```

抽象方法，我们可以通过一个`BasePizza`来实现。

``` python
# -*- coding: utf-8 -*-

import abc

class BasePizza(object):
    
    __abstract__  = True
    __metaclass__  = abc.ABCMeta

    default_material = ['wheat']

    @classmethod
    @abc.abstractmethod
    def get_material(cls):
        return cls.default_material

class AdvancePizza(BasePizza):

    def __init__(self, size):
        self.size = size
    
    def get_size(self):
         return self.size

    def get_material(self):
        return ['egg'] + ['meat'] + ['friut'] + super(AdvancePizza, self).get_material()

p = AdvancePizza(30)
print(p.get_material())
```

References:

[The definitive guide on how to use static, class or abstract methods in Python](https://julien.danjou.info/blog/2013/guide-python-static-class-abstract-methods)
