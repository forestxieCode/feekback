# Nodejs使用方法

### exports 导出 

### module.exports 导出

```javascript
/dog.js
 var dog={
	color:'red',
	kind:'哈士奇'
	eat:function(){
		console.log('eat meet')；
	}
}

exports=module.exports=dog;

- 导入
  var dog = require('./dog.js')
  dog.eat()


```



## 读取文件



- nodejs---readFile函数

```javascript
var http = require('http')
var fs = require('fs')

var server = http.createServer()
var wwwDir = 'D:/Movie/www'
server.on('request', function (req, res) {
  var url = req.url
  var filePath = '/index.html'
  if (url !== '/') {
    filePath = url
  }
  fs.readFile(wwwDir + filePath, function (err, data) {
    if (err) {
      return res.end('404 Not Found.')
    }
    res.end(data)
  })
})
// 3. 绑定端口号，启动服务
server.listen(3000, function () {
  console.log('running...')
})



```

- nodejs -- writeFile函数

  

  ```javascript
  var fs = require('fs'); // 引入fs模块
   
  // 写入文件内容（如果文件不存在会创建一个文件）
  // 传递了追加参数 { 'flag': 'a' }
  fs.writeFile('./try4.txt', 'HelloWorld', { 'flag': 'a' }, function(err) {
      if (err) {
          throw err;
      }
   
      console.log('Hello.');
   
      // 写入成功后读取测试
      fs.readFile('./try4.txt', 'utf-8', function(err, data) {
          if (err) {
              throw err;
          }
          console.log(data);
      });
  });
  ```

  

  

  









# Express  

### 1. instal  art-template模板

```shell
npm install --save art-template
npm install --save express-art-template
```

2.Example

```javascript
var express = require('express');

var app = express();
//参数一：是以什么文件的后缀名的文件，进行渲染
app.engine('html', require('express-art-template'));

app.set('views',express.static(path.join('__dirname','./views/')))//修改express默认的目录


//在express-art-template的模板中和nodejs协商默认文件夹为views，渲染这个文件夹下的资源可以不写文件夹的路径，可以直接写要渲染的文件，也可以自定义默认文件，指令如下：

app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});

app.get('/', function (req, res) {
    //渲染文件的方法：render
    res.render('index.html', {
        user: {
            name: 'aui',
            tags: ['art', 'template', 'nodejs']

        }

    });

});

```





3.获取？后面的数据

```javascript
app.get('/pinglun',function(req,res){
	dataBuff.unshift(req.query);
	res.redirect('/');
})

```



###  2. express中获取post数据 

在express中无法获取post请求的数据，需要借助第三方插件



```shell
npm install --save body-parser
```



配置：

```javascript
var express = require('express')
//0.引包
var bodyParser = require('body-parser')
var  app = express()

//配置body-parser
//只要加这个配置，则在req请求对象上多出来一个属性：body
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(function(req,res){
    res.setHeader('Contect-Type','text/plain')
    res.write('you post:\n')
    res.end(JSON.stringify(req.body,null,2))//获取post数据
})

```



### 3. Express static file 开放资源	

```javascript
var express = require('express')
var app = express
//方式一：访问直接访问需要的文件的名字，不需要写文件在那么文件的路径
app.use(express.static('./public/'))
//方式二：开放访问public文件下的资源文件，访问方式/public/资源文件
app.use('/public',express.static('./public/'))
//方式三:开放访问public文件下的资源文件，访问方式/abc别命访问public文件下的资源
app.use('/abc',express.static('./puiblic/'))

```



### PATH路径操作模块

- path.basename

  - 获取文件的的名包括扩展名

- path.dirname

  - 获取目录名

- path.extname

  - 获取扩展名

- path.parse

  - 解析文件路径转为对象，其中包括文件夹，文件名，扩展名

  - 格式

    - root 根目录

    - dir目录

    - base包含后缀名的文件名

    - ext后缀名

    - name不包含后缀名的文件名

      

- path.join

  - 拼接文件路径，将自动转为c://a//a.txt的格式

- path.isAbsolut

  - 判断是否是绝对路径

## Node中的其他成员

在每个模块中，除了`require`、`exports`等模块相关

还有两个特殊的成员

- `__dirname`可以用来获取当前文件模块所目录的绝对路径

- `__dirfilename`可以用来获取当前文件的绝对路径

  











# Express router 的简单使用方法

```javascript
var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', function (req, res) {
  res.send('Birds home page')
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router


```

### 使用router

```javascript
var birds = require('./birds')

// ...
//以/birds开头的路径使用router中的请求方式
//如果不写将某人以请求地址的路径请求
app.use('/birds', birds)
```



