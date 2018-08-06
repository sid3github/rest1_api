const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Emp = require('./models/employees');


const server = express();

mongoose.connect('mongodb://localhost/empgo');

server.use(bodyParser.json());

server.get('/',function(req,res){
    Emp.find({},function(err,data){
        if(err){
            throw err;
        }
        res.json(data);
    });
});
server.post('/',function(req,res){
    let user = new Emp();
    user.name = req.body.name;
    user.age = req.body.age;
    user.gender = req.body.gender;

    user.save(function(err){
        if(err){
            throw err;
        }
        res.json(user);
    });
});
server.put('/:id',function(req,res){
    Emp.findById(req.params.id,function(err,user){
        if(err){
            throw err;
        }
        user.name = req.body.name;
        user.age = req.body.age;
        user.gender = req.body.gender;

        user.save(function(err,user){
            if(err){
                throw err;
            }
            res.json(user);
        });
    });
});
server.delete('/:id',function(req,res){
    Emp.findByIdAndRemove(req.params.id,function(err,user){
        if(err){
            throw err;
        }
        res.json(user);
    });
});



server.listen(2001, function () {
    console.log('the port is running on 2001');
});















