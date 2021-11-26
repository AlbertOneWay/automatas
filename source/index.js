import { instrumentos } from "./model/instrumentos.js"

document.addEventListener("DOMContentLoaded", e => {

    let longi = LongitudRandom()

    const ConfigAutomata = {
        array: ConfigInicialRandom(longi),
        Tipofrontera: "Circular"
    }

    let automata1 = CrearAutomata(ConfigAutomata)
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