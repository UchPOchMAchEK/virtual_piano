const piano = document.querySelector('.piano');
const pianoKeys = document.querySelectorAll('.piano-key');
const btnLetters = document.querySelector('.btn-letters');
const btnNotes = document.querySelector('.btn-notes');
const fullscreen = document.querySelector('.fullscreen');

//Открыть на весь экран
fullscreen.addEventListener('click', e => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
});

//Переключение на клавиши
btnLetters.addEventListener('click', e => {
    pianoKeys.forEach(item => item.classList.add('piano-key-letter'));
    e.target.classList.add('btn-active');
    btnNotes.classList.remove('btn-active');
});

//Переключение на ноты
btnNotes.addEventListener('click', e => {
    pianoKeys.forEach(item => item.classList.remove('piano-key-letter'));
    e.target.classList.add('btn-active');
    btnLetters.classList.remove('btn-active');
});

//Проигрываение ноты
function playNote(e) {
    const idNote = e;
    idNote.classList.add('piano-key-active');
    const note = e.dataset.note;
    let audio = new Audio(`assets/audio/${note}.mp3`);
    audio.play();
}

function playMouse(e){
    const note = e.target;

    if(note.classList.contains('piano-key')){
        note.classList.remove('piano-key-active');
        playNote(note);
        window.addEventListener('mouseup', () => {
            piano.removeEventListener('mouseover', playMouse);
        });
    }
}

piano.addEventListener('mousedown', e => {
    playNote(e.target);
    piano.addEventListener('mouseover', playMouse);
    piano.addEventListener('mouseout', element => {
        element.target.classList.remove('piano-key-active');
    });
});

piano.addEventListener('mouseup', e => {
    const note = e.target;
    if(note.classList.contains('piano-key-active')){
        note.classList.remove('piano-key-active');
    }
});

const key = {
    'D': 'c',
    'F': 'd',
    'G': 'e',
    'H': 'f',
    'J': 'g',
    'K': 'a',
    'L': 'b',
    'R': 'c♯',
    'T': 'd♯',
    'U': 'f♯',
    'I': 'g♯',
    'O': 'a♯'
};

//Проигрываение по клавише
window.addEventListener('keydown', e => {
    if(e.repeat){
        return;
    }
    let codeKey = e.code.split('').reverse()[0];

    for(let tmp of pianoKeys){
        if(tmp.dataset.letter == codeKey){
            playNote(tmp);
        }
    }
});

//Удаляем класс active после нажатия
window.addEventListener('keyup', e => {
    let codeKey = e.code.split('').reverse()[0];

    for(let tmp of pianoKeys){
        if(tmp.dataset.letter == codeKey){
            tmp.classList.remove('piano-key-active');
        }
    }
});