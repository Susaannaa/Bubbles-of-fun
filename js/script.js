let punteggio = 0;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const altezzaPavimento = 0;

window.addEventListener('load', () => {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 10);});

    function inizio_gioco(){

        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
          });
    }

    function spiegazione(){      
            Swal.fire({
                title: "Come funziona?",
                text: "In questo gioco, il tuo compito sarà quello di schiacciare la bolla del colore richiesto, tramite la quale accederai a 3 differenti sfide che ti permetteranno di apprendere delle nuove nozioni!",
                icon: "question"
            });
            }

    function spiegazione_1(){      
        Swal.fire({
            title: "Come funziona?",
            text: "Ricorda di guardare la prima lettera delle parole che vuoi selezionare e assicurati che siano uguali a quelle rappresentate nel riquadro",
            icon: "question"
        });
        }

        function spiegazione_2(){      
            Swal.fire({
                title: "Come funziona?",
                text: "Ricorda che le figure che devi creare in ordine sono: un quadrato, un trapezio, un cerchio e una stella.",
                icon: "question"
            });
            }

            function spiegazione_3(){      
                Swal.fire({
                    title: "Come funziona?",
                    text: "Trascina la figura con 3 lati dentro il primo contenitore sulla sinistra, quella di 4 lati nel secondo e così va...",
                    icon: "question"
                });
            }

    function giusto1(){
        Swal.fire({
            title: "Brav* hai indovinato... ma facciamo un ripasso!",
            text: "Le figure che hai creato rappresentano in ordine: un quadrato, un trapezio, un cerchio e una stella.",
            imageUrl: "img/figure.png",
            imageWidth: 300,
            imageHeight: 100,
            imageAlt: "Custom image"
          }).then((result) => {
            if (result.isConfirmed) {
                chiudi_gioco2();
                punteggio+=4;
                console.log(punteggio)

            }
        });

    }

    function giusto2(){
        Swal.fire({
            title: "Brav* hai indovinato... ma facciamo un ripasso!",
            text: "Le figure che hai ordinato rappresentano in ordine: un triangolo(3 lati), un rombo(4 lati), un pentagono(5 lati), un esagono(6 lati) e un ettagono(7 lati).",
            imageUrl: "img/figure2.png",
            imageWidth: 500,
            imageHeight: 100,
            imageAlt: "Custom image"
          }).then((result) => {
            if (result.isConfirmed) {
                punteggio+=5;
                chiudi_gioco3();

            }
        });
        console.log(punteggio)

    }

    
    function sbagliato2(x){
        Swal.fire({
            title: "Ops... meglio se facciamo un ripasso!",
            text: "Le figure che avresti dovuto ordinare come nell'immagine qui sopra rappresentano in ordine: un triangolo(3 lati), un rombo(4 lati), un pentagono(5 lati), un esagono(6 lati) e un ettagono(7 lati).",
            imageUrl: "img/figure2.png",
            imageWidth: 500,
            imageHeight: 100,
            imageAlt: "Custom image"
          }).then((result) => {
            if (result.isConfirmed) {
                chiudi_gioco3();
                punteggio+=x;

            }
        });
        console.log(punteggio)
    }

    function sbagliato1(x){
        if(x>1){
        Swal.fire({
            title: "Ops... hai unito soltanto "+ x+" figure, meglio se facciamo un ripasso!",
            text: "Le figure che avresti dovuto rappresentare erano quelle dell'immagine qua su, e in ordine sono: un quadrato, un trapezio, un cerchio e una stella.",
            imageUrl: "img/figure.png",
            imageWidth: 300,
            imageHeight: 100,
            imageAlt: "Custom image"
          }).then((result) => {
            if (result.isConfirmed) {
                chiudi_gioco2();
                punteggio+=(4-x);

            }
        });}
        else if(x==1){
        Swal.fire({
            title: "Ops... hai unito solo 1 figura, meglio se facciamo un ripasso!",
            text: "Le figure che avresti dovuto rappresentare erano quelle dell'immagine qua su, e in ordine sono: un quadrato, un trapezio, un cerchio e una stella.",
            imageUrl: "img/figure.png",
            imageWidth: 300,
            imageHeight: 100,
            imageAlt: "Custom image"
          }).then((result) => {
            if (result.isConfirmed) {
                chiudi_gioco2();
                punteggio+=1;

            }
        });}
        else{
            Swal.fire({
                title: "Ops... non hai unito nessuna figura, meglio se facciamo un ripasso!",
                text: "Le figure che avresti dovuto rappresentare erano quelle dell'immagine qua su, e in ordine sono: un quadrato, un trapezio, un cerchio e una stella.",
                imageUrl: "img/figure.png",
                imageWidth: 300,
                imageHeight: 100,
                imageAlt: "Custom image"
              }).then((result) => {
                if (result.isConfirmed) {
                    chiudi_gioco2();    
                }
            });}
            console.log(punteggio)

        }
                
    
