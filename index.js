let pesquisa = null;
let inputCEP = null;

let campoDeAmostra = {
    cidadeUF: null,
    logradouro: null,
    bairro: null,
    complemento: null
};

document.addEventListener("DOMContentLoaded", setup);

function setup() {
    
    campoDeAmostra.home = document.getElementById("home");
    campoDeAmostra.cidadeUF = document.getElementById("cidadeUF");
    campoDeAmostra.logradouro = document.getElementById("logradouro");
    campoDeAmostra.bairro = document.getElementById("bairro");
    campoDeAmostra.complemento = document.getElementById("complemento");
    pesquisa = document.getElementById("pesquisa");
    inputCEP = document.getElementById("inputCEP");

    inputCEP.addEventListener("keydown", (key) => {
        if (key.keyCode == 13) {
            event.preventDefault();
            let CEP = inputCEP.value;
            ligaFuncao(campoDeAmostra, CEP);
        }
    });

    pesquisa.addEventListener("click", () => {
        let CEP = inputCEP.value;

        if (CEP.length == 8)
        {
            ligaFuncao(campoDeAmostra, CEP);
        }
    });

}

async function ligaFuncao(campoDeAmostra, CEP) {
    let endURL = `https://api.postmon.com.br/v1/cep/${CEP}`;
    let response = await fetch(endURL);
    let result = await response.json();

    let mostraCidade = result.cidade;
    let mostraEstado = result.estado;
    let mostraLogradouro = result.logradouro;
    let mostraBairro = result.bairro;
    let mostraComplemento = result.complemento;


if (mostraBairro == "") 
{
    mostraBairro = "Sem bairro"
    campoDeAmostra.bairro.style.color = "red";
}

else {
    campoDeAmostra.bairro.style.color = "white";
}

if (mostraLogradouro == "") 
{
    mostraLogradouro = "Sem logradouro"
    campoDeAmostra.logradouro.style.color = "red";
}

else {
    campoDeAmostra.logradouro.style.color = "white";
}

if (mostraComplemento == "" || mostraComplemento == undefined)
{
    mostraComplemento = "Sem complemento"
    campoDeAmostra.complemento.style.color = "red";
}

else {
    campoDeAmostra.complemento.style.color = "white";
}

campoDeAmostra.cidadeUF.innerText = `${mostraCidade}/${mostraEstado}`;
campoDeAmostra.logradouro.innerText = `${mostraLogradouro}`;
campoDeAmostra.bairro.innerText = `${mostraBairro}`;
campoDeAmostra.complemento.innerText = `${mostraComplemento}`;
campoDeAmostra.home.removeAttribute("hidden");
}