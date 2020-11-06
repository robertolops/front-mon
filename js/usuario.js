//const URL="https://java-api-spring-bot.herokuapp.com/validacpf?cpf="

function filtrar1(){

    fetch(API+"/data/" +
    document.getElementById("datainicio").value + 
    "/" + document.getElementById("datafim").value)
        .then(res => res.json())
        .then(res => montartabela(res));
//        .catch(err => {
  //          window.alert("Erro na busca da tabela!");
    //    });


    }

    function montartabela(lista){
    //    window.alert(lista);
        var tabela = 
        "<table class='table' border'1' align='center' width='80%' cellspacing='2'>" + 
        "<tr>" +
        "<th>Data</th> " +
        "<th>Alarme</th>" +
        "<th>Equipamento</th>" +
        "</th>";

        for (cont=0;cont<lista.length;cont++){
            tabela+=
            "<tr>" +
            "<td>" + lista[cont].data + "</td>" +
            "<td>" + lista[cont].alarme.nome + "</td>" +
            "<td>" + lista[cont].equipamento.ip + "</td></tr>";

            
        }

        tabela+="</table>";
        document.getElementById("lista").innerHTML=tabela;

    }



function filtrarcontagem(){

    fetch(API+"/contagem/" +
    document.getElementById("datainicio").value + 
    "/" + document.getElementById("datafim").value)
        .then(res => res.json())
        .then(res => montartabelacontagem(res));
//        .catch(err => {
  //          window.alert("Erro na busca da tabela!");
    //    });


    }

    

    function montartabelacontagem(lista){
        var tabela = 
        "<table class='table' border'1' align='center' width='80%' cellspacing='2'>" + 
        "<tr>" +
        "<th>Alarme</th> " +
        "<th> QTD no Período </th>" +
        "</th>";

        for (cont=0;cont<lista.length;cont+=2){
            tabela+=
            "<tr>" +
            "<td>" + lista[cont] + "</td>" +
            "<td>" + lista[cont+1] + "</td></tr>";

        }

        tabela+="</table>";
        document.getElementById("resultado").innerHTML=tabela;

    }






function filtrar(){
    var valor =  document.getElementById("cmbfiltrorel").value;
   
    if (valor == 1){
        window.location.href = "relatorioev.html";

    } 
    else if(valor == 0) {
        window.location.href = "relatorioal.html";

    }
   
   // fetch("http://localhost:8080/lancamento/" + valor)
   //     .then(res=>res.json())
    //    .then(res=>preencherMusicas(res))
    //    .catch(err => {
     //       window.alert("teste!");
      //  });
}





function carregarusuario(){
    var usuario = localStorage.getItem("usuariologado");
    if (usuario==null){
        window.location="https://front-mon1.herokuapp.com/";
    }else{
        var usuarioJson = JSON.parse(usuario);
        document.getElementById("dados").innerHTML = 
        "<h3>Nome: " + usuarioJson.nome + " <br>Email: " + usuarioJson.email + "teste" + "</h3>" ;
        document.getElementById("foto").innerHTML=
        "<img width='25%' heigth='25%' alt='Sem foto' src=imagens/" + usuarioJson.foto + ">";
    }
}


function logar(){
    var usuario = {
        email : document.getElementById("txtemail").value ,
        senha : document.getElementById("txtsenha").value 
    };

    var conteudo = {
        method : "POST",
        body : JSON.stringify(usuario),
        headers : {
            "Content-type": "application/json"
        }
    };

    fetch(API+"/login", conteudo)
        .then(res => res.json())
        .then(res => {
            localStorage.setItem("usuariologado",JSON.stringify(res));
            window.location="https://front-mon1.herokuapp.com/usuario.html";
        })
        .catch(err => {
            window.alert("Deu ruim");
        });


}
