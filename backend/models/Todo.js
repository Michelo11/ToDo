const {model,Schema} = require("mongoose");

module.exports = model("Todo", new Schema({
    title: String,
    completed: Boolean,
    owner: String
}));