colore = ['rgb(255, 0, 0)', 'rgb(255, 255, 0)', 'rgb(0, 128, 0)', 'rgb(0, 0, 255)', 'rgb(255, 125, 0)', 'rgb(128, 0, 128)', 'rgb(0, 0, 0)', 'rgb(255, 192, 203)', 'rgb(139, 69, 19)', 'rgb(128, 128, 128)'];
colore_nomi = ['rosso', 'giallo', 'verde', 'blu', 'arancione', 'viola', 'nero', 'rosa', 'marrone', 'grigio'];
bolle = [];
k = 0;
y=0;
for (let i = 0; i < 10; i++) {
    bolla = {
        raggio: 60, 
        x:Math.random() * (canvas.clientWidth -2 * 60) + 60,
        y:Math.random() * (canvas.clientHeight -2 * 60) + 60,
        dx : (Math.random() - 0.2) * 3,
        dy : (Math.random() - 0.2) * 3,
        colore : colore[i],
        gravità:0,
        attrito:0.8,
    };
    bolle.push(bolla);
    k+=40;

}

// Funzione per disegnare una bolla
function disegnaBolla(bolla) {
    ctx.beginPath();
    ctx.arc(bolla.x, bolla.y, bolla.raggio, 0, Math.PI * 2);
    ctx.fillStyle = bolla.colore;
    ctx.fill();
    ctx.closePath();
}

// Adatta il canvas alle dimensioni della finestra
function resizeCanvas() {
    canvas.width = window.innerWidth * 0.89;
    canvas.height = window.innerHeight * 0.815;
}

// Ridimensiona il canvas all'avvio e quando la finestra viene ridimensionata
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Chiamato all'inizio per adattare il canvas alle dimensioni correnti


// Funzione per aggiornare una bolla
function aggiornaBolla(bolla) {
    // Aggiungiamo la gravità
    bolla.dy += bolla.gravità;

    // Aggiorniamo la posizione della bolla
    bolla.x += bolla.dx;
    bolla.y += bolla.dy;

    // Rimbalzo contro le pareti laterali
    if (bolla.x + bolla.raggio > canvas.width || bolla.x - bolla.raggio < 0) {
        bolla.dx = -bolla.dx;
    }

    // Rimbalzo contro il bordo superiore
    if (bolla.y - bolla.raggio < 0) {
        bolla.y = bolla.raggio;  // Impostiamo la posizione esatta al bordo
        bolla.dy = -bolla.dy * bolla.attrito;  // Aggiungiamo attrito nel rimbalzo
    }

    // Rimbalzo contro il pavimento
    if (bolla.y + bolla.raggio > canvas.height - altezzaPavimento) {
        bolla.y = canvas.height - altezzaPavimento - bolla.raggio;
        bolla.dy = -bolla.dy * bolla.attrito;  // Aggiungiamo attrito nel rimbalzo
    }

    // Evitiamo che la bolla continui a rimbalzare infinitamente
    if (Math.abs(bolla.dy) < 0.1) {
        bolla.dy = 0;
    }
}



// Funzione per gestire le collisioni tra le bolle
function gestisciCollisioni() {
    // Controlliamo ogni coppia di bolle
    for (let i = 0; i < bolle.length; i++) {
        for (let j = i + 1; j < bolle.length; j++) {
            const distanza = bolle[i].raggio + bolle[j].raggio; // Distanza totale per evitare sovrapposizione
            const dx = bolle[i].x - bolle[j].x; // Differenza sulla x tra le 2 bolle
            const dy = bolle[i].y - bolle[j].y; // Differenza sulla y tra le 2 bolle
            const distanzaAttuale = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
            // Controlliamo se le bolle si sovrappongono
            if (distanzaAttuale < distanza) {
                // Invertiamo la velocità delle bolle
                bolle[i].dx = -bolle[i].dx;
                bolle[i].dy = -bolle[i].dy; 
                bolle[j].dx = -bolle[j].dx; 
                bolle[j].dy = -bolle[j].dy;
                // Spostiamo ogni bolla in direzione opposta
                const sovrap = distanza - distanzaAttuale;
                bolle[i].x += (dx / distanzaAttuale) * (sovrap / 2);
                bolle[i].y += (dy / distanzaAttuale) * (sovrap / 2); 
                bolle[j].x -= (dx / distanzaAttuale) * (sovrap / 2); 
                bolle[j].y -= (dy / distanzaAttuale) * (sovrap / 2); 
            }
        }
    }
}

