const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Users = require('../models/user');

module.exports = (req, res, next)=>{
    const { token } = req.cookies;
    console.log(req);
    if(!token)
    return res.status(401).json({error:"Already logged in 1"});

    jwt.verify(token,process.env.JWT_SECRET,(err,payload)=>{
        if(err)
        return res.status(401).json({error:"Already logged in 2"});
        
        const {_id} = payload;
        Users.findById(_id).then(userdata =>{
            req.user = userdata;
            
        })
        .then(()=>next());

    })

}