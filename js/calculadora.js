function insert(num) {
    // agora vamos lidar a função insert, ela vai receber um parâmetro chamado num, pra saber que está vindo um numero

    var numero = document.getElementById('resultado').innerHTML; // document.getElementById('resultado').innerHTML= num; antes os números se perdem ao digitar ent eu faço:    var numero = document.getElementById('resultado').innerHTML= num;
    // vou querer inserir o número no <p> e ele recebe o num. quando eu atualizar vai aparecer o número
    document.getElementById('resultado').innerHTML = numero + num;// ele vai pegar o que já tem e o númerp que está no parâmetro, ele pega o que já tinha e estáapenas inserindo o próximo valor
}

function clean() {
    document.getElementById('resultado').innerHTML = "";
    //chamo a função clear quando eu clico em no botão C de clear, ai emprimo uma mensagem vazia
    //para a váriavel resultado, uma vez que nada é somado com nada, é emprimido nada né.
}

function back() {
    var resultado = document.getElementById('resultado').innerHTML;
    document.getElementById('resultado').innerHTML = resultado.substring(0, resultado.length - 1);
}

function calcular() {

    var resultado = document.getElementById('resultado').innerHTML;

    if (resultado) {
        document.getElementById('resultado').innerHTML = eval(resultado);
        addHistorico(`${resultado}=${eval(resultado)}`);
    }
}

// historico
function addHistorico(exp) {
    var expressao = document.createElement("p");
    expressao.innerText = exp;
    document.querySelector(".scrool").appendChild(expressao);
}
