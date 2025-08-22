import mongoose from 'mongoose';
 const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected!');
    }
    catch(error){
        console.log({message: error.message});
        process.exit(1);
    }
}
export { connectDB };