x = 0;
y = 10;
colore = "ciao";
function richiesta() {
    y = colore_nomi.length;
    if (y > 1) {
        x = parseInt(Math.random() * y);
        console.log(x);
        const request = document.getElementById("richiesta");
        request.innerHTML = "Cliccare la bolla di colore " + colore_nomi[x] + " per risolvere una sfida!";
        colore = colore_nomi[x];
    }
}
turno = 0;
function controlla_click(colore_click){
    console.log(colore);
    console.log(colore_click);
    if(colore == colore_click){
        turno++;
        if(turno == 1)
        gioco_1();
    else if(turno == 2)
        gioco_2();
    else if(turno == 3)
        gioco_3();
    }
    else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Hai cliccato il colore sbagliato, riprovare!",
          });
    }

}

function scoppiaBolla(bolla, index, colore_click) {
    const animazione = setInterval(() => {
        bolla.raggio -= 5;
        bolla.opacità -= 0.05;
        if (bolla.raggio <= 0 || bolla.opacità <= 0) {
            clearInterval(animazione);
            bolle.splice(index, 1);
            colore_nomi.splice(index, 1);
            if(colore_click == colore)
                richiesta();
        }
    }, 15);
}

canvas.addEventListener('click', (event) => {
    const click_X = event.clientX - canvas.getBoundingClientRect().left;
    const click_y = event.clientY - canvas.getBoundingClientRect().top;
    // Controlla se il click è su una bolla
    bolle.forEach((bolla, index) => {
        const dist = Math.sqrt(Math.pow(click_X - bolla.x,2)  + Math.pow(click_y - bolla.y,2));
        if (dist < bolla.raggio) {

            controlla_click(colore_nomi[index]);
            scoppiaBolla(bolla, index, colore_nomi[index]);
        }
    });
});

canvas.addEventListener('mousemove', (event) => {
    const click_X = event.clientX - canvas.getBoundingClientRect().left;
    const click_Y = event.clientY - canvas.getBoundingClientRect().top;

    // Variabile per tenere traccia se il cursore è su una bolla
    let isOnBubble = false;

    // Controlla se il cursore è su una bolla
    bolle.forEach((bolla, index) => {
        const dist = Math.sqrt(Math.pow(click_X - bolla.x, 2) + Math.pow(click_Y - bolla.y, 2));
        if (dist < bolla.raggio) {
            isOnBubble = true;
        }
    });

    // Cambia il cursore in base al risultato
    canvas.style.cursor = isOnBubble ? 'pointer' : 'default';
});


// Funzione principale per l'animazione
function anima() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Puliamo il canvas

    // Disegniamo e aggiorniamo ogni bolla
    bolle.forEach((bolla) => {
        disegnaBolla(bolla);
        aggiornaBolla(bolla);
    });

    gestisciCollisioni();
    requestAnimationFrame(anima);  // Continuiamo l'animazione
}

anima();
richiesta();

