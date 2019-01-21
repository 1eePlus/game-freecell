import _ from 'lodash';

//lodash常用方法
// 1. _.reject 根据条件去除某个元素
var foo = [
    { id: 0, name: "aaa", age: 33 },
    { id: 1, name: "bbb", age: 25 }
]
var bar = _.reject(foo, ['id', 0])
//bar = [{id: 1, name: "bbb", age: 25}]


// 2. _.pick 筛选出对应字段
var foo = { id: 0, name: "aaa", age: 33 }
var bar = _.pick(foo, ['name', 'age'])
//bar = {name: "aaa", age: 33}


// 3. _.keys 筛出对象中所有的key
var foo = { id: 0, name: "aaa", age: 33 }
var bar = _.keys(foo)
//bar = ['id', 'name', 'age']


// 4. _.cloneDeep 深度拷贝
// var bar = _.cloneDeep(foo)


// 5. _.find 查找数组
var foo = [
    { id: 0, name: "aaa", age: 33 },
    { id: 1, name: "bbb", age: 25 }
]
var bar = _.find(foo, ['id', 0])
//bar = {id: 0, name: "aaa", age: 33}


// 6. _.keyBy 以某个属性为键，将数组转为对象
var foo = var foo = [
    { id: 0, name: "aaa", age: 33 },
    { id: 1, name: "bbb", age: 25 }
]
var bar = _.keyBy(foo, 'name')
//bar = {
//    aaa: {id: 0, name: "aaa", age: 33},
//    bbb: {id: 1, name: "bbb", age: 25}
//}


// 7. _.filter 根据条件过滤出符合条件的元素，返回新数组
var foo = var foo = [
    { id: 0, name: "aaa", age: 33 },
    { id: 1, name: "bbb", age: 25 }
]
var bar = _.filter(foo, ['name', "aaa"])
//bar = {
//    aaa: {id: 0, name: "aaa", age: 33}
//}