# express-session的基本使用

- 安装包`npm install express-session`

```javascript
//引入express-session包
var session = require('express-session');



app.use(session({
  secret: 'keyboard cat',//session外加的验证
  resave: false,
  saveUninitialized: true
}))
```



```javascript
router.post('/login',function(req,res){
	var body = req.body;
	body.password=md5(md5(body.password));
	User.find(body,function(error,data){
			if(error){
				res.status(200).json({
					err_code:1,
					message:error
				})	
			}
			req.session.user=data;//存储key为session的类
        	//req.session.user     //取为user的session的类，没有为undfind
			res.status(200).json({err_code:0,message:'login success'})
	})

})
```















# 案例

###  请求方式列表：

| 请求地址      | 请求方式 | 请求参数                   |
| ------------- | -------- | -------------------------- |
| /student/find | get      | 无                         |
| /student/add  | post     | 学生序号、年龄、姓名、学号 |
| /student/del  | get      |                            |
| /student/edit | post     | 学生序号、年龄、姓名、学号 |
|               |          |                            |
|               |          |                            |



### app模块

```javascript
var express = require('express');
var app = express();
var fs=require('fs');
var router=require('./router');
var bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/public/',express.static('./public/'));
app.use('/node_modules/',express.static('./node_modules/'));

app.engine('html',require('express-art-template'))

app.use(router);

app.listen(3000,function(){
	console.log('nodejs server start port:3000');
})

   
```

### student_file 模块

```javascript
var fs = require('fs');

var dir='./db.json';

Array.prototype.remove=function(obj){
for(var i =0;i <this.length;i++){
var temp = this[i];
if(!isNaN(obj)){
temp=i;
}
if(temp == obj){
for(var j = i;j <this.length;j++){
this[j]=this[j+1];
}
this.length = this.length-1;
}
}
}


var rederFIle= function(callback){
	fs.readFile(dir,'utf-8',function(error,data){
	 	if(error){
	 		return callback(error);
	 	}
	 	callback(null,data);
	 })
}

/*
学生的显示
 */
exports.student_show = function(callback){
	fs.readFile(dir,'utf-8',function(error,data){
	 	if(error){
	 		return callback(error);
	 	}
	 	callback(null,data);
	 })
}
/*
学生的增加
 */


exports.student_add = function(students,callback){

	 rederFIle(function(error,data){
	 	if(error){
	 		return callback(error)
	 	}
	 	var reader_Student=JSON.parse(data);
	 	
	 	students.num=reader_Student.info.length+1;
	 
	 	var is_exist=reader_Student.info.find(function(element){
	 		return 	element.num===students.num;
	 	})
	 	if(is_exist){
	 		return callback('用户存在',null);
	 	}
	 	reader_Student.info.unshift(students);
	 	fs.writeFile(dir,JSON.stringify(reader_Student),function(error){
	 		callback(error,null);
	 	})
	 });
}
/*
学生的删除
 */
exports.student_del = function(num,callback){
	rederFIle(function(error,data){
		if(error){
	 		return callback(error)
	 	}
	 	var reader_Student=JSON.parse(data); 
	 	reader_Student.info.forEach(function(elemnt,index){
	 			if(elemnt.num===num){
	 				reader_Student.info.remove(index);
	 			}
	 	})
	 	fs.writeFile(dir,JSON.stringify(reader_Student),function(error){
	 		callback(error,null);
	 	})

	})
}

/*
学生的更改
 */
exports.student_change = function(callback){

}



```



### router 模块

```javascript
var express=require('express')
var fs=require('fs');
var student=require('./student_File')
var router =express.Router();
/*

	加载student
	
 */
router.get('/student',function(req,res){
		student.student_show(function(error,data){
			if(error){
				return res.status(500).send('读取文件错误！');
			}
			res.render('index.html',JSON.parse(data.toString()))
		}) 	
})

/*

	添加学生信息

 */
router.get('/student/add',function(req,res){
	res.render('add.html',)
})

/*
	提交数据
 */
router.post('/student/add',function(req,res){
	student.student_add(req.body,function(error,data){
		if(error){
			return res.status(500).send('文件操作错误');
		}
		res.redirect('/student');
	})
})

/*
	删除

 */
router.get('/student/del',function(req,res){
	var num=parseInt(req.query.num);
	student.student_del(num,function(error,data){
		if(error){
					return res.status(500).send('文件操作错误');
				}
				res.redirect('/student');
			})
})
/*
	修改
 */
router.post('/student/edit',function(req,res){
	

})


module.exports=router;


```





#  nodejs/javascripit异步操作



异步操作有：setTime  rendFile  writeFile  ajax 

