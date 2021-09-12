const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Users = require('../models/user')
const bcrypt = require('bcryptjs');

const SignUpRouter = express.Router();
SignUpRouter.route('/')
.post((req,res)=>{
    const {email ,username , password} = req.body; 
    if(!email||!username||!password){
        return res.status(422).json({error:'Fill each Detail'});
    }
    Users.findOne({email:email})
    .then((savedperson)=>{
        if(savedperson)
        return res.status(422).json({error:'User Already Exists!'});
        bcrypt.hash(password,12).then((hasedpass)=>{
        const user = new Users({
            email,username,
            password:hasedpass
        });
        user.save()
        .then((user)=>{
            res.status(200).json({message:'Saved Successfully , Now Login to Continue'});
        })
        .catch((err)=>{
            console.log('Error in Saving the Details, Please try again',err)
            res
              .status(400)
              .json({ error: 'Error in Saving the Details, Please try again' });
        })
        })
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports = SignUpRouter;