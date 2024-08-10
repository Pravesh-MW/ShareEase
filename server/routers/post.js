const router = require('express').Router();




router.get('/api/post/:id', (req, res)=>{
    return res.send({'title':'This is story of great king Thor', 'content':'Thor is a God from norse mythology he is son of Great king Oden', 'category':'mythology'})
})


module.exports = router;