//MongoStore is used to store the session in the database
const MongoStore = require("connect-mongo")
const express = require('express')
const app = express()
const path = require("path")
const session = require("express-session")
app.use(express.json()) //parse incoming data
const userRoute = require("./routes/users/users")
const commentRoute =require("./routes/comments/Comment")
const postRoute = require("./routes/posts/posts")
const dotenv = require("dotenv")
app.set("view enngine", "ejs")
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, "/public")))
dotenv.config()
app.use(express.urlencoded({ extended: true }));
const methodOverride = require('method-override');

// Override with the X-HTTP-Method-Override header in the request. Use a query value when you see `_method`
app.use(methodOverride('_method'));



//config the session
app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({
            mongoUrl: process.env.URL,
            ttl: 24*60*60 //expires in 1 day
        })
    }))
require("./config/dbConnect")
app.use((req, res, next)=>{
    if(req.session.userData){
        res.locals.userData = req.session.userData
    }
    else{
        res.locals.userData = null
    }
    next()
})
app.get("/", (req, res)=>{
    res.render("index.ejs")
})
app.use("/api/v1/users", userRoute)
app.use("/api/v1/comments", commentRoute)
app.use("/api/v1/posts", postRoute)
const PORT = process.env.PORT || 9000
app.listen(PORT, ()=>{console.log("Server is running")})