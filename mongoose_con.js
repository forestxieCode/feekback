var mongoose = require('mongoose'),
    DB_URL = 'mongodb://localhost/student';

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


Schema = mongoose.Schema;


var StudentSchema = new Schema({          
    name : { type: String },              
    age : {type: Number},                        
    class: {type: Number},
    studyNum:{type:String}
});
module.exports=mongoose.model('Student',StudentSchema);




