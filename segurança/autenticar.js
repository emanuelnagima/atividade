
//requisição
//resposta
//next
//parametros fornecidos pelo express


export default function autenticar(requisicao, resposta, next){
    if (requisicao.session.autenticado === true){
    next();
} else{
    resposta.redirect('/login');
}}