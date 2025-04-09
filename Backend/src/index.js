import dotenv from 'dotenv'
import app from "./app.js"
import connectDb from './db/index.js'

dotenv.config()



connectDb()
.then(()=>{
    app.listen(process.env.PORT , () => {
        console.log("server started on the port : " , process.env.PORT)
    })
}).catch((err)=>{
    console.log("Failed to start server since Db not connected : Reason --> " , err.message)
})





