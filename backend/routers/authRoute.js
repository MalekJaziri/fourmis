import express from 'express'
import {register, login, getUserByToken} from '../controllers/authController.js'



const router = express.Router()


router.post("/register", register )
router.post("/login", login)
router.get("/get-user-by-token", getUserByToken)




export default router 