const mongoose = require("mongoose");

const dbConnect = async () => {
    try{
        const mongoURI = process.env.MONGO_URI;
        if(!mongoURI){
            throw new Error("MongoDB URI is not defined in .env file!");
        }

        await mongoose.connect(mongoURI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
    } catch(error){
        console.error("MongoDB Connection error: ", error.message);
        process.exit(1);
    }
    
};
module.exports = dbConnect;