var canvas1 = document.getElementById('canvas_1');
var ctx1 = canvas1.getContext('2d');
const posizioneComune = { x: 50, y: 50 };
let lettere = [
    {
        lettera: 'C',
        punti: [
            { x: posizioneComune.x + 0, y: posizioneComune.y + 0 },   // Linea superiore
            { x: posizioneComune.x + 100, y: posizioneComune.y + 0 }, // Fine della linea superiore
            { x: posizioneComune.x + 100, y: posizioneComune.y + 30 }, // Linea verticale
            { x: posizioneComune.x + 30, y: posizioneComune.y + 30 },  // Linea verticale superiore
            { x: posizioneComune.x + 30, y: posizioneComune.y + 170 }, // Inizio linea verticale inferiore
            { x: posizioneComune.x + 100, y: posizioneComune.y + 170 }, // Base inferiore
            { x: posizioneComune.x + 100, y: posizioneComune.y + 200 }, // Fine linea inferiore
            { x: posizioneComune.x + 0, y: posizioneComune.y + 200 }   // Chiusura inferiore
        ],
        coloreRiempimento: '#e0f7fa',
        coloreContorno: 'black',
        spostamento: 0
    },
    {
        lettera: 'A',
        punti: [
            { x: 150, y: 50 }, { x: 80, y: 250 }, { x: 110, y: 250 }, { x: 130, y: 200 },
            { x: 170, y: 200 }, { x: 190, y: 250 }, { x: 220, y: 250 }
        ],
        curve: [],
        coloreRiempimento: '#e0f7fa',
        coloreContorno: 'black',
        spostamento: 0,
        interno: {
            x1: 135, y1: 170,   
            x2: 165, y2: 170,   
            x3: 150, y3: 120   
        }
    },
    {
        lettera: 'P',
        punti: [
            { x: 80, y: 50 },  
            { x: 80, y: 250 },  
            { x: 110, y: 250 }, 
            { x: 110, y: 160 },
            { x: 160, y: 160 },
            { x: 160, y: 105 },
            { x: 160, y: 50 }   
        ],
        coloreRiempimento: '#e0f7fa',
        coloreContorno: 'black',
        spostamento: 0,
        interno: {
            x1: 110, y1: 70,  
            x2: 150, y2: 70,  
            x3: 150, y3: 140,  
            x4: 110, y4: 140  
        }
    },
    {
        lettera: 'Z',
        punti: [
            { x: posizioneComune.x + 40, y: posizioneComune.y + 0 },
            { x: posizioneComune.x + 160, y: posizioneComune.y + 0 },
            { x: posizioneComune.x + 160, y: posizioneComune.y + 30 },
            { x: posizioneComune.x + 70, y: posizioneComune.y + 170 },
            { x: posizioneComune.x + 160, y: posizioneComune.y + 170 },
            { x: posizioneComune.x + 160, y: posizioneComune.y + 200 },
            { x: posizioneComune.x + 40, y: posizioneComune.y + 200 },
            { x: posizioneComune.x + 40, y: posizioneComune.y + 170 },
            { x: posizioneComune.x + 130, y: posizioneComune.y + 30 },
            { x: posizioneComune.x + 40, y: posizioneComune.y + 30 }
        ],
        coloreRiempimento: '#e0f7fa',
        coloreContorno: 'black',
        spostamento: 0,
        interno: null
    },
    {
        lettera: 'M',
        punti: [
            { x: posizioneComune.x + 20, y: posizioneComune.y + 200 },
            { x: posizioneComune.x + 20, y: posizioneComune.y + 0 },
            { x: posizioneComune.x + 60, y: posizioneComune.y + 0 },
            { x: posizioneComune.x + 100, y: posizioneComune.y + 70 },
            { x: posizioneComune.x + 140, y: posizioneComune.y + 0 },
            { x: posizioneComune.x + 180, y: posizioneComune.y + 0 },
            { x: posizioneComune.x + 180, y: posizioneComune.y + 200 },
            { x: posizioneComune.x + 140, y: posizioneComune.y + 200 },
            { x: posizioneComune.x + 140, y: posizioneComune.y + 50 },
            { x: posizioneComune.x + 100, y: posizioneComune.y + 150 },
            { x: posizioneComune.x + 60, y: posizioneComune.y + 50 },
            { x: posizioneComune.x + 60, y: posizioneComune.y + 200 }
        ],
        coloreRiempimento: '#e0f7fa',
        coloreContorno: 'black',
        spostamento: 0,
        interno: null
    },
    {
        lettera: 'L',
        punti: [
            { x: posizioneComune.x + 30, y: posizioneComune.y + 0 },
            { x: posizioneComune.x + 60, y: posizioneComune.y + 0 },
            { x: posizioneComune.x + 60, y: posizioneComune.y + 170 },
            { x: posizioneComune.x + 150, y: posizioneComune.y + 170 },
            { x: posizioneComune.x + 150, y: posizioneComune.y + 200 },
            { x: posizioneComune.x + 30, y: posizioneComune.y + 200 }
        ],
        coloreRiempimento: '#e0f7fa',
        coloreContorno: 'black',
        spostamento: 0,
        interno: null
    },
    {
        lettera: 'T',
        punti: [
            { x: posizioneComune.x + 40, y: posizioneComune.y + 0 },
            { x: posizioneComune.x + 160, y: posizioneComune.y + 0 },
            { x: posizioneComune.x + 160, y: posizioneComune.y + 30 },
            { x: posizioneComune.x + 80, y: posizioneComune.y + 30 },
            { x: posizioneComune.x + 80, y: posizioneComune.y + 200 },
            { x: posizioneComune.x + 120, y: posizioneComune.y + 200 },
            { x: posizioneComune.x + 120, y: posizioneComune.y + 30 },
            { x: posizioneComune.x + 40, y: posizioneComune.y + 30 }
        ],
        coloreRiempimento: '#e0f7fa',
        coloreContorno: 'black',
        spostamento: 0,
        interno: null
    }
];




lettere.forEach(lettera => {
    const offsetY = 350;
    lettera.punti.forEach(punto => {
        punto.y += offsetY;
    });

    if (lettera.interno) {
        lettera.interno.y1 += offsetY;
        lettera.interno.y2 += offsetY;
        lettera.interno.y3 += offsetY;
        lettera.interno.y4 += offsetY;
    }
});

