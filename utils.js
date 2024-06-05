import { readFile } from 'fs/promises'

import { createConnection } from "mysql2/promise";
import sql from "sql-template-tag";

export const db = await createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database:'web',
    port: 3306
})

export {
    sql
}

/**
 * return file as string
 * @param {import("express").Request} req route to render
 * @param {import("express").Response} res route to render
 * @returns {Promise<void>} file as string
 */
export async function render(req, res) {
    const path = new URL(req.url, process.env.SERVER_URL).pathname
    const r = await getFile(path)
    res.status(!r.file ? 404 : 200).contentType(r.ct).send(r.file)
}

/**
 * 
 * @param {string} path 
 * @param {boolean} [force] 
 * @returns {Promise<{file:string;ct:string}>}
 */
async function getFile(path, force = true) {
    let np = path
    if (np.endsWith('/')) np += 'index.html'
    if (!np.split('/').at(-1).includes('.')) np += '.html'
    try {
        const file = await readFile((`./src/views${np}`))
        const ct = getContentType(np)
        return {
            file: ct.includes("image") ? file : file.toString(),
            ct
        }
    } catch (error) {
        if (force) return getFile(path+"/", false)
        return {
            file: "",
            ct: "text/plain"
        }
    }
}

/**
 * 
 * @param {string} path
 * @returns {string} 
 */
function getContentType(path) {
    const extension = path.split(".").at(-1)
    if (extension == "html") return "text/html"
    if (extension == "css") return "text/css"
    if (extension == "js") return "text/javascript"
    if (["png", "jpg", "jpeg"].includes(extension)) return "image/png"
    return "text/plain"
}

