// Consegna
// Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco
// (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina.
// Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.





// Prendo il bottone
const btnPlay = document.querySelector('#btn-play');

const numberBox = document.getElementById('number-box');

// Prendo il contenitore dei box
const gridContainer = document.querySelector('.container .grid-container');

// Prendo il tag dove scrivere win or lost
const resultUser = document.getElementById('risultato');

// Prendo il tag per il risultato
const scoreUser = document.getElementById('score');

// Prendo il testo che decrive il gioco
const txtDesc = document.getElementById('text-desc')

// Bottone Play Game (crea la griglia)
btnPlay.addEventListener('click', function () {

    // Array che contine il box cliccati validi e le bombe generate
    const numeriClick = [];

    // Array che contiene le bombe generate
    const arrayBombe = [];

    // reset stringa del risultato
    resultUser.innerHTML = '';

    // reset stringa dei punti
    scoreUser.innerHTML = '';

    numberBox.innerHTML = '';

    // Inizializza le classi della griglia
    gridContainer.classList.remove('opacity-50')

    // Nascondo il testo descrizione gioco
    txtDesc.classList.add('d-none');

    // contatore risultato
    let result = 0;

    // play on (se la partita è acncora valida)
    let isPlay = true;

    // Reset del container griglia
    gridContainer.innerHTML = '';

    // Prendo selettore difficoltà
    const difficultySel = parseInt(document.querySelector('#sel-difficulty').value);

    // variabile numero di celle
    let numberCell;

    // variabile numero di righe
    let rowForCell;

    // Box in base alla selezione di difficoltà
    switch (difficultySel) {
        case 0:
        default:
            numberCell = 100;
            rowForCell = 10;
            break;

        case 1:
            numberCell = 81;
            rowForCell = 9;
            break;

        case 2:
            numberCell = 49;
            rowForCell = 7;
            break;
    }

    // Popolo l'array dove saranno messe le bombe
    for (let i = 0; i < 16; i++) {
        let min = 1;
        let max = numberCell;
        numGenerator(arrayBombe, min, max, numeriClick)
    }

    // Rappresentazione in console della posizione bombe
    arrayBombe.sort()
    console.table(arrayBombe)

    numberBox.innerHTML = ('<i class="fa-solid fa-table-cells-large"></i>' + ' N° ' + numberCell)

    // Crea tutti i box
    for (let i = 1; i < numberCell + 1; i++) {
        const newBox = makeBox();
        newBox.classList.add('box', 'text-white', 'd-flex', 'justify-content-center', 'align-items-center')

        if (difficultySel == 1) {
            newBox.classList.add('box-st')
        } else if (difficultySel == 2) {
            newBox.classList.add('box-h')
        }

        // Rappresentazione di tutti i numeri in griglia
        newBox.innerHTML = i;

        gridContainer.append(newBox);

        // Evento click sul box
        newBox.addEventListener('click', function () {

            if (isPlay) {

                // inpedisce di caricare il numero 2 volte
                if (!newBox.classList.contains('box-click')) {

                    // se si clicca su una bomba
                    if (arrayBombe.includes(i)) {
                        newBox.classList.add('box-click-bomb')
                        isPlay = false;
                        resultUser.innerHTML = `${'<i class="fa-solid fa-bomb"></i>'} You lost!`
                        scoreUser.innerHTML =  `Score =  ${result} ${'<i class="fa-solid fa-star"></i>'}`
                        gridContainer.classList.add('opacity-50')

                    } else {

                        // Carica il numero nell'array
                        if ((numeriClick.length == numberCell - 1)) {
                            resultUser.innerHTML = `${'<i class="fa-solid fa-face-laugh-wink"></i>'} You Winn!`
                            scoreUser.innerHTML =  `Score =  ${result} ${'<i class="fa-solid fa-star"></i>'}`
                            console.log(numeriClick.length);
                            isPlay = false;
                        } else {
                            newBox.classList.add('box-click')
                            // console.log('hai cliccato = ' + i)
                            numeriClick.push(i)
                            result++;
                            console.log(numeriClick.length)

                        }
                    }
                }

            }


        })
    }

})


// Funzione che crea un box
function makeBox() {
    let makeNewBox = document.createElement('div');
    return makeNewBox;
}


// funzione generazione numero in array
function numGenerator(array, min, max, arraypoint) {
    let numberGen;
    let isValid = false;

    while (isValid == false) {

        numberGen = Math.floor(Math.random() * ((max + 1) - min) + min);

        if (array.includes(numberGen) == false) {
            array.push(numberGen);
            arraypoint.push(numberGen);
            isValid = true
        }
    }

}
