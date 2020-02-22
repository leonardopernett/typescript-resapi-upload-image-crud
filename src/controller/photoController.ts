import {Request, Response} from 'express';
import fs from  'fs-extra';
import path from 'path';
import Photo, { IPhoto } from '../model/Photo';

export async function getPhotos(req:Request, res:Response){
    const photos =  await Photo.find();
    res.status(200).json(photos);
}


export async function getOnePhotos(req:Request, res:Response){
    const photo =  await Photo.findOne({_id:req.params.id});
    res.status(200).json(photo);
}


export  async function savePhoto(req:Request, res:Response){
    const ext = path.extname(req.file.originalname);

    if(ext !== ".jpg" && ext !==".png" && ext !== ".jpeg"){
        await fs.unlink(req.file.path);
        return res.json('formato imagen no pemritido')
    }

    if (req.file.size >1000000){
        await fs.unlink(req.file.path);
        return res.json('imagen no puede superar 1mb')
    }

    const {title, description}= req.body;
    const imagePath = '/uploads/'+req.file.filename
    
    const newPhoto = {
       title,
       description,
       imagePath:imagePath
    }
    
     const photo = new Photo(newPhoto)
     await photo.save();
    
     res.json({
         message:"photo created",
         body:{
             photo:{
                 title,
                 description,
                 imagePath
             }
         }
     })
   
         

}

export async function updatePhoto(req:Request, res:Response){
       
       const photo =  await Photo.findById(req.params.id);
       await fs.unlink(path.resolve('./build/public'+photo?.imagePath))

       const {title, description}= req.body;
       const imagePath = '/uploads/'+req.file.filename
       const newPhoto = {
            title,
            description,
            imagePath
       }

      await Photo.findByIdAndUpdate(req.params.id,newPhoto)
      res.json({message:"photo updated"});
}


export async function deletePhoto(req:Request, res:Response){
    const {id }= req.params
    const photo =  await Photo.findByIdAndDelete(id);
    await fs.unlink(path.resolve('./build/public'+photo?.imagePath))
    res.status(200).json({
        message:"photo deleted",
        photo
    });
}

