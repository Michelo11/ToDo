const {model,Schema} = require("mongoose");

module.exports = model("User", new Schema({
    username: {
        type: String,
        requierd: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    todos: [{
        type: Schema.Types.ObjectId,
        ref: "Todo"
    }]
}));
