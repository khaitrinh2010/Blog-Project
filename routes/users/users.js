const express = require("express")
const userRoutes = express.Router()
const storage = require("../../config/cloudinary")
const multer = require("multer")
const upload = multer({ storage: storage })
const {uploadCoverPhotoCtrl,registerCtrl, loginCtrl, profileCtrl, userDetailsCtrl, updateUserCtrl, userPassWordUpdateCtrl, uploadProfilePhotoCtrl, logoutCtrl} = require("C:\\Users\\ADMIN\\OneDrive\\Desktop\\FULLSTACK B\\controllers\\users\\Users.js")

userRoutes.get("/login", (req, res)=>{
    res.render("user/login.ejs", {error: ""})
})
userRoutes.get("/register", (req, res)=>{
    res.render("user/register.ejs", {error: ""}) // no error here
})
userRoutes.get("/upload-profile-photo", (req, res)=>{
    res.render("user/uploadProfilePhoto.ejs")
})
userRoutes.get("/upload-profile-cover", (req, res)=>{
    res.render("user/uploadProfileCover.ejs")
})
// userRoutes.get("/update-user-form", (req, res)=>{
//     res.render("user/updateUser.ejs")
// })
userRoutes.post("/register", registerCtrl, (req, res)=>{
    try{
        res.json({
            status: "success",
            user: "User reggistered"
        })
    }
    catch(error){
        res.json(error)
    }
})
  
//POST/api/v1/users/login
userRoutes.post("/login", loginCtrl, async (req, res) => {
    try {
        res.json({
        status: "success",
        user: "User login",
        });
    } catch (error) {
        res.json(error);
    }
    });

    //GET/api/v1/users/:id
userRoutes.get("/profile-page", profileCtrl, async (req, res) => {
    try {
        res.json({
            status: "success",
            user: "User profile",
        });
    } catch (error) {
        res.json(error);
    }
    });


//PUT/api/v1/users/profile-photo-upload/:id


//put is update, post is submit data to the server
userRoutes.get("/profile-photo-upload/", (req, res)=>{
    res.render("user/uploadProfilePhoto.ejs")
})
userRoutes.put("/profile-photo-upload", upload.single("image"), uploadProfilePhotoCtrl, async (req, res) => { //single if only 
    //accept only a single file => single else array

    try {
        res.json({
        status: "success",
        user: "User profile image upload",
        });
    } catch (error) {
        res.json(error);
    }
    });

    //PUT/api/v1/users/profile-photo-upload/:id
userRoutes.get("/cover-photo-upload", async(req, res)=>{
    res.render("user/uploadProfileCover.ejs")
})
userRoutes.put("/cover-photo-upload", upload.single("image"), uploadCoverPhotoCtrl, async (req, res) => {
    try {
        res.json({
        status: "success",
        user: "User cover image upload",
        });
    } catch (error) {
        res.json(error);
    }
    });

//update the profile of user
userRoutes.put("/update", updateUserCtrl, async(req, res)=>{
    try {
        res.json({
            status: "success",
            user: "User information image upload",
        });
    } catch (error) {
        res.json(error);
    }
}) //update the email and the username in this route
    //PUT/api/v1/users/update-password/:id
userRoutes.get("/update-password", (req, res)=>{
    res.render("user/updatePassword.ejs", {error:""})
})
userRoutes.put("/update-password", userPassWordUpdateCtrl, async (req, res) => {
    try {
        res.json({
            status: "success",
            user: "User password update",
        });
    } catch (error) {
        res.json(error);
    }
    });

//GET/api/v1/users/logout
userRoutes.get("/logout", logoutCtrl, async (req, res) => {
    try {
        res.json({
        status: "success",
        user: "User logout",
        });
    } catch (error) {
        res.json(error);
    }
    });


//other people can see your profile public in here
userRoutes.get("/:id", userDetailsCtrl, async (req, res) => { //NOTE: id is the key that corressponds to the 
    //value of the actual id
    try {
        res.json({
        status: "success",
        user: "User Details",
        });
    } catch (error) {
        res.json(error);
    }
});


    
module.exports = userRoutes