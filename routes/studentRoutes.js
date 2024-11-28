const express = require("express");
const { createStudent, updateStudent,getStudents, uploadCertificateURL, getStudent,getCertificateUrls } = require("../controllers/studentController");

const router = express.Router()

router.post("/", createStudent)

router.put("/:id", updateStudent)
router.get("/", getStudents)
router.get("/:studentID", getStudent)
router.get("/certificates/:studentID", getCertificateUrls)
router.post("/:studentID/:courseId", uploadCertificateURL)

// router.get("/students/certificate", getCertificate)


module.exports = router