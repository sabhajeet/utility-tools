const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// For Google login
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    let user = await User.findOne({ googleId: profile.id });
    if(!user){
        user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id
        });
    }
    done(null, user);
}));

router.use(passport.initialize());

// ---- Sign Up ----
router.post('/signup', async (req,res)=>{
    try{
        const { name, email, password } = req.body;
        if(!name || !email || !password)
            return res.status(400).json({ message:"All fields required" });

        const existing = await User.findOne({ email });
        if(existing) return res.status(400).json({ message:"User already exists" });

        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, passwordHash: hash });

        const token = jwt.sign({ id:user._id, email:user.email }, process.env.JWT_SECRET || "secret", { expiresIn:"7d" });

        // Set cookie
        res.cookie("token", token, { httpOnly:true, maxAge:7*24*60*60*1000 });
        res.json({ message:"Sign Up successful" });
    }catch(err){
        console.error(err);
        res.status(500).json({ message:"Server error" });
    }
});

// ---- Login ----
router.post('/signin', async (req,res)=>{
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({ message:"User not found" });

        if(!user.passwordHash) return res.status(400).json({ message:"Use Google login" });

        const match = await bcrypt.compare(password, user.passwordHash);
        if(!match) return res.status(400).json({ message:"Invalid password" });

        const token = jwt.sign({ id:user._id, email:user.email }, process.env.JWT_SECRET || "secret", { expiresIn:"7d" });
        res.cookie("token", token, { httpOnly:true, maxAge:7*24*60*60*1000 });
        res.json({ message:"Login successful" });
    }catch(err){
        console.error(err);
        res.status(500).json({ message:"Server error" });
    }
});

// ---- Google OAuth ----
router.get('/google', passport.authenticate('google', { scope:['profile','email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect:'/tools/login.html' }),
    (req,res)=>{
        const token = jwt.sign({ id:req.user._id, email:req.user.email }, process.env.JWT_SECRET || "secret", {expiresIn:"7d"});
        res.cookie("token", token, { httpOnly:true, maxAge:7*24*60*60*1000 });
        res.redirect("/tools/secure-notes.html");
    }
);

module.exports = router;