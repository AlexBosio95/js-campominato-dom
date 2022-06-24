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


// Prendo il contenitore dei box
const gridContainer = document.querySelector('.container .grid-container');

// Prendo il tag dove scrivere il risultato
const resultUser = document.getElementById('risultato');


// Bottone Play Game (crea la griglia)
btnPlay.addEventListener('click', function () {

    const numeriClick = [];

    const arrayBombe = [];


    resultUser.innerHTML = '';

    // risultato
    let result = 0;

    // play on
    let isPlay = true;

    // Reset del container
    gridContainer.innerHTML = '';

    // Prendo selettore difficoltà
    const difficultySel = parseInt(document.querySelector('#sel-difficulty').value);

    // variabile numero di celle
    let numberCell;

    // variabile numero di righe
    let rowForCell;

    let somma = 0;


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

    console.log(numberCell)

        // Popolo l'array dove saranno messe le bombe
        for (let i = 0; i < 16; i++) {
            let min = 1;
            let max = numberCell;
            numGenerator(arrayBombe, min, max, numeriClick)
    
        }
    
        arrayBombe.sort()
        console.table(arrayBombe)

    // console.log(numeriClick)


    // Crea tutti i box
    for (let i = 1; i < numberCell + 1; i++) {
        const newBox = makeBox();
        newBox.classList.add('box', 'text-white', 'd-flex', 'justify-content-center', 'align-items-center')

        if (difficultySel == 1) {
            newBox.classList.add('box-st')
        } else if (difficultySel == 2) {
            newBox.classList.add('box-h')
        }

        newBox.innerHTML = i;

        gridContainer.append(newBox);

        // Evento click sul box
        newBox.addEventListener('click', function () {
            
            let somma = 0;

            if (isPlay) {

                // inpedisce di caricare il numero 2 volte
                if (!newBox.classList.contains('box-click')) {

                    // se si clicca su una bomba
                    if (arrayBombe.includes(i)) {
                        newBox.classList.add('box-click-bomb')
                        isPlay = false;
                        resultUser.innerHTML = ('Hai preso una bomba gioco finito! = ' + result)
                    } else {

                        console.log(numberCell)

                        // Carica il numero nell'array
                        if ((numeriClick.length == numberCell - 1)) {
                            resultUser.innerHTML = ('Hai vinto la partita')
                            console.log(numeriClick.length);
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

            // console.log(numeriClick)

            // sumArray(numeriClick, somma)

            // for (let i = 0; i < numeriClick.length; i++) {
            //     somma += numeriClick[i];
                
            // }

            // console.log(somma)
            

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

// funzione somma array 
function sumArray(array, sum) {
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }
}