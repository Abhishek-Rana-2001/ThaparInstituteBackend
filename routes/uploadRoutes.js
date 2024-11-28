const express = require("express")
const { uploadController } = require("../controllers/uploadController")
const upload = require("../middlewares/uploadMiddleware")
const router = express.Router()


router.post("/" , upload.single("file") , uploadController )


module.exports = router