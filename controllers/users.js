const User=require("../models/user.js");



module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signup=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser=  new User({email,username});
       const registerdUser= await User.register(newUser,password);
       console.log(registerdUser);
       req.login(registerdUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","welcome to wanderlust");
        res.redirect("/listings");
       }); 
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
    };

    module.exports.renderloginForm=(req,res)=>{
        res.render("users/login.ejs");
    };

    module.exports.login=async(req,res)=>{
        req.flash("success","welcome back to wanderlust!");
        let redirectUrl=res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
};

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
        return next(err);
        }
    req.flash("success","You are logged out");
    res.redirect("/listings");
})
};
