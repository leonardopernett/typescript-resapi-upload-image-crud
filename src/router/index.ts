import {Router} from 'express'
import {getPhotos, savePhoto, deletePhoto, getOnePhotos, updatePhoto} from '../controller/photoController';
import  multer from '../libs/multer'
const router:Router = Router();


router.route('/photos')
      .get(getPhotos)
      .post(multer.single('image'),savePhoto)

router.route('/photos/:id') 
      .get(getOnePhotos)
      .put(multer.single('image'),updatePhoto)
      .delete(deletePhoto);


export default router;