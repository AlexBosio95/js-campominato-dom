// Consegna
// Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco
// (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina.
// Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.



const arrayBombe = [];

// Prendo il bottone
const btnPlay = document.querySelector('#btn-play');


// Prendo il contenitore dei box
const gridContainer = document.querySelector('.container .grid-container');


// Bottone Play Game (crea la griglia)
btnPlay.addEventListener('click', function () {

    // Reset del container
    gridContainer.innerHTML = '';

    // Prendo selettore difficoltà
    const difficultySel = parseInt(document.querySelector('#sel-difficulty').value);

    console.log(difficultySel)

    // variabile numero di celle
    let numberCell;

    // variabile numero di righe
    let rowForCell;


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

    for (let i = 0; i < numberCell; i++) {
        const newBox = makeBox();
        newBox.classList.add('box', 'text-white', 'd-flex', 'justify-content-center', 'align-items-center')

        if (difficultySel == 1){
            newBox.classList.add('box-st')
        } else if (difficultySel == 2){
            newBox.classList.add('box-h')
        }

        newBox.innerHTML = i + 1;

        gridContainer.append(newBox);
        // click sul box
        clikElement(newBox, i + 1);
    }

})


// Funzione che crea un box
function makeBox() {
    let makeNewBox = document.createElement('div');
    return makeNewBox;
}

// funzione click su box
function clikElement(htmlElement, index) {
    htmlElement.addEventListener('click', function () {
        htmlElement.classList.toggle('box-click')
        console.log(index)
    })
}

// funzione generazione numero
function numGenerator(array, min, max) {
    array = Math.floor(Math.random() * (max - min) + min);
    return array;
}