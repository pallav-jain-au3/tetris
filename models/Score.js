const Mongoose = require('mongoose')

const ScoreSchema = new Mongoose.Schema({
    user_id : {
        type : String,
        required: true,
    },
    score: {
        type :Number,
        required: true
    },
    username : {
        type :String,
        required: true
    },
    createdAt: {
        type : Date,
        default:Date.now
    }
})

module.exports = Mongoose.model("Score", ScoreSchema)