const uploadController = async(req, res)=>{
    const downloadUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    console.log(downloadUrl)

    return res.status(200).json({
      message: 'File uploaded successfully',
      downloadUrl: downloadUrl  // Send this as the download link
    });
}


module.exports = {
  uploadController
}