const mongoose=require('mongoose');


const Employee=mongoose.model('Employee',{
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true,
        enum: ['Male', 'Female',null],
        default: null
    },
    role:{
        type: String,
        default: 'employee',
        enum: ['admin', 'employee'],
    },
    job:{
        type:String,
        required:true
    },
    leave_type:{
        type:String
    },
    leave_start:{
        type:Date
    },
    leave_end:{
        type:Date
    },
        leaveDecision: {
        type: String,
        enum: ['approved', 'declined', null],
        default: null
    }

    
});




module.exports=Employee;