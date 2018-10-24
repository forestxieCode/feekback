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
学生查找
 */
exports.student_find = function(num,callback){
	rederFIle(function(error,data){
		if(error){
	 		return callback(error)
	 	}
	 	var reader_Student=JSON.parse(data); 
	 	reader_Student.info.forEach(function(elemnt,index){
	 			if(elemnt.num===num){
	 				return callback(null,elemnt);
	 			}
	 	}) 
 })
}





/*
学生的修改
 */
exports.student_change = function(callback){



}


