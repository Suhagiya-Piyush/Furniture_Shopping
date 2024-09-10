const multer = require('multer');

const storage = multer.diskStorage({
    destination : function (req, file, cd) {
        cd(null, 'public/users');
    },
    filename : function(req, file, cd) {
        const fileName = file.originalname.replace(/ /g, '%20');
        cd(null, `${Date.now()}_${fileName}`);
    },
});

exports.upload = multer({ storage : storage});