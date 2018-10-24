var Student = require('./mongoose_con.js');
var express = require('express')

// 1. 创建一个路由容器
var router = express.Router()
/*
	加载student
 */
router.get('/student',function(req,res){
		Student.find(function(error,students){
			if(error){
				return res.status(500).send('读取文件错误！');
			}
			console.log(students);
			res.render('index.html',{students:students})	
		}) 	
})

/*
	添加学生信息
 */
router.get('/student/add',function(req,res){
	res.render('add.html')
})

/*
	提交数据
 */
router.post('/student/add',function(req,res){
	new Student(req.body).save(function(error,data){
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
	var id={_id:req.query.num.replace(/"/g,'')}
	Student.remove(id,function(error,data){
		if(error){
				return res.status(500).send('文件操作错误');
				}
				res.redirect('/student');
			})
})

/*
	查
 */
router.get('/student/find',function(req,res){
	var id=req.query.num.replace(/"/g,'');
	Student.findById(id,function(error,student){
		if(error){
			return res.status(500).send('文件操作错误');
		}
		console.log(student);
		res.render('edit.html',{students:student});
	})
})

/*
	修改
 */
router.post('/student/edit',function(req,res){
	var id=req.body.id.replace(/"/g,'');
	Student.findByIdAndUpdate(id,req.body,function(error,student){
		if(error){
			return res.status(500).send('文件操作错误');
		}
		res.redirect('/student');
	})
})
module.exports=router;

