import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination:path.resolve('./build/public/uploads'),
    filename: function(req,file, cb){
        cb(null, Date.now()+ path.extname(file.originalname))
    }
})

//multer
export default multer({storage:storage})