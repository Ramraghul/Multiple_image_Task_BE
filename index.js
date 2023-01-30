require('./Src/Connection')
const User = require('./Src/Model');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const multer = require('multer');
const path = require('path');
const cors = require('cors');



app.use(cors({ origin: "*"}));
app.use(express.static('./public'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

//use of multer package
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})

let maxSize = 10 * 1000 * 1000;
let upload = multer({
    storage: storage,
    limits: {
        fileSize: maxSize,
        fieldNameSize: 200,
        files: 5,
        fields: 5
    }
});

let uploadHandler = upload.array('photos');

app.get('/',(req,res)=>{
    res.send('<h1>Working</h1>')
})

app.post('/upload', (req, res) => {
    uploadHandler(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            if (err.code == 'LIMIT_FILE_SIZE') {
                res.status(400).json({ message: "Maximum file size is 10mb." })
            }
            return;
        }
        if (!req.body) {
            res.status(400).json({ message: "No file!" });
        } else {
            res.status(200).json({ message: "Uploaded to the Server!" })
        }
    })
})

app.post('/User/Upload', (req, res) => {
    try {
        let inward = new User(req.body);
        inward.save().then((data) => {
            res.status(200).json({ message: "User Data Save" })
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})




