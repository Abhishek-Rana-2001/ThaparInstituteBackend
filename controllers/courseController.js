const courseModel = require("../models/courseModel");

const addCourse = async(req, res) =>{
    const {name, description} = req.body

    if(!name || !description){
        return res.status(400).json({message : "All Fields are required"})
    }

    try {
        const newCourse = await courseModel.create({
            name,
            description
        })

        if(newCourse){
            return res.status(201).json({message : "Course Added Successfully", newCourse})
        }else {
            return res.status(400).json({ message: "Course creation failed" });
        }
    } catch (error) {
        return res.status(500).json({message : "Failed to add course" , error : error.message})
    }
            
}


const getCourses = async(req, res)=>{
    try {
        const courses = await courseModel.find({})
        if(courses){
            return res.status(200).json({message : "Courses Retrieved Successfully", courses})
            }else {
                return res.status(404).json({ message: "No courses found" });
                }
}catch(error){
    return res.status(500).json({message : "Failed to retrieve courses" , error :error.message})
}

}


module.exports = {
    addCourse,
    getCourses
}