function drawLetterFromStruct(letteraObj) {
    ctx1.fillStyle = letteraObj.coloreRiempimento;
    ctx1.strokeStyle = letteraObj.coloreContorno;
    ctx1.lineWidth = 3;

    ctx1.beginPath();
    letteraObj.punti.forEach((punto, index) => {
        if (index === 0) {
            ctx1.moveTo(punto.x + letteraObj.spostamento, punto.y );
        } else {
            ctx1.lineTo(punto.x + letteraObj.spostamento, punto.y);
        }
    });
    ctx1.closePath();
    ctx1.fill();
    ctx1.stroke();
if (letteraObj.lettera == 'A') {
    ctx1.beginPath();
    ctx1.moveTo(letteraObj.interno.x1 + letteraObj.spostamento, letteraObj.interno.y1 );
    ctx1.lineTo(letteraObj.interno.x2 + letteraObj.spostamento, letteraObj.interno.y2 );
    ctx1.lineTo(letteraObj.interno.x3 + letteraObj.spostamento, letteraObj.interno.y3 );
    ctx1.closePath();
    ctx1.fillStyle = 'white';
    ctx1.fill();
    ctx1.stroke();
}
else if (letteraObj.lettera == 'P') {
    ctx1.beginPath();
    ctx1.moveTo(letteraObj.interno.x1 + letteraObj.spostamento, letteraObj.interno.y1 ); // Punto superiore sinistro
    ctx1.lineTo(letteraObj.interno.x2 + letteraObj.spostamento, letteraObj.interno.y2 ); // Punto superiore destro
    ctx1.lineTo(letteraObj.interno.x3 + letteraObj.spostamento, letteraObj.interno.y3 ); // Punto inferiore destro
    ctx1.lineTo(letteraObj.interno.x4 + letteraObj.spostamento, letteraObj.interno.y4 ); // Punto inferiore sinistro
    ctx1.closePath(); 
    ctx1.fillStyle = 'white'; 
    ctx1.fill(); 
    ctx1.stroke(); 
}

    }

// Funzione principale per il gioco 1
function gioco_1() {
    const panel = document.getElementById("gioco_1");
    const panel_princ = document.getElementById("princ");
    const homepage = document.getElementById("homepage");
    setTimeout(() => {
        panel.style.display = "block";
        panel_princ.style.display = "none";
        homepage.style.display = "none";
    }, 200);
    const vet_lettere = ['C', 'A', 'Z',  'P', 'M', 'L'];
    const vet_parole = ['Casa', 'Albero', 'Zoo', 'Parco', 'Mondo', 'Limone'];
    // Seleziona 3  lettere casuali
    let let_scelte = [];
    let random = [];
    let parolacas = [];
    while (random.length < 3) {
        let randomWord = vet_lettere[Math.floor(Math.random() * vet_lettere.length)];
        if (!random.includes(randomWord)) {
            random.push(randomWord);
            let_scelte.push(vet_lettere[vet_lettere.indexOf(randomWord)]);
            parolacas.push(vet_parole[vet_lettere.indexOf(randomWord)]);
        }
    }
    // Mescola le lettere in un ordine casuale
    let shuffledLetters = [...let_scelte];
    do {
        shuffledLetters.sort(() => Math.random() - 0.5);
    } while (shuffledLetters.every((letter, index) => letter === let_scelte[index]));

    // Pulisce il canvas prima di disegnare
    clearCanvas();
    // Disegna le lettere nel canvas
    let sposta = 95;
    shuffledLetters.forEach((lettera) => {
        const letteraObj = lettere.find(l => l.lettera === lettera);

        if (letteraObj) {
            letteraObj.spostamento = sposta;
            drawLetterFromStruct(letteraObj);
            sposta += 260;
        }
    });
     const buttonContainer = document.getElementById('button_container');
     buttonContainer.classList.add('button-container');

     // Creare i bottoni per ogni parola generata
     vet_parole.forEach(word => {
         const button = document.createElement('button');
         button.innerText = word;
         button.classList.add('word-button');

         // Aggiungi un evento click per selezionare solo 3 bottoni
         button.addEventListener('click', () => {
            // Aggiunge o rimuove la classe 'selected' sul bottone cliccato
            button.classList.toggle('selected');
        
            // Ottieni tutti i bottoni con la classe 'selected'
            const selectedButtons = document.querySelectorAll('.word-button.selected');
        
            // Controlla se ci sono più di 3 bottoni selezionati
            if (selectedButtons.length > 3) {
                // Se ci sono più di 3, rimuovi la classe 'selected' dall'ultimo cliccato
                button.classList.remove('selected');
            }
        });
        

         buttonContainer.appendChild(button);
     });
     // Crea un pulsante per l'invio della selezione
     const submitButton = document.createElement('button');
     submitButton.innerText = 'Verifica';
     submitButton.classList.add('submit-button');
     buttonContainer.appendChild(submitButton);

        submitButton.addEventListener('click', () => {
            const selectedButtons = document.querySelectorAll('.word-button.selected');
            
            // Verifica se ci sono esattamente 3 pulsanti selezionati
            if (selectedButtons.length !== 3) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Devi selezionare 3 pulsanti!",
                  });
                return;
            }
        
            let c = 0; 
            const selectedTexts = Array.from(selectedButtons).map(btn => btn.innerText); // Ottieni il testo dei pulsanti selezionati
        
            // Confronta i pulsanti selezionati con quelli generati casualmente
            for (let i = 0; i < selectedTexts.length; i++) {
                for (let j = 0; j < parolacas.length; j++) {
                    if (selectedTexts[i] === parolacas[j]) {
                        c++; // Incrementa il contatore se c'è una corrispondenza
                        break; // Esci dal secondo ciclo una volta trovata una corrispondenza
                    }
                }
            }
        
            // Controlla se ci sono state 3 corrispondenze
            if (c === 3) {
                console.log(punteggio)
                Swal.fire({
                    icon: "success",
                    title: "Complimenti..",
                    text: "Hai selezionato le parole corrette!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                        punteggio+=1;
                        chiudi_gioco1();

                    }
                });
            } else {
                console.log(punteggio)

                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Non hai schiacciato le parole corrette, che erano " +parolacas[0] + ", "+parolacas[1]+" e "+parolacas[2] +"!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                        chiudi_gioco1();

                    }
                });
            }
        });
        
