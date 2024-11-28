const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, unique:true },
  courseId:{type:String, unique:true, required:true},
  description: { type: String },
  image:{type:String}
});

module.exports = mongoose.model("courses", courseSchema);
