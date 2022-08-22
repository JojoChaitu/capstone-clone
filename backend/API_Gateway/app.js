const express = require("express")
const app= express()
const config= require("./config")
const {createProxyMiddleware} = require("http-proxy-middleware")

app.use("/userService", createProxyMiddleware({
    target:config.userServices_URL,
    changeOrigin:true,
    pathRewrite:{
        '^/userService':'/'
    }
}))

app.use("/adminService", createProxyMiddleware({
    target: config.adminServices_URl,
    changeOrigin:true,
    pathRewrite:{
        '^/adminService':'/'
    }
}))


app.use("/productService", createProxyMiddleware({
    target:config.productServices_URL,
    changeOrigin:true,
    pathRewrite:{
        '^/productService':'/'
    }
}))

app.use("/authenticationService", createProxyMiddleware({
    target:config.authenticationServices_URL,
    changeOrigin:true,
    pathRewrite:{
        '^/authenticationService':'/'
    }
}))

module.exports= app