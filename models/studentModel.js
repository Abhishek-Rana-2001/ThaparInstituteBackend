const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for storing individual courses and their certificates
const CourseCertificateSchema = new Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "courses", // Assuming you have a Course model
    required: true,
  },
  certificateUrl: {
    type: String, // URL where the certificate is stored
    required: false,
  },
  completionDate: {
    type: Date, // Date of course completion
    required: false,
  },
},{timestamps : true});

// Schema for storing individual students
const StudentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  studentID:{
    type: String,
    required: true,
    unique:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  courses: { 
    type: [CourseCertificateSchema],   // Array of courses student has finished
    default: [] 
  }, 
});

module.exports = mongoose.model("Student", StudentSchema);
