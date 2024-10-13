const express=require('express');

const router=express.Router();


const bcrypt=require('bcrypt');

const jwt=require('jsonwebtoken')

const Employee = require('../models/employee.js');



//------------udapet Profile----------------------

router.put('/updateprofile/:id',async(req,res)=>{
    try {
        data=req.body
        id=req.params.id
        salt=bcrypt.genSaltSync(15);
        cryptedpass=bcrypt.hashSync(data.password,salt);
        data.password=cryptedpass;
        updated=await Employee.findByIdAndUpdate({_id:id},data)
        res.status(200).send(updated)
    }
    catch (error) {   
        res.status(400).send(error)
    }
})

//------------register---------------------------
router.post('/register',async(req,res)=>{

    data=req.body
    emp=new Employee(data)
    salt=bcrypt.genSaltSync(15);
    cryptedpass=await bcrypt.hashSync(data.password,salt);

    emp.password=cryptedpass;
    emp.save()
    .then(
        (savedemp)=>{
            res.status(200).send(savedemp)
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )
})

//-----------------login--------------
router.post('/login',async(req,res)=>{
    
    data=req.body
    emp=await Employee.findOne({email:data.email});

    if(!emp){
        res.status(404).send("invalid email ")
    }
    else{
        validpass=bcrypt.compareSync(data.password,emp.password)

        if(!validpass){
            res.status(401).send("invalid  password")
        }
        else{
            payload={
                _id:emp._id,
                email:emp.email,
                name:emp.name,
                lastname:emp.lastname,
                gender:emp.gender,
                role:emp.role,
                phone:emp.phone,
                job:emp.job,
                leave_type:emp.leave_type,
                leave_start:emp.leave_start,
                leave_end:emp.leave_end,
                leaveDecision:emp.leaveDecision
            }   
            token=jwt.sign(payload,'1234567')

            res.status(200).send({mytoken:token})
        }
    }
    
})

router.post('/addemployee',async(req,res)=>{
    try {
        data=req.body;
        emp=new Employee(data);
        savedemp=await emp.save();
        res.status(200).send(savedemp);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.get('/getemployeebyid/:id',async(req,res)=>{
    try {
        id=req.params.id
        emp=await Employee.findById({_id:id})
        res.status(200).send(emp)
    } catch (error) {
        res.status(400).send(error)
    }



})

router.put('/updateemployee/:id',async(req,res)=>{
    try {
        data=req.body
        id=req.params.id
        updated=await Employee.findByIdAndUpdate({_id:id},data)
        res.status(200).send(updated)
    }
    catch (error) {   
        res.status(400).send(error)
    }
})



router.delete('/deleteemployee/:id',async(req,res)=>{
    try {
        const id=req.params.id;
        const deletedemp=await Employee.findByIdAndDelete({_id:id})
        res.status(200).send(deletedemp)
    } catch (error) {
        res.status(400).send(error);
    }

})


router.get('/getallemployees',async(req,res)=>{
    try {
        employees=await Employee.find()
        res.send(employees)
    } catch (error) {
        res.status(400).send(error);
    }

})





module.exports=router;