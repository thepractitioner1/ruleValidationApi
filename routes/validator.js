const express = require("express");
const router = express.Router();
const { validate } = require("../models/validator");
const { ValidateService } = require('../service/validation')


router.get("/", (req, res) => {
    const response = {
        "message": "My Rule-ValidationAPI",
        "status": "success",
        "data": {
            "name": "Okerentie Oritsemisan David",
            "github": "@thepractitioner1",
            "email": "okerentiemisan@gmail.com",
            "mobile": "08175076697",
            "twitter": "@d_misan"
        }
    }
    res.send(response);
})


router.post("/validate-rule", (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        const response = {
            "message": error.details[0].message,
            "status": "error",
            "data": null
        }
        return res.status(400).send(response);
    }

    var obj = req.body;
    const response = ValidateService(obj)

    if (response.status == "error") res.status(400).send(response);
    else res.status(200).send(response);

})


module.exports = router;