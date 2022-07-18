import User from "../models/UserModel.js";
import session from "express-session";
import bcrypt from "bcrypt";
const store= new session.MemoryStore();
const saltRounds =10;

export const saveUser = async(req,res)=>{
    // console.log(req.body);
    const name = req.body.name;
    const password = req.body.password;
    if(name!='' && password!=''){
    try {
        const reso = await User.create({
            name: name,
            password: password,
        });
        res.status(201).json({msg:"val = ", reso});
    } catch (error) {
        console.log(error.message);
    }
    }
    else{
        console.log("masukkan nama dan password");
    }
}

export const loginUser = async(req,res)=>{
    const name = req.body.name;
    const password = req.body.password;
    try {
        const ada= await User.findAll({
            where:{
                name: name,
                password: password
            }
        });
        if(ada.length>0){
            res.cookie('session_id', '345');
            // console.log(ada);
            res.status(201).json(ada);            
        }
        else{
            res.status(202).json({msg:"user tidak ditemukan"});
        }
    } catch (error) {
        console.log(error.message);
    }
}

export const loginUser2 = async(req,res)=>{
    console.log(req.sessionID);
    const {name, password} = req.body;
    if(name && password){
        if(req.session.authenticated){
            res.json(req.session);
        }
        else{
            if(password==='123'){
                req.session.authenticated=true;
                req.session.user={
                    name, password
                }
                res.json(req.session);
            }
            else{
                res.status(401).json({msg:'bad cridential'});
            }
        }
    }
    else{
        res.status(401).json({msg:'bad cridential'});
    }
    // res.status(200).json(req.sessionID);
}

export const saveUser2 = async(req,res)=>{
    const {name, password} = req.body;
    bcrypt.hash(password,saltRounds,async(err, hash)=>{
        try {
            const reso = await User.create({
                name: name,
                password: hash
            });
            res.status(201).json({msg:"val = ", reso});            
        } catch (err) {
            console.log(err.message);
        }
    })
}

export const loginUser4G = async(req,res)=>{
    if(req.session.user){
        res.send({loggedIn:true, user:req.session.user});        
    }
    else{
        res.send({loggedIn:false});
    }
}

export const loginUser3 = async(req,res)=>{
    const {name, password} = req.body;
    if(name && password){
        const log = await User.findAll({
            where:{
                name: name
            }
        });
        if(log.length>0){
            bcrypt.compare(password,log[0].password, (err,hasil)=>{
                if(hasil){
                    res.send(log)
                }
                else{
                    res.status(202).json({msg:"password salah"});
                }
            })
        }
        else{
            res.status(202).json({msg:"user tidak ditemukan"});
        }
    }
    else{
        res.status(401).json({msg:'bad cridential'});
    }
    // res.status(200).json(req.sessionID);
}

export const loginUser4 = async(req,res)=>{
    const {name, password} = req.body;
    if(name && password){
        const log = await User.findAll({
            where:{
                name: name
            }
        });
        if(log.length>0){
            bcrypt.compare(password,log[0].password, (err,hasil)=>{
                if(hasil){
                    req.session.user = log[0].dataValues.name;
                    console.log(req.session.user)
                    res.send(req.session.user)
                }
                else{
                    res.status(202).json({msg:"password salah"});
                }
            })
        }
        else{
            res.status(202).json({msg:"user tidak ditemukan"});
        }
    }
    else{
        res.status(401).json({msg:'bad cridential'});
    }
    // res.status(200).json(req.sessionID);
}

export const vc =(req,res,next)=>{
    console.log(store);
    const {cookies} = req;
    if('session_id' in cookies){
        console.log('ada cookies');
        if(cookies.session_id === '345'){
            next();
        }
        else{
            res.status(403).send({msg:'not aunti2'});
        }
    }else{
        res.status(403).send({msg:'not aunti'});
    }
    // console.log(cookies);
    // next();
}

export const vc2 =(req,res,next)=>{
    console.log(store);
    const {cookies} = req;
    // if('session_id' in cookies){
    //     console.log('ada cookies');
    //     if(cookies.session_id === '345'){
    //         next();
    //     }
    //     else{
    //         res.status(403).send({msg:'not aunti2'});
    //     }
    // }else{
    //     res.status(403).send({msg:'not aunti'});
    // }
    console.log(cookies);
    next();
}

export const vc3 =async(req,res,next)=>{
    if(req.session.user){
        console.log(req.session.user);
        next();
    }
    else{
        res.send({loggedIn:false});
    }
}

export const getUser = async(req,res)=>{
    try {
        // res.cookie('session_id', '345');
        const respon = await User.findAll();
        res.json(respon);
    } catch (error) {
        console.log(error.message);
    }
}