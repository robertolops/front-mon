function CriaPDF() {
    var minhaTabela = document.getElementById('lista').innerHTML;
    var style = "<style>";
    style = style + "table {width: 100%;font: 20px Calibri;}";
    style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + "</style>";

    // CRIA UM OBJETO WINDOW
    var win = window.open('', '', 'height=700,width=800');
    win.document.write('<html><head>');
    win.document.write('<title> Relatório </title>');   // <title> CABEÇALHO DO PDF.
    win.document.write(style);                                     // INCLUI UM ESTILO NA TAB HEAD
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write(minhaTabela);                          // O CONTEUDO DA TABELA DENTRO DA TAG BODY
    win.document.write('</body></html>');
    win.document.close(); 	                                         // FECHA A JANELA
    win.print();                                                            // IMPRIME O CONTEUDO
}



function gerarCSV(dados) {
   
    let relatorio = document.getElementById("lista");

    if (dados == null || dados.lenght == 0) {
        relatorio.innerHTML = `<p>Nenhum registro encontrado.</p>`;
        return;
    }
    
    let csv = "";
    
    dados.forEach(resposta => {
        //csv += `${e.campo1};${e.campo2};${e.campo3};${e.campo4};${e.campo4}\n`;
        csv += `${resposta.nomeTecnico};${resposta.operadora};${resposta.pdvidsolic.nome};${resposta.data};${resposta.hora}\n`;        
    });
    let hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'solicitacoes.csv'
    hiddenElement.click();

}

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