```javascript
function add(x,y){
    console.log(1)
    setTimeout(function(){
        console.log(2)
      return   ret= x +y;
    })
    console.log(3)
}


add(1,2)
输出的结果:
	1 
	3
	undfined
    2
```

- 回调：

```javascript
function add(x,y,callback){
    console.log(1)
    setTimeout(function(){
        callback(x+y);
    })
    console.log(3)
}

add(1,2,function(a){
    console.log(a)
    
})

```



## 查找数组中指定的元素

```javascript
var buff=[
	{
		id:1,
		name:"王明"
	},
	{
		id:2,
		name:"小明"
	},
	{
		id:3,
		name:"王八"
	}
]
Array.prototype.findso=function(condition){
	for(var i=0;i<this.length;i++){
		if(condition(this[i].id))
		{
			return this[i];
		}

	}

}
console.log(buff.findso(function(id){
	return id==2;
}))


```



​	

# Mongodb

```shell
mongodb地址：mongodb.org

# mongodb 默认使用执行 mongod命令所处盘符跟目录下的/data/db作为自己的数据存储目录
# 所有在第一次执行该命令之前先自动手动新建一个/data/db
```

如果向修改默认的数据存储目录，可以:

mongod --dbpath = 数据存储目录路径

停止:

```shell
1. 在开启服务的控制台，直接Ctrl+c即可停止
2. 或者直接关闭开启服务的控制台也可也

```

###  连接数据库

```shell
mongo 即可连接本机的mongodb服务

```

### 基本命令

- `show dbs`
  - 查看显示所有的数据库

- `db`
  - 查看当前操作的数据库

- `use 数据库名称`
  - 切换到指定的数据（如果没有会新建）

- 插入一条数据

  ```she
  use myNewDatabase
  db.collection.insertOne( { x: 1 } );
  ```

- 查看所有的数据

  ```she
  db.collection().find()
  
  ```

  



# mongoose

详细的资料：https://www.cnblogs.com/zhongweiv/p/mongoose.html

### mongoose 安装

- ` npm install mongoose` 
- 导入` require('mongoose')`

### 连接字符

``` javascript
var mongoose = require('mongoose'),
    DB_URL = 'mongodb://localhost:27017/mongoosesample';

/**
 * 连接
 */
mongoose.connect(DB_URL);

/**
  * 连接成功
  */
mongoose.connection.on('connected', function () {    
    console.log('Mongoose connection open to ' + DB_URL);  
});    

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
});    
 
/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
});
```



### schema

- schema是mongoose里会用到的一种数据模式，可以理解为表结构的定义；每个schema会映射到mongodb中的一个collection，它不具备操作数据库的能力

  　

```javascript
var mongoose = require('mongoose'),
    DB_URL = 'mongodb://localhost:27017/mongoosesample';

/**
 * 连接
 */
mongoose.connect(DB_URL);

/**
  * 连接成功
  */
mongoose.connection.on('connected', function () {    
    console.log('Mongoose connection open to ' + DB_URL);  
});    

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
});    
 
/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
});    

module.exports = mongoose;
```



定义一个user的Schema，命名为user.js 

```javascript
/**
 * 用户信息
 */
var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({          
    username : { type: String },                    //用户账号
    userpwd: {type: String},                        //密码
    userage: {type: Number},                        //年龄
    logindate : { type: Date}                       //最近登录时间
});

module.exports = mongoose.model('User',UserSchema);

```



### schema 字符类型

```shell
Schema Types内置类型如下：

　　String

　　Number

　　Boolean | Bool

　　Array

　　Buffer

　　Date

　　ObjectId | Oid

　　Mixed
　　
```



### 添加insert

```javascript
var User = require("./user.js");

/**
 * 插入
 */
function insert() {
 
    var user = new User({
        username : 'Tracy McGrady',                 //用户账号
        userpwd: 'abcd',                            //密码
        userage: 37,                                //年龄
        logindate : new Date()                      //最近登录时间
    });

    user.save(function (err, res) {

        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }

    });
}

insert();
```



### update更新

```javascript
var User = require("./user.js");

function update(){
    var wherestr = {'username' : 'Tracy McGrady'};
    var updatestr = {'userpwd': 'zzzz'};
    
    User.update(wherestr, updatestr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

update();
```



### findByIdAndUpdate

```javascript
var User = require("./user.js");

function findByIdAndUpdate(){
    var id = '56f2558b2dd74855a345edb2';
    var updatestr = {'userpwd': 'abcd'};
    
    User.findByIdAndUpdate(id, updatestr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

findByIdAndUpdate();

　其它更新方法
Model.findOneAndUpdate([conditions], [update], [options], [callback])　　
```



