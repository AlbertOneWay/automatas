import { instrumentos } from "./model/instrumentos.js"
import * as CargaDom from "./model/cargasDom.js"

document.addEventListener("DOMContentLoaded", async e => {

    let longi = LongitudRandom()

    const ConfigAutomata = {
        array: ConfigInicialRandom(longi),
        Tipofrontera: "circular"
    }
    let automata1 = CrearAutomata(ConfigAutomata)
    console.log(automata1);

    dibujarArreglo('#automata-1')


    document.querySelector('#btn_aceptar').addEventListener('click', e => {

        let longitud =parseInt(document.getElementById('longitud').value)

        let frontera1= document.getElementById('fronteras').value

        let regla1 = CrearRegla(parseInt(document.getElementById('regla').value))
        
        let instrumento1 = EscogerInstrumento(document.getElementById('instrumentos').value) 
        
        let notauno1 = EscogerNota(instrumento1["nombre"], document.getElementById('notaUno').value)
        
        let notados1 = EscogerNota(instrumento1["nombre"], document.getElementById('notaDos').value)

        let nroIteraciones = parseInt(document.getElementById('iteraciones').value) 

        let array1 =  LlenarConfigInicial(document.getElementById('confi').value, longitud) 
        
        
        let automata1 = CrearAutomata(array1, notauno1, notados1, instrumento1, longitud, frontera1, regla1, nroIteraciones)
        console.log(automata1);
    })

    document.querySelector('#btn_aceptar2').addEventListener('click', e => {

        let longitud =parseInt(document.getElementById('longitud').value)

        let frontera2= document.getElementById('fronteras').value

        let regla2 = CrearRegla(parseInt(document.getElementById('regla2').value))
        
        let instrumento2 = EscogerInstrumento(document.getElementById('instrumentos2').value) 
        
        let notauno2 = EscogerNota(instrumento2["nombre"], document.getElementById('notaUno2').value)
        
        let notados2 = EscogerNota(instrumento2["nombre"], document.getElementById('notaDos2').value)

        let nroIteraciones2 = parseInt(document.getElementById('iteraciones2').value) 

        let array2 =  LlenarConfigInicial(document.getElementById('confi2').value, longitud) 
        
        
        let automata2 = CrearAutomata(array2, notauno2, notados2, instrumento2, longitud, frontera2, regla2, nroIteraciones2)
        console.log(automata2);
    })

    document.querySelector('#btn_aceptar3').addEventListener('click', e => {

        let longitud =parseInt(document.getElementById('longitud').value)

        let frontera3= document.getElementById('fronteras').value

        let regla3 = CrearRegla(parseInt(document.getElementById('regla3').value))
        
        let instrumento3 = EscogerInstrumento(document.getElementById('instrumentos3').value) 
        
        let notauno3 = EscogerNota(instrumento3["nombre"], document.getElementById('notaUno3').value)
        
        let notados3 = EscogerNota(instrumento3["nombre"], document.getElementById('notaDos3').value)

        let nroIteraciones3 = parseInt(document.getElementById('iteraciones3').value) 

        let array3 =  LlenarConfigInicial(document.getElementById('confi3').value, longitud) 
        
        
        let automata2 = CrearAutomata(array3, notauno3, notados3, instrumento3, longitud, frontera3, regla3, nroIteraciones3)
        console.log(automata2);
    })
    

    let doms = CargaDom.escucharRandom()

})

function RecorrerAutomata(nroiteraciones) {

    for (let i = 0; i < nroiteraciones; i++) {
        IteracionAutomata()
    }
}

function IteracionAutomata() {
    array
}

function CrearAutomata( array, notacero, notauno, instrumento, longitud, Tipofrontera, Nuevaregla, nroiteraciones ) {

    console.log(array, notacero, notauno, instrumento, longitud, Tipofrontera, Nuevaregla, nroiteraciones);
    if (!instrumento) {
        instrumento = InstrumentoRandom()
    }
    if (!notacero) {
        notacero = NotaRandom(instrumento)
    }
    if (!notauno) {
        notauno = NotaRandom(instrumento)
    }
    if (!longitud) {
        longitud = LongitudRandom()
    }

    let fronteras = EscogerFrontera(Tipofrontera, array)

    const automata = {
        notacero: notacero,
        notauno: notauno,
        instrumento: instrumento,
        fronteras: fronteras,
        array: array,
        regla: Nuevaregla,
        nroiteraciones: nroiteraciones
    }

    return automata
}