function clearCanvas() {
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
}   
}

function  chiudi_gioco1() {
    document.getElementById("gioco_1").style.display = "none";
    document.getElementById("princ").style.display = "block";

}


function  chiudi_gioco2() {
    document.getElementById("gioco_2").style.display = "none";
    document.getElementById("princ").style.display = "block";

}

function attivaAudio() {
    var audio = document.getElementById("myAudio");
    audio.play();
    setTimeout(function() {
      audio.pause();
      audio.currentTime = 0;
    }, 7000); 
  } 

function  chiudi_gioco3() {
    if(punteggio>=8 ){
    attivaAudio();
    document.getElementById("gioco_3").style.display = "none";
    document.getElementById("victory").style.display = "block";
    document.getElementById("punteggio").innerHTML = "Complimenti, sei di livello avanzato, hai superato il gioco con un punteggio di:" + punteggio + "/10!"; 
    const count = 200,
    defaults = {
      origin: { y: 0.7 },
    };
  
  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }
  
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  
  fire(0.2, {
    spread: 60,
  });
  
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });}
  else if(punteggio <8 && punteggio>=6){
    document.getElementById("gioco_3").style.display = "none";
    document.getElementById("victory").style.display = "block";
    document.getElementById("punteggio").innerHTML = "Brav*, il tuo livello è sufficente, hai superato il gioco con un punteggio di: " + punteggio + "/10!"; 
  }
  else{
    document.getElementById("gioco_3").style.display = "none";
    document.getElementById("lost").style.display = "block";
    document.getElementById("punteggio1").innerHTML = "Purtroppo il tuo livello è insufficente, il tuo  punteggio è di: " + punteggio + "/10... forse è l'ora di fare un ripasso!"; 


  }
}
completa = 0;

