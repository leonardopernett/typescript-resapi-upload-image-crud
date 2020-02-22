import { Schema, model , Document} from 'mongoose';


export interface IPhoto extends Document{
    title:string,
    description:string,
    imagePath:string
}



const PhotoSchem = new Schema({
   title:{
       type:String, 
       required:true
   },
   description:{
    type:String, 
    required:true
    },
    imagePath:{
        type:String, 
        required:true
    },
    created:{
        type:Date, 
        default:Date.now()
    }
})


export default model<IPhoto>('Photo',PhotoSchem)