var Student = require('./mongoose_con.js');

//查找
exports.find=function(callback){
	 Student.find(function(err, res){
        if (err) {
            callback(err,res);
        }
        else {
           callback(err,res);
        }
    })
}
//添加
exports.insert=function(data){
    var student = new Student(data);
    student.save(function (err, res) {
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }

    });

}

//更新
exports.update=function(wherestr,updatestr){
    Student.update(wherestr, updatestr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })

}



