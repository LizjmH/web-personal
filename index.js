import "dotenv/config"
import Express from 'express'
import { render } from './utils.js'
import { router } from './routes.js'
import { api } from './api.js'
import Multer from "multer"

const multer = Multer()

const app = Express()
const PORT = 3000
process.env.SERVER_URL = 'http://localhost:3000'

app.use(Express.json())
app.use(multer.array())
app.use(Express.urlencoded({ extended: false }))
app.use(Express.static('src/public'))

app.use('/', router)
app.use('/', api)
app.get('*', async (req,res) => {
    render(req, res)
})

app.listen(PORT, () => {
    console.log(`Listen on http://localhost:${PORT}`);
})