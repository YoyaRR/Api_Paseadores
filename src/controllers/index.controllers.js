import { pool } from '../database/connection.js'

export const getPaseadores = async (req, res) => {
    try {
        return queryPaseadores(req)
            .then((items) => {
                res.status(200).json(items)
            })
    } catch (error) {
        console.log(error)
        return res.status(500).json('Error del servidor')
    }
}

function queryPaseadores(req) {
    return new Promise((resolve, reject) => {
        const beginLimit = Number(req.query.beginLimit ?? 0)
        const endLimit = Number(req.query.endLimit ?? 100)
        const sql = 'SELECT * FROM paseadores LIMIT ?,?'
        const timeout = 40000
        const values = [beginLimit, endLimit]
        pool.query({
            sql,
            timeout,
            values
        }, function (err, result) {
            if (err) reject(err)
            resolve(result)
        })

    })
}

export const crearPaseador = async (req, res) => {
    try {
        const { nombre, cedula, celular, direccion, usuario, password, años_experiencia, edad } = req.body

        const sql = 'INSERT INTO `paseadores` (`nombre`, `cedula`, `celular`, `direccion`, `usuario`, `password`, `años_experiencia`, `edad` ) VALUES (?, ?, ?, ?, ?, ?, ?,?)'
        const timeout = 40000
        const values = [nombre, cedula, celular, direccion, usuario, password, años_experiencia, edad]
        await pool.query({
            sql,
            timeout,
            values
        })

        return res.status(200).json({
            status: 'Paseador creado exitosamente',
            nombre,
            cedula,
            celular,
            direccion,
            usuario,
            password,
            años_experiencia,
            edad
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 'Error en el servidor'
        })
    }
}