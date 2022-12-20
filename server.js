const http = require('http');
const url = require('url');
const fs = require('fs');
const path=require('path');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


const Records = [];

const uri = "mongodb://127.0.0.1:27017";
const dbName = 'todolist'


var express = require("express");
const { Collection } = require('mongoose');
var app = express();

var nowuser="";
app.use(express.static(path.join(__dirname, '')));

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/login.html');
});
app.get("/main", function (req, res) {
    var id=nowuser;

    res.sendFile(__dirname + '/main.html');
    console.log(nowuser);
});


app.get("/main/loaddolist", function (req, res) {
    console.log("hello loaddolist");

    MongoClient.connect(uri, function (err, db) {
        if (err) throw err;
        const dbo = db.db(dbName);
        dbo.collection("dolist").find({'user_id': nowuser}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            for(i=0;i<result.length;i++){
                Records.push(result[i]);
            }
            res.send(JSON.stringify(Records));
            for(i=0;i<=Records.length;i++){
                Records.pop();
            }
            db.close();
        });
    });
});

app.get("/main/dolist", function (req, res) {
    console.log("hellodolist");
    let q = url.parse(req.url, true).query;
    let dueDate=q.dueDate;
    let inputField=q.inputField
    let dolistObj = { user_id: nowuser, dueDate: q.dueDate , inputField: q.inputField};
    console.log(nowuser);
    console.log(q.dueDate);
    console.log(q.inputField);
    console.log(dolistObj);
    MongoClient.connect(uri, function (err, db) {
        if (err) throw err;
        const dbo = db.db(dbName);
        dbo.collection("dolist").insertOne(dolistObj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            console.log(nowuser);
            console.log(q.dueDate);
            console.log(q.inputField);
            console.log(dolistObj);
            db.close();
        });
    });
    res.send(userObj);
});

app.get("/logincheck", function (req, res) {
    console.log("hello logincheck");
    let q = url.parse(req.url, true).query;
    let user_id = q.user_id;
    let password = q.password;
    MongoClient.connect(uri, function (err, db) {
        if (err) throw err;
        const dbo = db.db(dbName);
        dbo.collection("users").findOne({'user_id': q.user_id}, function (err, re) {
            if (err) throw err;
            console.log(re);
            if (re==null) {
                res.send("0");
            }
            else{
                nowuser=q.user_id;
                res.send("1")
            }
            console.log("checked");
            db.close();
        });
    });
});
app.get("/regcheck", function (req, res) {
    console.log("hello regcheck");
    let q = url.parse(req.url, true).query;
    let user_id = q.user_id;
    let password = q.password;
    MongoClient.connect(uri, function (err, db) {

        if (err) throw err;
        const dbo = db.db(dbName);
        dbo.collection("users").findOne({'user_id': q.user_id}, function (err, re) {
            if (err) throw err;
            console.log(re);
            if (re==null) {
                res.send("0");
            }
            else{
                res.send("1")
            }
            console.log("checked");
            db.close();
        });
    });
});
app.get("/register", function (req, res) {
    let q = url.parse(req.url, true).query;
    let user_id = q.user_id;
    let password = q.password;

    let userObj = { user_id: q.user_id, password: q.password};
    //console.log(JSON.stringify(userObj))
    //userObj=JSON.stringify(userObj)
    console.log("hellosave");
    console.log(res);
    MongoClient.connect(uri, function (err, db) {
        if (err) throw err;
        const dbo = db.db(dbName);
        dbo.collection("users").insertOne(userObj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
    res.send(userObj);
});

//=============啟動==============================
app.listen(3000, function () {
    console.log("伺服器已啟動在 port 3000");

});
