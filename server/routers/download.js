const router = require('express').Router();
const File = require('../models/file');

router.get('/download/:uuid', async(req, res)=>{
    const uuid = req.params.uuid.substring(1).replace('download','uploads');
    console.log(uuid);
    const file = await File.findOne({uuid: uuid});
    if(!file){
        return res.status(500).json({'massage': 'Link has been expired.'});
    }

    const response = await file.save();
    const filePath = `${__dirname}/../${file.path}`;
    // const filePath = `http://loaclhost:2000/${file.path}`;
    console.log(filePath);
    res.download(filePath, (err) => {
        if (err) {
            console.error('Error downloading the file:', err);
            res.status(500).send('Error downloading the file');
        }
    });
});


module.exports = router;