const { Router } = require("express");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname);

        if (req.userId) {
            cb(null, req.userId + extension);
        } else {
            cb(null, req.companyId + extension);
        }
    },
});

const upload = multer({ storage: storage });

const artistController = require('../controllers/artistController');


const router = new Router();


router.put('/artists/:id', artistController.update);


module.exports = router;