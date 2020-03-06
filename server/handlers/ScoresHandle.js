const Score = require("../models/Score");
const User = require("../models/User");

exports.addScore = async (req, res) => {
  let score = req.body.score;
  if (!score) {
    return res.status(400).json({ error: "Invalid request" });
  }
  let id = req.user._id;
  try {
    let doc = await User.findById(id);
    if (doc) {
      let scoreData = new Score({
        user_id: id,
        score,
        username : doc.username
      });
      let savedScore = await scoreData.save();
      doc.scores.push(savedScore._id);
      await doc.save();
      return res.status(200).json(savedScore);
    }
    return res.status(400).json({ error: "user does not exist" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getScore = async (req, res) => {
   try{ 
   let scores = await Score.find({}).sort("-score")
    if (scores){
     return res.status(200).json({scores : scores})
    }
    return res.status(200).json({scores :[]})
   }
   catch(err){
       return res.status(400).json({error:err.message})
   }
}
