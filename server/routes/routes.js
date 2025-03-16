const express=require('express');
const {createAccount,handleLogin}=require('../controller/accounts');
const {createCoupons,getCoupon, getAllCoupons}=require('../controller/coupons');

const routes=express.Router();


routes.post('/createaccount',createAccount);
routes.get('/createcoupons',createCoupons);
routes.get('/getcoupon',getCoupon);
routes.post('/login',handleLogin);
routes.get('/all',getAllCoupons);
module.exports=routes;