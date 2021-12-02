import { instrumentos } from "./instrumentos.js"

export async function escucharRandom(){

    //selects

    const instrumentosList = await fetchData("./data/instrumentos.json")
    populateSelectList('#instrumentos', instrumentosList, 'value', 'name')
    populateSelectList('#instrumentos2', instrumentosList, 'value', 'name')
    populateSelectList('#instrumentos3', instrumentosList, 'value', 'name')
    

    const notas = await fetchData('./data/notas.json')
    populateSelectList('#notaUno', notas, 'value', 'name')
    populateSelectList('#notaUno2', notas, 'value', 'name')
    populateSelectList('#notaUno3', notas, 'value', 'name')
    

    populateSelectList('#notaDos', notas, 'value', 'name')
    populateSelectList('#notaDos2', notas, 'value', 'name')
    populateSelectList('#notaDos3', notas, 'value', 'name')



    const fronteras = await fetchData('./data/fronteras.json')
    populateSelectList('#fronteras', fronteras, 'value', 'name')


    //Fronteras y Longitud

    document.querySelector('#fronteras').addEventListener('click', e =>{

        if(document.getElementById('fronteras').value === "fijo"){
            document.getElementById('front').innerHTML= `<div id="labels">
            <label class="w-25 mb-3">Primer Frontera</label>
            <input placeholder="0 o 1" id="frontprim" class="w-50">
            <label class="w-25 mb-3">Ultima Frontera</label>
            <input placeholder="0 o 1" id="frontult" class="w-50"> </div>
            `
        }else if(document.getElementById('fronteras').value !== "fijo"){
           
            let quitar = document.getElementById('labels')
            if(quitar) quitar.parentNode.removeChild(quitar)
            
        }
        
    })

    
    document.querySelector('#btn_frontera').addEventListener('click', e =>{

        let valor = FronteraRandom(fronteras)
        document.getElementById('fronteras').value = valor.value
        
        if(valor.value === "fijo"){
            document.getElementById('front').innerHTML= `<div id="labels">
            <label class="w-25 mb-3">Primer Frontera</label>
            <input placeholder="0 o 1" id="frontprim" class="w-50">
            <label class="w-25 mb-3">Ultima Frontera</label>
            <input placeholder="0 o 1" id="frontult" class="w-50"> </div>
            `
        }else if(valor.value !== "fijo"){
           
            let quitar = document.getElementById('labels')
            if(quitar) quitar.parentNode.removeChild(quitar)
            
        }
    })

    document.querySelector('#btn_longitud').addEventListener('click', e =>{

        let valor = LongitudRandom()
        
        document.getElementById('longitud').value = valor
        
    })

    // Random en instrumentos

    document.querySelector('#btn_instrumento').addEventListener('click', e =>{

        let valor = InstrumentoRandom()
        document.getElementById('instrumentos').value = valor.nombre
        
    })

    document.querySelector('#btn_instrumento2').addEventListener('click', e =>{

        let valor = InstrumentoRandom()
        document.getElementById('instrumentos2').value = valor.nombre
        
    })

    document.querySelector('#btn_instrumento3').addEventListener('click', e =>{

        let valor = InstrumentoRandom()
        document.getElementById('instrumentos3').value = valor.nombre
        
    })

    //Random en notas

    document.querySelector('#btn_primernota').addEventListener('click', e =>{

        let instrumento = EscogerInstrumento(document.getElementById('instrumentos').value)
    
        let valor = NotaRandom(instrumento)
        
        document.getElementById('notaUno').value = (valor)["value"]
        
    })

    document.querySelector('#btn_segundanota').addEventListener('click', e =>{

        let instrumento = EscogerInstrumento(document.getElementById('instrumentos').value)
    
        let valor = NotaRandom(instrumento)
       
        document.getElementById('notaDos').value = (valor)["value"]
        
    })


    document.querySelector('#btn_primernota2').addEventListener('click', e =>{

        let instrumento = EscogerInstrumento(document.getElementById('instrumentos2').value)
    
        let valor = NotaRandom(instrumento)
        
        document.getElementById('notaUno2').value = (valor)["value"]
        
    })

    document.querySelector('#btn_segundanota2').addEventListener('click', e =>{

        let instrumento = EscogerInstrumento(document.getElementById('instrumentos2').value)
    
        let valor = NotaRandom(instrumento)
       
        document.getElementById('notaDos2').value = (valor)["value"]
        
    })


    document.querySelector('#btn_primernota3').addEventListener('click', e =>{

        let instrumento = EscogerInstrumento(document.getElementById('instrumentos3').value)
    
        let valor = NotaRandom(instrumento)
        
        document.getElementById('notaUno3').value = (valor)["value"]
        
    })

    document.querySelector('#btn_segundanota3').addEventListener('click', e =>{

        let instrumento = EscogerInstrumento(document.getElementById('instrumentos3').value)
    
        let valor = NotaRandom(instrumento)
       
        document.getElementById('notaDos3').value = (valor)["value"]
        
    })
    
    //Random config inicial

    document.querySelector('#btn_confi').addEventListener('click', e =>{

        let confi = ConfigInicialRandom(document.getElementById('longitud').value)
    
       
        document.getElementById('confi').value = confi.join('')
        
    })

    document.querySelector('#btn_confi2').addEventListener('click', e =>{

        let confi = ConfigInicialRandom(document.getElementById('longitud').value)
    
        console.log(confi);
       
        document.getElementById('confi2').value = confi.join('')
        
    })

    document.querySelector('#btn_confi3').addEventListener('click', e =>{

        let confi = ConfigInicialRandom(document.getElementById('longitud').value)
    
        console.log(confi);
       
        document.getElementById('confi3').value = confi.join('')
        
    })

    // regla

    document.querySelector('#btn_regla').addEventListener('click', e =>{

        let numero = Math.round((Math.random() * 255))

        console.log(numero);
       
        document.getElementById('regla').value = numero
        
    })

    document.querySelector('#btn_regla2').addEventListener('click', e =>{

        let numero = Math.round((Math.random() * 255))

        console.log(numero);
       
        document.getElementById('regla2').value = numero
        
    })

    document.querySelector('#btn_regla3').addEventListener('click', e =>{

        let numero = Math.round((Math.random() * 255))

        console.log(numero);
       
        document.getElementById('regla3').value = numero
        
    })


    
    
}

