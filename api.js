import { application, Router } from "express";
import { db, sql } from "./utils.js";

export const api = Router()

api.get(`/api/`, async (req, res) => {
    const [query] = await db.query(sql`
    SELECT * FROM employee
    `)
    res.json(query)
})
api.post("/api/login", async (req, res) => {
    const correo = req.body.correo
    const contra = req.body.contra
    const [query] = await db.query(sql`
    SELECT correo,contra FROM  sesion
    WHERE correo = ${correo}
    AND contra = ${contra}
    `)
    console.log(query);
    // const token = await new SignJWT({cinema_id,created_at,id,name,active,role,email,exp: expires.getTime()})
    // .setProtectedHeader({ alg: 'HS256' })
    // .setIssuedAt()
    // .setExpirationTime('1d')
    // .sign(JWT_SECRET)
    res.json(query)
})

api.post("/api/registro", async (req, res) => {
    const nombre = req.body.nombre
    const nombreusuario = req.body.nombreusuario
    const pais =req.body.pais
    const correo =req.body.correo
    const contra=req.body.contra 
    console.log(nombre, nombreusuario, pais,correo,contra, req.body);
    const [query] = await db.query(sql`
    INSERT INTO registro (nombre, nombreU, pais,correo, contra ) 
    VALUES (${nombre}, ${nombreusuario},${pais},${correo},${contra})
    `)
    console.log(query);
    // const token = await new SignJWT({cinema_id,created_at,id,name,active,role,email,exp: expires.getTime()})
    // .setProtectedHeader({ alg: 'HS256' })
    // .setIssuedAt()
    // .setExpirationTime('1d')
    // .sign(JWT_SECRET)
    res.json(query)
})