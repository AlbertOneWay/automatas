import { instrumentos } from "./model/instrumentos.js"

document.addEventListener("DOMContentLoaded", e => {

    const automata1 = []
    const automata2 = []
    const automata3 = []



    const instrumento1 = EscogerInstrumento("guitarra")
    const instrumento2 = EscogerInstrumento("violin")
    const instrumento3 = EscogerInstrumento("acordeon")

    console.log(InstrumentoRandom());

})

function EscogerInstrumento(instrumento) {

    return instrumentos[instrumento]

}

function InstrumentoRandom() {

    let numero = Math.round(Math.random() * 10)

    if (numero === 10) numero -= 1

    console.log(numero);

    return Object.values(instrumentos)[numero]
}