### remove删除	

```javascript
var User = require("./user.js");

function del(){
    var wherestr = {'username' : 'Tracy McGrady'};
    
    User.remove(wherestr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

del();
```

```javascript
其他删除文件
Model.findByIdAndRemove(id, [options], [callback])　　　　　　
Model.findOneAndRemove(conditions, [options], [callback])
```



### 条件查询

```javascript
var User = require("./user.js");

function getByConditions(){
    var wherestr = {'username' : 'Tracy McGrady'};
    
    User.find(wherestr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

getByConditions();
```



```javascript
var User = require("./user.js");

function getByConditions(){
    var wherestr = {'username' : 'Tracy McGrady'};
    var opt = {"username": 1 ,"_id": 0};
    
    User.find(wherestr, opt, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

getByConditions();
```



- 输出只会有username字段，设置方法如上，1表示查询输出该字段，0表示不输出比如我要查询年龄范围条件应该怎么写呢？

  *User.find({userage: {$gte: 21, $lte: 65}}, callback);*    //这表示查询年龄大于等21而且小于等于65岁

   

其实类似的还有：　

　　$or　　　　或关系

　　$nor　　　 或关系取反

　　$gt　　　　大于

　　$gte　　　 大于等于

　　$lt　　　　 小于

　　$lte　　　  小于等于

　　$ne            不等于

　　$in             在多个值范围内

　　$nin           不在多个值范围内

　　$all            匹配数组中多个值

　　$regex　　正则，用于模糊查询

　　$size　　　匹配数组大小

　　$maxDistance　　范围查询，距离（基于LBS）

　　$mod　　   取模运算

　　$near　　　邻域查询，查询附近的位置（基于LBS）

　　$exists　　  字段是否存在

　　$elemMatch　　匹配内数组内的元素

　　$within　　范围查询（基于LBS）

　　$box　　　 范围查询，矩形范围（基于LBS）

　　$center       范围醒询，圆形范围（基于LBS）

　　$centerSphere　　范围查询，球形范围（基于LBS）

　　$slice　　　　查询字段集合中的元素（比如从第几个之后，第N到第M个元素）

### 数量查询

- Model.count(conditions, [callback])

```javascript
var User = require("./user.js");

function getCountByConditions(){
    var wherestr = {};
    
    User.count(wherestr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}
getCountByConditions();
　　

也可以传入条件做条件查询！
```



###  **根据_id查询**

　　- Model.findById(id, [fields], [options], [callback])*　　

```javascript
var User = require("./user.js");

function getById(){
    var id = '56f261fb448779caa359cb73';
    
    User.findById(id, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

getById();
```



### **模糊查询** 

```javascript
var User = require("./user.js");

function getByRegex(){
    var whereStr = {'username':{$regex:/m/i}};
    
    User.find(whereStr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

getByRegex();
```



### **分页查询** 

``` javascript
var User = require("./user.js");

function getByPager(){
    
    var pageSize = 5;                   //一页多少条
    var currentPage = 1;                //当前第几页
    var sort = {'logindate':-1};        //排序（按登录时间倒序）
    var condition = {};                 //条件
    var skipnum = (currentPage - 1) * pageSize;   //跳过数
    
    User.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec(function (err, res) {
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

getByPager();
```

### 　**索引和默认值**

　-  再看看我对user.js这个schema的修改

```javascript
/**
 * 用户信息
 */
var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({          
    username : { type: String , index: true},                    //用户账号
    userpwd: {type: String},                        //密码
    userage: {type: Number},                        //年龄
    logindate : { type: Date, default:Date.now}                       //最近登录时间
});

module.exports = mongoose.model('User',UserSchema);
```



```shell
其它常用方法
Model.distinct(field, [conditions], [callback])　　　　　　　　　　　　　　　　　　//去重
Model.findOne(conditions, [fields], [options], [callback])　　　　　　　　　　　　 //查找一条记录
Model.findOneAndRemove(conditions, [options], [callback])　　　　　　　　　　 //查找一条记录并删除
Model.findOneAndUpdate([conditions], [update], [options], [callback])　　　　 //查找一条记录并更新
```











# 快速入门mysql

- 导入`mysql` 包
- 快速测试
- nodejs中mysql支持原生sql语句操作



```javascript
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'me',
  password : 'secret',
  database : 'my_db'
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 
connection.end();
```









设置接口



| 请求方式 | 请求地址  | 请求参数           |
| -------- | --------- | ------------------ |
| get      | /login    | 无                 |
| post     | /post     | username、password |
| get      | /register | 无                 |
| post     | /register | 用户名、密码、     |















