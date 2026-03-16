// # handles login/signup/JWT/secure notes
// auth-server.js or server.js (if you mount auth routes)

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

// Connect MongoDB
mongoose.connect(
  "mongodb+srv://sabhajeetkmr9:nHFNEtUO2hmX7H97@cluster0.vqoacou.mongodb.net/YT-kart?retryWrites=true&w=majority",
  { useNewUrlParser:true, useUnifiedTopology:true }
).then(()=>console.log("MongoDB connected")).catch(err=>console.log(err));

// Mount auth routes
app.use("/api/auth", require("./auth/routes/auth"));

// Port
const PORT = 3001;
app.listen(PORT, ()=>console.log("Auth server running on port 3001"));