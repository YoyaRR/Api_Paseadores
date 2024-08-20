import { Router } from 'express'
import {getPaseadores, crearPaseador} from '../controllers/index.controllers.js'


// inicializamos una variable que contendrá los metodos de Router
const router = Router()

// Paths con las rutas a ser invocadas 
router.get('/getPaseadores', getPaseadores)
router.post('/postPaseador',crearPaseador)

export default router