import { Router } from "express";

export const router = Router()

router.get('/protected', (req,res) => {
    res.send('Protected route')
})