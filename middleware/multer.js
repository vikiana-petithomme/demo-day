const multer = require("multer");
const path = require("path");

/*const storage = multer.diskStorage({   destination: "./storage/media",    filename: (req, file, cb) => {     cb(null, Date.now() + "-" + file.originalname);   }, });*/

module.exports = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === "propIMG") {
          cb(null, './proposal/createProposal/')
      }
      else if (file.fieldname === "additionalMaterials") {
          cb(null, './proposal/createProposal/');
      }
      else if (file.fieldname === "avatar") {
          cb(null, './uploads/certificates/')
      }
    },
    filename:(req,file,cb)=>{
       if (file.fieldname === "propIMG") {
           cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
       }
     else if (file.fieldname === "additionalMaterials") {
       cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
     }
     else if (file.fieldname === "avatar") {
       cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
     }
    }, 
  }),
  limits: {
     fileSize: 1024 * 1024 * 10
  },
  fileFilter: (req, file, cb) => {
     checkFileType(file, cb);

     function checkFileType(file, cb) {
      if (file.fieldname === "additionalMaterials") {
         if (
             file.mimetype === 'application/pdf' ||
             file.mimetype === 'application/msword' ||
             file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
           ) { // check file type to be pdf, doc, or docx
               cb(null, true);
           } else {
               cb(null, false); // else fails
           }
      }
      else if (file.fieldname === "avatar" || file.fieldname === "propIMG") {
         if (
             file.mimetype === 'image/png' ||
             file.mimetype === 'image/jpg' ||
             file.mimetype === 'image/jpeg'
           ) { // check file type to be png, jpeg, or jpg
             cb(null, true);
           } else {
             cb(null, false); // else fails
           }
         }
      }
  }
  })
    
    
  //at the save function 
  /*
  upload(req, res, (err) => {
  if (err) {
     console.log(err);
  } else {
     if (req.file == "undefined") {
         console.log("No file selected!")
     } else {
         connection.query('INSERT INTO teachers SET ?', teachers, (error, results, fields) => {`enter code here`
             if (error) {
                 res.json({
                     status: false,
                     message: 'there are some error with query'
                 })
                 console.log(error);
             } else { 
              console.log("Saved successfully");
             }
          })
  }
  }*/

