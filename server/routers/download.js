const router = require('express').Router();
const File = require('../models/file');

router.get('/files/download/:uuid', async(req, res)=>{
    const file = await File.findOne({uuid: req.params.uuid});
    if(!file){
        return res.status(500).json({'massage': 'Link has been expired.'});
    }

    const response = await file.save();
    const filePath = `${__dirname}/../${file.path}`;
    console.log(filePath);
    return res.status(200).json({'filePath': filePath});
});



module.exports = router;