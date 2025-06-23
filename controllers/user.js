const User=require("../models/user.js")


module.exports.signUpForm=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signUp=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
    const newUser=new User({email,username});
    const registereduser=await User.register(newUser,password);
    console.log(registereduser);

    req.login(registereduser,(err)=>{
        if(err){
            return next(err);
        }
        else{
            req.flash("success","Welcome to GuestGrove");
            res.redirect("/listings");
        }
    })
    
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
    
}

module.exports.loginForm=(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login=async(req,res)=>{
    req.flash("success","welcome to GuestGrove");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logoutForm=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
    })
    req.flash("succes","you are logout");
    res.redirect("/listings");
}