function ConfigInicialRandom (longitud){

    const array = []

   for(let i=0 ; i<longitud; i++){
       const estadoAleatorio = Math.round(Math.random()) 
       array.push(estadoAleatorio)
   }

   return array
}

function EscogerInstrumento(instrumento) {

    return instrumentos[instrumento]

}

function NotaRandom(instrumento) {
    
    let numero = Math.round((Math.random() * 6))

    if (numero === 0) numero += 1

    return Object.values(instrumento)[numero]

}

function LongitudRandom(){

    let numero = Math.round(Math.random() * 99) + 1

    return numero
}

function InstrumentoRandom() {

    let numero = Math.round(Math.random() * 10)

    if (numero === 10) numero -= 1

    return Object.values(instrumentos)[numero]

}


function FronteraRandom(fronteras) {

    let numero = Math.round(Math.random() * 3)

    if (numero === 0) numero += 1

    return fronteras[numero]

}

async function fetchData(url, data = {}) {

    if (Object.entries(data).length > 0) {
        if (!('headers' in data)) {
            data.headers = {
                'Content-Type': 'application/json'
            }
        }
        if ('body' in data) {
            data.body = JSON.stringify(data.body)
        }
    }

    const respuestas = await fetch(url, data)

    if (!respuestas.ok) {
        document.querySelector('#content').innerHTML = 'No encontramos lo que búscas <b>:(</b>'
        throw new Error(`${respuesta.status} - ${respuesta.statusText}`)
    }
    return await respuestas.json()

}

async function populateSelectList(selector, items = [], value = '', text = '') {
    let lista = document.querySelector(selector)
    lista.options.length = 0
    items.forEach(item => lista.add(new Option(item[text], item[value])))
}