import express from 'express';
import mongoose from 'mongoose';
import authRoute  from './routers/authRoute.js'
import userRoute from './routers/userRoute.js'
import adminRoute from './routers/adminRoute.js'
import {auth} from './middleware/auth.js'

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

import * as dotenv from 'dotenv'
dotenv.config()



mongoose.connect('mongodb+srv://fourmis:fourmis@cluster0.gizgmxm.mongodb.net/?retryWrites=true&w=majority');

mongoose.connection.on("error", () => {
    console.log("Erreur lors de la connexion à la base de données");
});

mongoose.connection.on("open", () => {
    app.use("/auth", authRoute )
    app.use("/user", [auth.verifyToken], userRoute )
    app.use("/admin", [auth.verifyToken, auth.isAdmin], adminRoute)
    
    console.log("Connexion à la base de données établie");
});



app.listen(PORT, () =>{
    console.log(`Server running at http://localhost:${PORT}/`);
});