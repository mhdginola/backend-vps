import express from "express";
import { getUser, loginUser, loginUser2, loginUser3, loginUser4, loginUser4G, saveUser, saveUser2, vc, vc2, vc3 } from "../controller/UserController.js";

const router = express.Router();

router.post('/user',vc,saveUser);
router.get('/user',vc3 ,getUser);
router.post('/login',loginUser);
router.post('/login2',vc2,loginUser2);
router.post('/reg',vc3,saveUser2);
router.post('/login3',loginUser3);
router.post('/login4',loginUser4);
router.get('/login4',loginUser4G);

export default router;