const EscogerFrontera = (frontera, arreglo) => {

    const fronteras = {}


    if (frontera === "circular") {
        fronteras.primerfrontera = arreglo[arreglo.length - 1]
        fronteras.ultimafrontera = arreglo[0]
    } else if (frontera === "espejo") {
        fronteras.primerfrontera = arreglo[0]
        fronteras.ultimafrontera = arreglo[arreglo.length - 1]
    } else if (frontera === "fijo") {
        fronteras.primerfrontera = parseInt(document.getElementById('frontprim').value) 
        fronteras.ultimafrontera = parseInt(document.getElementById('frontult').value)
    }

    return fronteras
}

function LlenarConfigInicial(cadena, longitud) {

    if (cadena.length === longitud) {

        const array = []

        cadena.split("").forEach(element => {
            array.push(parseInt(element))
        })

        return array
    } else {
        console.log("La cadena no es igual a la longitud determinada");
    }

}

function ConfigInicialRandom(longitud) {

    const array = []

    for (let i = 0; i < longitud; i++) {
        const estadoAleatorio = Math.round(Math.random())
        array.push(estadoAleatorio)
    }

    return array
}

function EscogerLongitud(longitud) {

    if (longitud > 100) {
        longitud = 100
    }

    return longitud
}

function LongitudRandom() {

    let numero = Math.round(Math.random() * 99) + 1

    return numero
}


function EscogerInstrumento(instrumento) {

    return instrumentos[instrumento]

}

function InstrumentoRandom() {

    let numero = Math.round(Math.random() * 10)

    if (numero === 10) numero -= 1

    console.log(numero);

    return Object.values(instrumentos)[numero]

}

function EscogerNota(instrumento, nota) {

    return instrumentos[instrumento][nota]

}

function NotaRandom(instrumento) {

    let numero = Math.round((Math.random() * 5));
    
    if (numero === 0) numero += 1

    return Object.values(instrumento)[numero]

}

function CrearRegla(regla) {
    const objetoRegla = new Map()
    objetoRegla.set('000', 0)
    objetoRegla.set('001', 0)
    objetoRegla.set('010', 0)
    objetoRegla.set('011', 0)
    objetoRegla.set('100', 0)
    objetoRegla.set('101', 0)
    objetoRegla.set('110', 0)
    objetoRegla.set('111', 0)

    for (const reglaIndice of objetoRegla.keys()) {
        let binario = 0
        const moduloRegla = regla % 2

        if (moduloRegla > 0) {
            binario = 1
        }
        regla = parseInt(regla / 2)

        objetoRegla.set(reglaIndice, binario)
    }

    return objetoRegla
}
async function populateSelectList(selector, items = [], value = '', text = '') {
    let lista = document.querySelector(selector)
    lista.options.length = 0
    items.forEach(item => lista.add(new Option(item[text], item[value])))
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

async function dibujarArreglo(canvasAutomataId) {
    let arregloNotas = [1, 0, 1, 0, 0, 1, 1, 0, 0];

    const canvasAutomata = document.querySelector(`${canvasAutomataId}`);
    let context = canvasAutomata.getContext('2d');

    const anchoRectangulo = canvasAutomata.width / arregloNotas.length;

    let coordenadaYActual = 10;

    while (true) {
        let coordenadaXActual = 0;
        for (const nota of arregloNotas) {
            if (nota === 0) {
                await insertarElemento(context, "blue", coordenadaXActual, coordenadaYActual, anchoRectangulo, 10)
            } else if (nota === 1) {                
                await insertarElemento(context, "yellow", coordenadaXActual, coordenadaYActual, anchoRectangulo, 10)
            }

            coordenadaXActual += anchoRectangulo;
        }

        coordenadaYActual += 10;

        // Se crea el nuevo arreglo según las reglas
        // arregloNotas = [0, 0, 1, 1, 0, 0, 1, 0, 1];

        if (coordenadaYActual > canvasAutomata.height) {
            coordenadaYActual = 10;
        }
        
    }
}

function insertarElemento(ctx, color, cordX, cordY, width, height) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            ctx.beginPath()
            ctx.fillStyle = color
            ctx.fill()
            ctx.clearRect(cordX, cordY, width, height)
            ctx.fillRect(cordX, cordY, width, height)
            ctx.closePath()

            resolve(true)
        }, 1000);
    })
}

