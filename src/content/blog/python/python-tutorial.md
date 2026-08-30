---
title: Python 之旅 - 开篇
description: Python基础还是照着廖雪峰的教程撸了一遍。 教程的学习路线开始太过平缓，后期直线上升很容易扯着蛋
pubDate: '2017-09-09T00:00:00.000Z'
category: Python
tags:
  - Python
  - Iterator
  - Generator
  - Decorator
ai: human
---

Python基础还是照着[廖雪峰的教程](https://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000)撸了一遍。
教程的学习路线开始太过平缓，后期直线上升很容易扯着蛋~

<!-- more -->

## 基础(趟一遍) ##

**PS. Basic on python 3.5** (所有源码 --> [source code](https://github.com/itabas016/PythonTrip/tree/master/course_liao))

### Func(函数) ###

* 递归函数 [[recur_func.py](https://github.com/itabas016/PythonTrip/blob/master/course_liao/function/recur_func.py)]
* Map/Reduce [[map_reduce.py](https://github.com/itabas016/PythonTrip/blob/master/course_liao/function/map_reduce.py)]
* 过滤器 [[filter.py](https://github.com/itabas016/PythonTrip/blob/master/course_liao/function/filter.py)]
* 排序 [[sorted.py](https://github.com/itabas016/PythonTrip/blob/master/course_liao/function/sorted.py)]
* 格式化 [[format_input.py](https://github.com/itabas016/PythonTrip/blob/master/course_liao/function/format_input.py)]
* 装饰器 [[decorator.py](https://github.com/itabas016/PythonTrip/blob/master/course_liao/function/decorator.py)]
* 偏函数 [[partial_func.py](https://github.com/itabas016/PythonTrip/blob/master/course_liao/function/partial_func.py)]
* 高阶函数 - 迭代器 [[ex_iterator.py](https://github.com/itabas016/PythonTrip/blob/master/course_liao/advance/ex_iterator.py)]
* 高阶函数 - 生成器 [[ex_generator.py](https://github.com/itabas016/PythonTrip/blob/master/course_liao/advance/ex_generator.py)]
* 高阶函数 - 切片与列表 [[ex_slice.py](https://github.com/itabas016/PythonTrip/blob/master/course_liao/advance/ex_slice.py), [ex_list.py](https://github.com/itabas016/PythonTrip/blob/master/course_liao/advance/ex_list.py)]

#### Decorator ####

如上面的例子，装饰如果嵌套太多容易混。没有参数的装饰器比较容易理解，但是有参数的比如一个函数参数是一个返回函数然后这个函数返回结果做为参数传递给另一个函数。`Fun(A)(p1=Func(B)(p2=Func(C)(p3='')))`
装饰器函数也可以简单理解成闭包。
``` python
import functools

def log(text):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kw):
            print('%s %s():' % (text, func.__name__))
            return func(*args, **kw)
        return wrapper
    return decorator
```
### OOP ###

`Class`: [[ex_element.py](https://github.com/itabas016/PythonTrip/blob/master/course_liao/oop/ex_element.py)], `Instance`: [[ex_instance.py](https://github.com/itabas016/PythonTrip/blob/master/course_liao/oop/ex_instance.py)], `Property`: [[ex_property.py](https://github.com/itabas016/PythonTrip/blob/master/course_liao/oop/ex_property.py)]以及类的初始化，封装继承[[ex_extend.py](https://github.com/itabas016/PythonTrip/blob/master/course_liao/oop/ex_extend.py)]与多态。

**PS:** `__init__`初始化的第一个参数永远是`self`，表示创建的实例本身。如果属性的变量名是以`__`开头，那么这是一个私有(private)变量，只允许类内部访问。如果获取一个对象的所有属性和方法，使用`dir()`函数，判断对象是哪种类型使用`isinstance(object, Type)`

### IO(文件操作和序列化) ###

文件操作[operation_file.py](https://github.com/itabas016/PythonTrip/blob/master/course_liao/io/operation_file.py), 引入`with`的好处是默认调用`close`方法，因为实现`try...finally`语句块，无论文件操作出现任何异常最后都能关闭文件操作。

序列化简单用`pickle`模块[ex_pickle.py](https://github.com/itabas016/PythonTrip/blob/master/course_liao/io/ex_pickle.py)和`json`模块[ex_json.py](https://github.com/itabas016/PythonTrip/blob/master/course_liao/io/ex_json.py)

**PS:** `pickle`主要用于Python特定二进制格式之间的转换，`json`对象反序列化成`instance`对象，编写转换函数(见上述例子)即可实现。后面会介绍其它的反序列化方法。

### Thread(线程) ###

首先python的多线程多适用于`IO`密集型，如果是`CPU`密集型，python的多线程不如单线程效率高。如果在`CPU`密集型中使用`concurrent`需要导入`multiprocessing`库，这个库是基于`multi process`实现了类`multi thread`的API接口，并且用`pickle`部分地实现了变量共享。

基本用法：[[ex_thread.py](https://github.com/itabas016/PythonTrip/blob/master/course_liao/thread/ex_thread.py)]
进程：[[ex_process.py](https://github.com/itabas016/PythonTrip/blob/master/course_liao/thread/ex_process.py)]
队列及锁：[[ex_queue.py](https://github.com/itabas016/PythonTrip/blob/master/course_liao/thread/ex_queue.py), [ex_lock.py](https://github.com/itabas016/PythonTrip/blob/master/course_liao/thread/ex_lock.py)]
分布式进程：[[task_master.py](https://github.com/itabas016/PythonTrip/blob/master/course_liao/thread/task_master.py), [task_worker.py](https://github.com/itabas016/PythonTrip/blob/master/course_liao/thread/task_worker.py)]

### Async(异步) ###

异步`IO`的核心是协程(Coroutine)，协程没有线程的安全问题，一个进程可以同时存在多个协程，但同时只有一个协程是激活的，而且协程的激活和休眠又通过程序来控制，而不是操作系统控制的。
并且最大的优势就是协程极高的执行效率。因为子程序切换不是线程切换，因此没有线程切换的开销，和多线程比线程数量越多，协程的性能优势就越明显。
第二大优势就是不需要多线程的锁机制，因为只有一个线程，也不存在同时写变量冲突，在协程中控制共享资源不加锁，只需要判断状态就好了，所以执行效率比多线程高很多。

通常用法是多进程+协程，生产者-消费者模型：[[coroutine.py](https://github.com/itabas016/PythonTrip/blob/master/course_liao/async/coroutine.py)]

`asynicio`类库是python3.4支持异步IO的标准库。教程里有两个简单例子[[async_hello.py](https://github.com/itabas016/PythonTrip/blob/master/course_liao/async/async_hello.py), [async_wget.py](https://github.com/itabas016/PythonTrip/blob/master/course_liao/async/async_wget.py)]需要重点理解下`@asyncio.coroutine`, 另外在python3.5后引入了`async`和`await`等价于`@asyncio.coroutine <=> async`, `yield from <=> await`

线程和异步这一块，看的时候就头大，后面还会再研究~

References:
[A Curious Course on Coroutines and Concurrency](http://www.dabeaz.com/coroutines/index.html)
[python多线程](http://www.jianshu.com/p/0e4ff7c856d3)
[为什么有人说 Python 的多线程是鸡肋呢？](https://www.zhihu.com/question/23474039)
