const express = require("express");
const uuid = require("uuid");
const cors = require('cors')


const livros = [];


const livrosRouter = express.Router();

livrosRouter.get("/", (req, res) => {
  res.json(livros);
});


livrosRouter.post("/", (req, res) => {
  const livro = {
    id: uuid.v4(),
    titulo: req.body.titulo,
    edicao: req.body.edicao,
    autor: req.body.autor,
  };

  livros.push(livro);

  res.status(201).json(livro);
});

//PUT
livrosRouter.put("/", (req, res) => {
  //Id do livro no corpo da requisição
  const livroId = req.body.id;
  //Procura o livro
  const livro = livros.find((livro)=> livro.id === livroId);
  
  //Livro não encontrado
  if (!livro) {
    return res.status(404).json({ error: "Livro não encontrado! Verifique o id" });
  }
  
  //Atualizar as propriedades do livro, conforme id e requisição
  livro.titulo = req.body.titulo;
  livro.edicao = req.body.edicao;
  livro.autor = req.body.autor;

  res.status(200).json(livro);
});

//DELETE
livrosRouter.delete("/", (req, res) => {
  const livro = {
    id: req.body.id
  };

  livros.delete(livro);

  res.status(201).json(livro);
});


const app = express();
app.use(express.json())
app.use(cors())
app.use("/livros", livrosRouter);
app.listen(3000);
