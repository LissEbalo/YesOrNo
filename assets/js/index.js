//elementos del DOM
const questionInput = document.getElementById('question');
const askButton = document.getElementById('btn');
const answerText = document.getElementById('text');
const answerGif = document.getElementById('gif');

// funsion al boton - trim no deja poner espacios vacios al inicio y fin
askButton.addEventListener('click', () => {
    const question = questionInput.value.trim();
    if (question) {
        Answer();
    } else {
        answerText.textContent = 'Escribe una pregunta';
        answerGif.style.display = 'none'; //no se ve el gif
    }
});
// llamar a la funsion
function Answer() {
    fetch('https://yesno.wtf/api')
        .then(response => response.json())
        .then(data => {
            const answer = data.answer;
            const gifUrl = data.image;
            updateDOM(answer, gifUrl);
        })
        .catch(error => {
            console.error('Error', error);
            answerText.textContent = 'Intenta de nuevo.';
            answerGif.style.display = 'none';
        });
}

function updateDOM(answer, gifUrl) {

    answerText.textContent = answer.charAt(0).toUpperCase() + answer.slice(1);

    // muestra gif
    answerGif.src = gifUrl;
    answerGif.style.display = 'block';
}
