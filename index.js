import express from "express";

import autenticar from "./segurança/autenticar.js";
import session from "express-session";


const porta = 3400;
const localhost = "0.0.0.0" //define onde nosso endereço app estará disponivel 
const app = express();

app.use(session({
    secret: "m123456789",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 15 //15minutos max de sessão
    }
}));

app.get("/login2", (requisicao, resposta) => {
    resposta.redirect('/login.html');
})


app.post("/login2", (requisicao, resposta)=>{
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;
    if(usuario === "admin" && senha === "admin"){
        requisicao.session.autenticado = true;
        resposta.redirect('/index.html'); }
        else {
            resposta.redirect('/login2.html');
        }

    })

//O HTTP é um protocolo stateless (sem estabelecimento de sessão) o servidor recebe uma requisição, processa e envia uma resposta sem identificar os atores envolvidos
//prepara o servidor para disponibilizar recursos estaticos

//erro: http://localhost:3200/publico/index.html
//certo: hhtp://localhost:3200/index.html
app.use(express.static("./publico"));

//função middeleware
app.use(autenticar, express.static("./privado"));




app.listen(porta, localhost,()=>{
    console.log(`servidor rodando em http://${localhost}:${porta}`)
}

)

