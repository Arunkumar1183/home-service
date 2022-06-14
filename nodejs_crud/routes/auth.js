const express = require('express')
const mysql = require('mysql')
const router = express.Router()

var user_mail = ""


const db = mysql.createConnection(
    {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD, 
        database: process.env.DATABASE
    }
)

router.get('/login' , (req , res ) => {
    var info = req.oidc.user
    user_mail = info.email

    let query = "SELECT mail_id from node where mail_id = ?"
    db.query(query , [info.email] , (err , result) => {
        if(err)
        {
            console.log(err.message)
        }
        
        if( ! result.length > 0)
        {
            query = "insert into node (mail_id , name) VALUES (?, ?)"
            db.query(query , [info.email , info.name] , (err , result) => {
                if(err)
                {
                    console.log(err.message)
                }
                else{
                    res.render('dashboard' , {
                        message : "No Service Found"
                    })
                }
            })
        }
        else
        {
            let allservice = "select service_1 , service_2 from node where mail_id = ?"
            db.query(allservice , info.email , (err, result) => {
                if(err)
                {
                    console.log(err)
                }
                else
                {
                    res.render('dashboard' , {
                        message: result[0].service_1 
                    })
                }
            })
        }
    })
})

router.post('/register' , (req , res) => {
        const {name , mobile_no , service } = req.body
        let query = ""

        if(service === "LPG")
        {
            query = "select service_1 from node where service_1 = ? and mail_id = ?"            
        }
        else if(service === "water")
        {
            query = "select service_2 from node where service_2 = ? and mail_id = ?"
        }
        db.query(query , [service , user_mail] , (err , result) => {
        if(err)
        {
            console.log(err.message)
        }
        
        if(result.length === 0)
        {
            if(service === "LPG")
            {
                query = "UPDATE node SET mobile_no = ?, service_1 = ? WHERE mail_id = ?"            
            }
            else{
                query = "UPDATE node SET mobile_no = ?, service_2 = ? WHERE mail_id = ?"
            }
            db.query(query , [mobile_no , service , user_mail] , (err , result) => {
                if(err)
                {
                    console.log(err.message)
                }
                else{
                    res.render('register' , {
                        message : 'Service Registered'
                    })
                }
            })
        }
        else
        {
            res.render('register' , {
                message : "Service Already in use"
            })
        }
    })

    })

module.exports = router