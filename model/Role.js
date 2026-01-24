const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    roleName : {
        type : String,
        default : "User"
    },
    roleNumber : {
        type : Number,
        default : 1012
    }
});

module.exports = mongoose.model("Role", roleSchema);
