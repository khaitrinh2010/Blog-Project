const User = require("../../models/user/User")
const bcript = require("bcryptjs")

const registerCtrl = async (req, res) =>{
    const {fullname, email, password} = req.body
    if(!fullname || !email || !password){
        return res.render("user/Register.ejs", {error: "All fields are required"})
    }
    const userFound = await User.findOne({email})
    if(userFound){
        return res.render("user/Register.ejs", {error: "Email already existed"})
    }
    const hashedPassword = await bcript.hash(password, 10);
    const newUser = await User.create({
        fullname: fullname,
        email: email,
        passWord: hashedPassword
    })
    res.redirect("/api/v1/users/login")
    
}

const loginCtrl = async (req, res) => {
    const {email, password}  = req.body
    const userFound = await User.findOne({email})
    if(!userFound){
        return res.render("user/login.ejs", {error: "Invalid Login Credentials"})
    }
    const isValidPassWord = await bcript.compare(password, userFound.passWord)
    //compare thhe password: the data we sent in and the userFound.passWord is the password in the database
    if(!isValidPassWord){
        return res.render("user/login.ejs", {error: "Invalid Login Credentials"})
    }
    req.session.userData = userFound._id  //save all the data of the user in the attribute userData
    //Mỗi lần login thì sẽ tạo ra riêng 1 session với key là ID của thằng vừa login
    //each time a user login, the web will create a session to remember the user id
    return res.redirect("/api/v1/users/profile-page")} //REMEMER TO RETURNR THEE ROUTE HERE

//other people can see your profile here
const userDetailsCtrl = async (req, res) => {
    try {
        const userID = req.params.id; // Get the user ID from the URL parameters.
        const userFound = await User.findById(userID);

        // Check if the user was not found.
        if (!userFound) {
            // Render some error view or handle the "user not found" scenario.
            return res.json({status: "fail"});
        }

        // User found, render the updateUser page with the user data.
        res.render("user/updateUser.ejs", {
            userFound, error: ""
        });
    } catch (error) {
        // Handle unexpected errors, possibly rendering an error page or sending a JSON response.
        console.error(error); // Log the error for debugging purposes.
    }
};


//you can update the user Data in here,, this means you
const profileCtrl = async(req, res)=>{
    const userID = req.session.userData
    const userFound = await User.findById(userID).populate("posts").populate("comments")
    return res.render("user/profile.ejs", { userFound })
}

//update the user profile
const updateUserCtrl = async(req, res) =>{
    const {fullname, email} = req.body
    const userID = req.session.userData
    const user = await User.findById(req.session.userData)
    if(email){
        const emailTaken = await User.findOne({email})
        if(emailTaken){
            res.render("user/updateUser.ejs", {userFound: user, error: "Please provide for more information or email is already taken"})
        }
    }
    const userFound = await User.findByIdAndUpdate(userID, {$set:{
        fullname: fullname,
        email:email
    }})
    res.redirect("/api/v1/users/profile-page")
    
}

const userPassWordUpdateCtrl = async (req, res) =>{
    const { password } = req.body
    if(password){
        const hashedPassword = await bcript.hash(password, 10)
        const updatedUser = await User.findByIdAndUpdate(req.session.userData, {$set: {passWord: hashedPassword}}, {new: true});
        if (!updatedUser) {
            return res.render("user/updatePassword.ejs", {error: "No user found"})
        }

        return res.redirect("/api/v1/users/profile-page")
    }
    res.render("user/updatePassword.ejs", {error: "Please provide new password"})
}

const uploadProfilePhotoCtrl = async(req, res) =>{
    await User.findByIdAndUpdate(req.session.userData, {
        $set: {profileImage: req.file.path}
    })
    
    return res.redirect("/api/v1/users/profile-page")
}

const uploadCoverPhotoCtrl = async(req, res) =>{
    await User.findByIdAndUpdate(req.session.userData, {
        $set: {coverImage: req.file.path}
    })
    
    return res.redirect("/api/v1/users/profile-page")
}

const logoutCtrl = async(req, res)=>{
    req.session.destroy(()=>{
        res.redirect("/api/v1/users/login")
    })

}
module.exports = {registerCtrl, loginCtrl, profileCtrl, userDetailsCtrl, updateUserCtrl, userPassWordUpdateCtrl, uploadProfilePhotoCtrl, logoutCtrl, uploadCoverPhotoCtrl}