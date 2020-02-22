import mongoose from 'mongoose';

const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
}

export const connection = async ()=>{
    try{
        await mongoose.connect('mongodb://localhost/photo-gallerry-db',config)
        console.log("db is connected");

    }catch(err){
        console.log(err);
    }
}