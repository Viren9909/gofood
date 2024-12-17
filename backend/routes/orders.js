const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

router.post('/orders', async (req, res) => {
    console.log("Creating new document ")
    let data = req.body.order_data;
    await data.splice(0, 0, { Order_date: req.body.order_date });
    let eId = await Order.findOne({ 'email': req.body.email });
    if (eId === null) {
        try {
            await Order.create({
                'email': req.body.email,
                'order_data': [data]
            }).then(() => {
                return res.json({ success: true })
            })
        } catch (error) {
            res.send(error.message)
        }
    }
    else {
        try {
            await Order.findOneAndUpdate({ email: req.body.email }, {
                $push: { order_data: data }
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            res.send("server error", error.message)
        }
    }
})

router.post('/myOrder', async (req, res) => {
    try {
        let mydata = await Order.findOne({ 'email': req.body.email });
        res.json({orderData: mydata});
    } catch (error) {
        console.log("Unable to Fetch Data Server Error");
        console.log(error);
    }
})

module.exports = router