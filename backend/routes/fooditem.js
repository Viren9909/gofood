const express = require('express');
const router = express.Router();

router.post('/food_item',async(req,res)=>{
    try {
        res.send([global.food_item,global.food_category]);
    } catch (error) {
        res.json({error})
    }
})

module.exports = router;