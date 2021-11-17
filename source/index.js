import { instrumentos } from "./model/instrumentos.js"

document.addEventListener("DOMContentLoaded", e => {


    const instrumento1 = EscogerInstrumento("guitarra")
    const instrumento2 = EscogerInstrumento("violin")
    const instrumento3 = EscogerInstrumento("acordeon")

    let instru = InstrumentoRandom()
    
    console.log(NotaRandom("guitarra")); 

    let config = LlenarConfigInicial("010111", 6);
    console.log(config);

    config = ConfigInicialRandom(LongitudRandom());
    console.log(config);
})

function CrearAutomata({notacero, notauno, instrumento, configuracionInicial}){

    if(!instrumento){
        instrumento= InstrumentoRandom()
    }
    if(!notacero){
        notacero= NotaRandom(instrumento)
    }
    if(!notauno){
        notauno= NotaRandom(instrumento)
    }
    if(!configuracionInicial.longitud){
        configuracionInicial.longitud = LongitudRandom()
    }

    configuracionInicial.longitud  

    const automata = {
        notacero: notacero,
        notauno: notauno,
        instrumento: instrumento,
        array: []
    }

}

function LlenarConfigInicial (cadena, longitud){

    if(cadena.length === longitud){

        const array = []

        cadena.split("").forEach(element => {
            array.push(parseInt(element))
        })

        return array
    } else {
        console.log("La cadena no es igual a la longitud determinada");
    }

}

function ConfigInicialRandom (longitud){

    const array = []

   for(let i=0 ; i<longitud; i++){
       const estadoAleatorio = Math.round(Math.random()) 
       array.push(estadoAleatorio)
   }

   return array
}

function EscogerLongitud(longitud){

    if(longitud > 100){
        longitud = 100
    }

    return longitud
}

function LongitudRandom(){

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

    console.log(numero);

    console.log(Object.values(instrumentos[instrumento]));

    return Object.values(instrumentos[instrumento])[numero]

}