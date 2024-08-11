const router = require('express').Router();

const File = require('../models/file');

router.get('/:uuid', async(req, res)=>{
    try{
        const uuid = req.params.uuid;
        const file = await File.findOne({uuid: uuid});
        if(!file){
            return res.status(422).json({"massage": `${uuid} is not founded`});
        }
        return res.status(200).json({...file, downloadLink: `${Process.env.APP_BAS_URL}/files/download/${file.uuid}`});
    }catch(err){
        return res.status(500).json({"massage": err });
    }
})

module.exports = router;