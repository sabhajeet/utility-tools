const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const SecureNote = require("../../models/SecureNote");

/* Create Note */
router.post("/", auth, async (req,res)=>{
  const {title,content} = req.body;

  const note = new SecureNote({userId:req.user.id,title,content});
  await note.save();

  res.json(note);
});

/* Get Notes */
router.get("/", auth, async (req,res)=>{
  const notes = await SecureNote.find({userId:req.user.id}).sort({createdAt:-1});
  res.json(notes);
});

/* Update Note */
router.put("/:id", auth, async (req,res)=>{
  const note = await SecureNote.findOneAndUpdate(
    {_id:req.params.id,userId:req.user.id},
    {...req.body, updatedAt:Date.now()},
    {new:true}
  );
  res.json(note);
});

/* Delete Note */
router.delete("/:id", auth, async (req,res)=>{
  await SecureNote.findOneAndDelete({_id:req.params.id,userId:req.user.id});
  res.json({message:"Deleted"});
});

module.exports = router;