import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";
import 'dotenv/config'


const app = express()

app.use(cors())
app.use(express.json())

const port = process.env.PORT;


let users = []
let filmes = []

app.post('/users', async (req, res) => {
    const { nome, senha, email} = req.body
    
    if (!nome) {
        res.status(400).send(JSON.stringify({Message: 'Nome inválido'}))
        return
    }
    if (!senha) {
        res.status(400).send(JSON.stringify({Message: 'Senha inválido'}))
         return
    }
    if (!email) {
        res.status(400).send(JSON.stringify({Message: 'Email inválido'}))
        return
    }


    const senhaIncriptada = await bcrypt.hash(senha, 10)

    const newUser = {
        id: uuid(),
        nome,
        senha: senhaIncriptada,
        email
    }

    users.push(newUser)

    return res.status(201).json({ ok: true, message: 'Usuário cadastrado', data: newUser})
})

app.post('/filmes', (req, res) => {
    try {
        const {titulo , genero, duracao, sinopse, dtLanca, tomatoes} = req.body

        if (!titulo || !genero || !duracao || !sinopse || !dtLanca || !tomatoes){
            return res.status(401).json({ok:false, message: "Campo não pode ser em branco"})
        }

        const newFilme = {
            id: uuid(),
            titulo,
            genero,
            duracao,
            sinopse,
            dtLanca,
            tomatoes
        }
        filmes.push(newFilme)

        return res.status(201).json({ok:true, message: "Filme cadastrado", data:newFilme})

    } catch (error) {
        return res.status(500).json({ok:false, message: "Erro Interno",})
        
    }
})
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))