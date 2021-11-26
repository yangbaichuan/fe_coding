function PromiseA(callback) {
  // 1. 参数校验
  if (!callback) throw new Error('callback is required!');
  var self = this;
  // 2. 定义状态 pendding, resolved, rejected
  this.status = 'pendding';

  // 4.2 成功或失败数据需要存储
  this.resolveData = undefined;
  this.rejectData = undefined;

  // 6.2 补充队列字段
  this.queues = [];

  // 8.4 补充异常队列
  this.rejectedQueues = [];

  // 4.1 callback需要两个参数，此处定义
  function resolve(data) {
    self.resolveData = data;
    self.status = 'resolved';
    // 6.3 补充队列逻辑
    if (self.queues.length) {
      // 10.1 添加bind方法改变函数this指向，让this指向具体实例
      for (var i = 0; i < self.queues.length; i++) {
        var func = self.queues[i].bind(self);
        func();
      }
    }
  }
  function reject(data) {
    self.rejectData = data;
    self.status = 'rejected';
    // 8.5 补充异常队列逻辑
    if (self.rejectedQueues.length) {
      // 10.2 添加bind方法改变函数this指向，让this指向具体实例
      for (var i = 0; i < self.rejectedQueues.length; i++) {
        var func = self.rejectedQueues[i].bind(self);
        func();
      }
    } else if (self.queues) {
      for (var i = 0; i < self.queues.length; i++) {
        var func = self.queues[i].bind(self);
        func();
      }
    }
  }

  // 3. 执行promise，注意同步代码可能会报错，需主动捕获错误
  try {
    callback(resolve, reject)
  } catch(err) {
    reject(err)
  }
}

// 5. 原型挂载then方法
PromiseA.prototype.then = function (resolve, reject) {
  // 6. 添加pendding状态判断
  if (this.status === 'pendding') {
    this.queues.push(function () {
      // 10.3 删除原来定义的self，当前函数的this指向的就是实例，为了防止和外层混淆，定义新的self
      var self = this;
      if (self.status === 'resolved') {
        // 9.1 resolve会返回新的Promise，在此接收
        var result = resolve(self.resolveData)
        if (result) {
          // 10.4 resolve执行完成后，修改状态为pendding，防止后续then输出
          self.status = 'pendding';
          // 10.5 继承父级回调，删除父级回调，防止继续调用
          result.queues = self.queues.slice(1)
          self.queues.splice(1, self.queues.length)
          result.rejectedQueues = self.rejectedQueues
          // 9.2 判断resolve中promise的执行状态
          if (result.status === 'resolved') {
            // 9.3 若为成功，修改状态数据进入下一个链
            self.status = 'resolved';
            self.resolveData = result.resolveData;
          } else if (result.status === 'rejected') {
            // 9.4 若为异常，需检测是否有异常队列并执行异常队列的方法
            self.status = 'rejected';
            self.rejectData = result.rejectData;
            if (self.rejectedQueues.length) {
              self.rejectedQueues.forEach(fn => fn.bind(result)());
            }
          }
        }
      } else if (self.status === 'rejected' && reject) {
        // 8.1 完善队列判断
        reject(self.rejectData)
      }
      // 10.6 执行下一Promise的队列
      if (result && result.queues) {
        for (var i = 0; i < result.queues.length; i++) {
          var func = result.queues[i].bind(self);
          func();
        }
      }
    })
    return this;
  } else if (this.status === 'resolved') {
    resolve(this.resolveData)
  } else if (this.status === 'rejected' && reject) {
    // 7.1 完善判断
    reject(this.rejectData)
  } else {
    // 7.2 链调用需要导出自身
    return this;
  }
}

// 7.3 补充catch原型方法
PromiseA.prototype.catch = function (reject) {
  // 8.2 完善异常判断
  if (this.status === 'pendding') {
    // 8.3 补充异常队列
    this.rejectedQueues.push(function () {
      // 10.7 删除原来定义的self，当前函数的this指向的就是实例，为了防止和外层混淆，定义新的self
      var self = this;
      if (self.status === 'rejected' && reject) {
        reject(self.rejectData)
      }
    })
  } else if (this.status === 'rejected') {
    reject(this.rejectData)
  }
}

// 测试用例1
new PromiseA(function (resolve, reject) {
  reject(1)
}).then(res => {
  console.log('成功' + res);
}, err => {
  console.log('失败' + err);
});

// 测试用例2
new PromiseA(function (resolve, reject) {
  setTimeout(function (){
    reject(2)
  }, 1000)
}).then(res => {
  console.log('成功' + res);
}, err => {
  console.log('失败' + err);
});

// 测试用例3
new PromiseA(function (resolve, reject) {
  reject(3)
}).then(res => {
  console.log('成功' + res);
}).catch(err => {
  console.log('失败' + err);
});

// 测试用例4
new PromiseA(function (resolve, reject) {
  setTimeout(function (){
    reject(4)
  }, 1000)
}).then(res => {
  console.log('成功' + res);
}).catch(err => {
  console.log('失败' + err);
});

// 测试用例5
new PromiseA(function (resolve, reject) {
  setTimeout(function (){
    resolve(5)
  }, 1000)
}).then(res => {
  console.log('成功' + res);
  return new PromiseA((resolve, reject) => {
    resolve(6)
  })
}).then(res => {
  console.log('成功' + res);
  return new PromiseA((resolve, reject) => {
    reject(7)
  })
}).then(res => {
  console.log('成功' + res);
}).catch(err => {
  console.log('失败' + err);
});

// 测试用例6
new PromiseA(function (resolve, reject) {
  setTimeout(function (){
    resolve(8)
  }, 1000)
}).then(res => {
  console.log('成功' + res);
  return new PromiseA((resolve, reject) => {
    setTimeout(function (){
      resolve(9)
    }, 1000)
  })
}).then(res => {
  console.log('成功' + res);
  return new PromiseA((resolve, reject) => {
    reject(10)
  })
}).then(res => {
  console.log('成功' + res);
}).catch(err => {
  console.log('失败' + err);
});
