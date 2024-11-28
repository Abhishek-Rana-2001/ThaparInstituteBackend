const Student = require("../models/studentModel");

// Creating a new Student
const createStudent = async (req, res) => {
  const { studentID, name, email, password, courses } = req.body;

  if (!studentID || !name || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  try {
    const student = await Student.create({
      studentID,
      name,
      email,
      password,
      courses: [{ courseId: courses }],
    });
    if (student) {
      res.status(201).json(student);
    } else {
      res.status(400).json({ message: "Failed to create student" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to create student" });
  }
};

//  Get All Students
const getStudents = async (req, res) => {
  try {
    const students = await Student.find().select("-password -v");
    res.status(200).json(students);
  } catch (error) {
    console.error(error);
  }
};

// Get 1 student

const getStudent = async (req, res) => {
  const { studentID } = req.params;
  try {
    const student = await Student.findOne({ studentID }).select("-password -v");
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(404).json({ message: "Student not found" });
  }
};

const uploadCertificateURL = async (req, res) => {
  const { studentID, courseId } = req.params;
  const { certificateUrl } = req.body;
  try {
    const student = await Student.findOne({ studentID });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    const course = student.courses.find(
      (course) => course._id.toString() === courseId
    );
    console.log(course);
    if (course) {
      // Dynamically add or update the certificateUrl field
      course.certificateUrl = certificateUrl; // This will add the field if it doesn't exist
      await student.save(); // Save the changes to the student document
      return res
        .status(200)
        .json({ message: "Certificate uploaded successfully" });
    } else {
      return res.status(400).json({ message: "Course not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Failed to upload certificate" });
  }
};

const addCourse = async (req, res) => {
  const { studentID, courseID } = req.body;
};

const updateStudent = async (req, res) => {
  const { email, courseId } = req.body;

  if (!email || !courseId) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    const student = Student.findOne({ email });
  } catch (error) {}
};

const getCertificateUrls = async (req, res) => {
  console.log("worked")
  const { studentID } = req.params;
  try {
    const student = await Student.findOne({ studentID });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    const course = student.courses.find(course => course.certificateUrl)
    if(course){
      return res.status(200).json({
        certificateUrl: course.certificateUrl
      })
    }else{
      return res.status(404).json({ message: "No certificate found" })
    }
  } catch(error) {
    console.error(error);
    return res.status(400).json({ message: "Failed to get certificate URL" });
  }
};
module.exports = {
  createStudent,
  updateStudent,
  getStudents,
  uploadCertificateURL,
  getStudent,
  getCertificateUrls,
};
