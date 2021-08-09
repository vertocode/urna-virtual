let seuvotopara = document.querySelector(".d-1-1 span");
let cargo = document.querySelector(".d-1-2 span");
let descricao = document.querySelector(".d-1-4");
let aviso = document.querySelector(".d-2");
let lateral = document.querySelector(".d-1-right");
let numeros = document.querySelector(".d-1-3");

let etapaAtual = 0;
let numero = '';
let votobranco = false;
let votos = [];

function comecaretapa()
{
    let etapa = etapas[etapaAtual];

    let numeroHtml = ''
    numero = '';
    votobranco = false;
    for(let i = 0; i < etapa.numeros; i++)
    {
        if(i === 0)
        {
            numeroHtml += '<div class="numero pisca"></div>';
        }
        else{
             numeroHtml += '<div class="numero"></div>';
        }
       
    }

    seuvotopara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}
function atualizainterface()
{
   let etapa = etapas[etapaAtual];
   let candidato = etapa.candidatos.filter((item)=>{
       if(item.numero === numero)
       {
           return true;
       }
       else
       {
           return false;
       }
   })
   if(candidato.length > 0)
   {
       candidato = candidato[0];
       seuvotopara.style.display = 'block';
       aviso.style.display = 'block';
       if(numero.length == 2)
       {
         descricao.innerHTML = `Nome: ${candidato.nome} <br/> Vice: ${candidato.vice} <br/> Partido: ${candidato.partido}`  
       }
       else
       {
        descricao.innerHTML = `Nome: ${candidato.nome} <br/> Partido: ${candidato.partido}`
       }
       

       let fotosHtml = '';
       for(let i in candidato.fotos)
       {
           if(candidato.fotos[i].small)
           {
            fotosHtml += `<div class="d-1-image pisca" small>
            <img src="img/${candidato.fotos[i].url}" alt="">
            ${candidato.fotos[i].legenda}</div>`;
           }
           else
           {
                fotosHtml += `<div class="d-1-image pisca">
                        <img src="img/${candidato.fotos[i].url}" alt="">
                        ${candidato.fotos[i].legenda}</div>`;
           }
           
       }

       lateral.innerHTML = fotosHtml;
   }
   else
    {
        seuvotopara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `<div class="aviso--grande pisca">VOTO NULO<div>`
   }
}

function clicou(n)
{
    let elnumero = document.querySelector(".numero.pisca");
    if(numero !== null)
    {
        elnumero.innerHTML = n;
        numero = `${numero}${n}`;

        elnumero.classList.remove('pisca')
        if(elnumero.nextElementSibling !== null)
        { 
        elnumero.nextElementSibling.classList.add("pisca")
        }
        else
        {
            atualizainterface();
        }
    }
}
function branco()
{
    if(numero === '')
    {
        votobranco = true;
        seuvotopara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = `<div class="aviso--grande pisca">VOTO EM BRANCO<div>`
    }
    else if(numero.length > 4)
    {
        alert("Clique em 'CORRIGE' para votar em branco.")
    }
    else
    {
        alert("Para votar em BRANCO, não pode ter digitado nenhum número!")
    }

}
function corrige()
{
    comecaretapa();
}
function confirma()
{
    let etapa = etapas[etapaAtual];

    let votoconfirmado = false;
    if(votobranco === true)
    {
        votoconfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto:'branco'
        })
    }
    else if(numero.length === etapa.numeros)
    {
        votoconfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })
    }
    if(votoconfirmado == true)
    {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined)
        {
            comecaretapa();
        }
        else
        {
            document.querySelector('.tela').innerHTML = `<div class="aviso--gigante pisca">FIM<div>`
            console.log(votos);
        }
    }

}

comecaretapa();
