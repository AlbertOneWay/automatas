import { instrumentos } from "./model/instrumentos.js"
import * as CargaDom from "./model/cargasDom.js"

document.addEventListener("DOMContentLoaded", async e => {

    let longi = LongitudRandom()

    const ConfigAutomata = {
        array: ConfigInicialRandom(longi),
        Tipofrontera: "Circular"
    }
    let automata1=  CrearAutomata(ConfigAutomata)

    console.log(automata1);


    document.querySelector('#btn_aceptar').addEventListener('click', e =>{

    })

    
    

    const instrumentosList = await fetchData("./data/instrumentos.json")
    populateSelectList('#instrumentos', instrumentosList, 'value', 'name')
    populateSelectList('#instrumentos2', instrumentosList, 'value', 'name')
    populateSelectList('#instrumentos3', instrumentosList, 'value', 'name')
    const instrumento = document.querySelector('#instrumentos')

    instrumento.addEventListener('change', e => {
        const list = e.target
        const item = list.options[list.selectedIndex]
        console.log(instrumento[list.selectedIndex].value, instrumento[list.selectedIndex].text);
    })

    const notas = await fetchData('./data/notas.json')
    populateSelectList('#notaUno', notas, 'value', 'name')
    populateSelectList('#notaUno2', notas, 'value', 'name')
    populateSelectList('#notaUno3', notas, 'value', 'name')
    const notaUno = document.querySelector('#notaUno')

    populateSelectList('#notaDos', notas, 'value', 'name')
    populateSelectList('#notaDos2', notas, 'value', 'name')
    populateSelectList('#notaDos3', notas, 'value', 'name')
    const notaDos = document.querySelector('#notaDos')


    notaUno.addEventListener('change', e => {
        const list = e.target
        const item = list.options[list.selectedIndex]
        console.log(notaUno[list.selectedIndex].value, notaUno[list.selectedIndex].text);
    })

    notaDos.addEventListener('change', e => {
        const list = e.target
        const item = list.options[list.selectedIndex]
        console.log(notaDos[list.selectedIndex].value, notaDos[list.selectedIndex].text);
    })

    const fronteras = await fetchData('./data/fronteras.json')
    populateSelectList('#fronteras', fronteras, 'value', 'name')
   


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

function CrearAutomata({ array, notacero, notauno, instrumento, longitud, Tipofrontera, regla, nroiteraciones }) {

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
    let regla = CrearRegla(regla)

    const automata = {
        notacero: notacero,
        notauno: notauno,
        instrumento: instrumento,
        fronteras: fronteras,
        array: array,
        regla
    }

    return automata
}

const EscogerFrontera = (frontera, arreglo) => {

    const fronteras = {}


    if (frontera === "Circular") {
        fronteras.primerfrontera = arreglo[arreglo.length - 1]
        fronteras.ultimafrontera = arreglo[0]
    } else if (frontera === "Espejo") {
        fronteras.primerfrontera = arreglo[0]
        fronteras.ultimafrontera = arreglo[arreglo.length - 1]
    } else if (frontera === "Fijo") {
        fronteras.primerfrontera = ""
        fronteras.ultimafrontera = ""
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

    let numero = Math.round((Math.random() * 4));

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