function gioco_2(){
    setTimeout(() => {
        document.getElementById("gioco_2").style.display = "block";
        document.getElementById("princ").style.display = "none";
        document.getElementById("homepage").style.display = "none";
    }, 200);
    const canvas2 = document.getElementById("canvas_2");
    const ctx2 = canvas2.getContext("2d");

    // Disegna la metà inferiore del cerchio sul canvas
    function drawHalfCircle() {
        ctx2.fillStyle = "#4CAF50";
        ctx2.beginPath();
        ctx2.arc(340, 100, 50, Math.PI, 0, true); 
        ctx2.closePath();
        ctx2.fill();
    }
    
    // Disegna metà quadrato
    function drawHalfSquare() {
        ctx2.fillStyle = "#FF5722";
        ctx2.beginPath();
        ctx2.moveTo(30, 100);
        ctx2.lineTo(130, 100);
        ctx2.lineTo(130, 50); 
        ctx2.lineTo(30, 50);
        ctx2.closePath();
        ctx2.fill();
    }

    // Disegna metà trapezio
    function drawHalfTrapezoid() {    
        ctx2.fillStyle = "#8E44AD";  
        ctx2.beginPath();
        ctx2.moveTo(150, 150); 
        ctx2.lineTo(250, 150); 
        ctx2.lineTo(225, 100); 
        ctx2.lineTo(175, 100);  
    
        ctx2.closePath();
        ctx2.fill();
    }

    // Disegna metà stella
    function drawHalfStar() {
        const cx = 500;
        const cy = 100;
        const spikes = 5;
        const outerRadius = 50;
        const innerRadius = 25;
        ctx2.fillStyle = "#FFC107";
        ctx2.beginPath();

        for (let i = 0; i < spikes; i++) {
            let rot = Math.PI / spikes;
            let x = cx + Math.cos(i * 2 * rot) * outerRadius;
            let y = cy + Math.sin(i * 2 * rot) * outerRadius;
            ctx2.lineTo(x, y);

            x = cx + Math.cos((i * 2 + 1) * rot) * innerRadius;
            y = cy + Math.sin((i * 2 + 1) * rot) * innerRadius;
            if (i >= spikes / 2) break; // Disegna solo la metà inferiore
            ctx2.lineTo(x, y);
        }
        ctx2.closePath();
        ctx2.fill();
    }

    drawHalfSquare();
    drawHalfTrapezoid();
    drawHalfStar();
    drawHalfCircle();

    setupDrag("draggableCircle", 300, 50); // Controlla la parte superiore del cerchio
    setupDrag("draggableTrapezoid", 100, 150); // Controlla la parte inferiore del trapezio
    setupDrag("draggableStar", 500, 50); // Controlla la parte superiore della stella
    setupDrag("draggableSquare", 30, 100); // Controlla la parte superiore del quadrato

    function setupDrag(elementId, targetX, targetY) {
        const element = document.getElementById(elementId);
        let offsetX, offsetY;

        element.addEventListener("mousedown", (e) => {
            offsetX = e.clientX - element.offsetLeft;
            offsetY = e.clientY - element.offsetTop;
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        });

        function onMouseMove(e) {
            element.style.left = `${e.clientX - offsetX}px`;
            element.style.top = `${e.clientY - offsetY}px`;
        }

        function onMouseUp() {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);

            // Controlla se la metà superiore/inferiore è nella posizione corretta
            const rect = element.getBoundingClientRect();
            const canvasRect = canvas2.getBoundingClientRect();
            const xPos = rect.left - canvasRect.left;
            const yPos = rect.top - canvasRect.top;
            star = false;
            circle = false;
            trapezoid = false;
            square = false;
            if ( elementId === "draggableStar") {
                if (Math.abs(xPos - targetX) < 15 && Math.abs(yPos - targetY) < 15) {
                    star = true;
                    console.log(Math.abs(xPos - targetX));
                    console.log(Math.abs(yPos - targetY));
                    element.style.left = `${canvasRect.left + targetX-3}px`;
                    element.style.top = `${canvasRect.top + targetY+4}px`;
                    completa++;
                }
                else{
                    if(star == true){
                        completa--;
                    }
                }
            } else if(elementId === "draggableCircle"){ 
                console.log(Math.abs(xPos - targetX));
                console.log(Math.abs(yPos - targetY));
                if (Math.abs(xPos - targetX) < 15 && Math.abs(yPos - targetY) < 15) {
                    circle = true;
                    element.style.left = `${canvasRect.left + targetX-9.5}px`;
                    element.style.top = `${canvasRect.top + targetY+3}px`;
                    completa++;
                }
                else{
                    if(circle == true){
                    completa--;
                    }
                }
            }
         else if(elementId === "draggableSquare"){ 
            console.log(Math.abs(xPos - targetX));
            console.log(Math.abs(yPos - targetY));
            if (Math.abs(xPos - targetX) < 15 && Math.abs(yPos - targetY) < 15) {
                square = true;
                element.style.left = `${canvasRect.left + targetX+1}px`;
                element.style.top = `${canvasRect.top + targetY-0.5}px`;
                completa++;
            }
            else{
                if(square == true){
                completa--;
                }
            }
        }
    else if(elementId === "draggableTrapezoid"){ 
        console.log(Math.abs(xPos - targetX));
        console.log(Math.abs(yPos - targetY));
        if (Math.abs(xPos - targetX) < 15 && Math.abs(yPos - targetY) < 15) {
            element.style.left = `${canvasRect.left + targetX+1}px`;
            element.style.top = `${canvasRect.top + targetY-0.5}px`;
            completa++;
        }
        else{
            completa--;
        }
    }

        }
    }
}

function controllo_fig(){
    if(completa == 1){
        sbagliato1(1);

    }
    else if(completa == 2){
        sbagliato1(2);
    }
    else if(completa == 3){
        sbagliato1(3);
    }
    else if(completa == 4){
        giusto1();

    }  
    else{
        sbagliato1(0);
    }     
}

