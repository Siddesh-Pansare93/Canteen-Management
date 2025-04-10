import mongoose from 'mongoose'


const connectDb  = async() => {
    try {
        const connectInstance = await mongoose.connect(`${process.env.mongodb_uri}` , {
            dbName : 'canteen'
        })
        
        console.log(`Connected to the Mongodb at ${connectInstance.connection.host}`)
        
    } catch (error) {
        console.log("Failed to Connected to Db : " , error.message)
        process.exit(1)
    }
}


export default connectDb ; 