function gioco_3(){
    setTimeout(() => {
        document.getElementById("homepage").style.display = "none";
        document.getElementById("princ").style.display = "none";
        document.getElementById("gioco_3").style.display = "block";
    }, 200);

    function drawPolygon(sides) {
        return function (ctx) {
            const radius = 50;
            const angle = (2 * Math.PI) / sides;
            ctx.beginPath();
            for (var i = 0; i < sides; i++) {
                ctx.lineTo(
                    75 + radius * Math.cos(i * angle - Math.PI / 2),
                    75 + radius * Math.sin(i * angle - Math.PI / 2)
                );
            }
            ctx.closePath();
            colore = ['rgb(255, 0, 0)', 'rgb(255, 255, 0)', 'rgb(0, 128, 0)', 'rgb(0, 0, 255)', 'rgb(255, 125, 0)', 'rgb(128, 0, 128)', 'rgb(255, 255, 0)', 'rgb(255, 192, 203)', 'rgb(139, 69, 19)', 'rgb(128, 128, 128)'];
            ctx.fillStyle = colore[sides];
            ctx.fill();
        };
    }

    const shapes = [
        { sides: 3, name: 'Triangolo', draw: drawPolygon(3) },
        { sides: 4, name: 'Quadrato', draw: drawPolygon(4) },
        { sides: 5, name: 'Pentagono', draw: drawPolygon(5) },
        { sides: 6, name: 'Esagono', draw: drawPolygon(6) },
        { sides: 7, name: 'Ettagono', draw: drawPolygon(7) },
    ];

    const startCanvases = [
        document.getElementById("startCanvas1"),
        document.getElementById("startCanvas2"),
        document.getElementById("startCanvas3"),
        document.getElementById("startCanvas4"),
        document.getElementById("startCanvas5"),
    ];

    const endCanvases = [
        document.getElementById("endCanvas1"),
        document.getElementById("endCanvas2"),
        document.getElementById("endCanvas3"),
        document.getElementById("endCanvas4"),
        document.getElementById("endCanvas5"),
    ];

    const movingShapeCanvas = document.getElementById("movingShape");
    const movingShapeCtx = movingShapeCanvas.getContext("2d");
    var isDragging = false;
    var draggedShape = null;
    var offsetX, offsetY;
    var placedShapes = new Array(5).fill(null);

    function shuffle(array) {
        for (var i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const shuffledShapes = shuffle([...shapes]);

    for (var i = 0; i < startCanvases.length; i++) {
        const shape = shuffledShapes[i];
        shape.draw(startCanvases[i].getContext("2d"));
        startCanvases[i].dataset.sides = shape.sides;
    }

    function addDragEvent(canvasArray) {
        canvasArray.forEach((canvas, index) => {
            canvas.addEventListener("mousedown", (e) => {
                isDragging = true;
                draggedShape = parseInt(canvas.dataset.sides, 10);
                offsetX = e.offsetX;
                offsetY = e.offsetY;
                drawMovingShape(draggedShape);
                movingShapeCanvas.style.display = "block";
                movingShapeCanvas.style.position = "absolute";
                movingShapeCanvas.style.pointerEvents = "none";
                canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
                placedShapes[endCanvases.indexOf(canvas)] = null; 
            });
        });
    }

    addDragEvent(startCanvases);
    addDragEvent(endCanvases);
    
    function drawMovingShape(sides) {
        movingShapeCtx.clearRect(0, 0, movingShapeCanvas.width, movingShapeCanvas.height);
        colore = ['rgb(255, 0, 0)', 'rgb(255, 255, 0)', 'rgb(0, 128, 0)', 'rgb(0, 0, 255)', 'rgb(255, 125, 0)', 'rgb(128, 0, 128)', 'rgb(255, 255, 0)', 'rgb(255, 192, 203)', 'rgb(139, 69, 19)', 'rgb(128, 128, 128)'];
        movingShapeCtx.fillStyle = colore[sides];
        movingShapeCtx.beginPath();
        const radius = 50;
        const angle = (2 * Math.PI) / sides;
        for (var i = 0; i < sides; i++) {
            movingShapeCtx.lineTo(
                50 + radius * Math.cos(i * angle - Math.PI / 2),
                50 + radius * Math.sin(i * angle - Math.PI / 2)
            );
        }
        movingShapeCtx.closePath();
        movingShapeCtx.fill();
    }

    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            movingShapeCanvas.style.left = `${e.clientX - 50}px`;
            movingShapeCanvas.style.top = `${e.clientY - 50}px`;
        }
    });

    document.addEventListener("mouseup", (e) => {
        if (isDragging) {
            isDragging = false;
            movingShapeCanvas.style.display = "none";

            const endCanvas = Array.from(endCanvases).find(canvas => {
                const rect = canvas.getBoundingClientRect();
                return e.clientX >= rect.left && e.clientX <= rect.right &&
                    e.clientY >= rect.top && e.clientY <= rect.bottom;
            });

            if (endCanvas) {
                const ctx = endCanvas.getContext("2d");
                ctx.clearRect(0, 0, endCanvas.width, endCanvas.height);
                shapes.find(shape => shape.sides === draggedShape).draw(ctx);
                placedShapes[endCanvases.indexOf(endCanvas)] = draggedShape;
            } else {
                const originalCanvas = startCanvases.find(c => parseInt(c.dataset.sides, 10) === draggedShape);
                shapes.find(shape => shape.sides === draggedShape).draw(originalCanvas.getContext("2d"));
            }
            i=0;
            if (placedShapes.every((shape, index) => shape === (index + 3))) {
                giusto2();

            } else if (placedShapes.every(shape => shape !== null)) {
                sbagliato2(5-(i));
            }
            
            
        }
    });
}

function chiudiPopup(){
    location.reload();
}



