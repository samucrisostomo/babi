// Elementos do DOM
const gameBoard = document.getElementById('gameBoard');

// Pares de cartas personalizadas
const cards = [
    { id: 1, content: '💖', message: 'CADA MOMENTO COM VOCÊ' },
    { id: 2, content: '🌹', message: 'Uma rosa para a pessoa especial! 🌹' },
    { id: 3, content: '🎵', message: 'A música do coração está tocando! 🎵' },
    { id: 4, content: '✨', message: 'Um brilho mágico para vocês! ✨' },
    { id: 5, content: '🍫', message: 'Chocolate doce como o amor! 🍫' },
    { id: 6, content: '📸', message: 'Tiraria inúmeras fotos do seu sorriso 📸' },
    { id: 7, content: '💌', message: 'Uma carta de amor especial! 💌' },
    { id: 8, content: '🌈', message: 'Um arco-íris de felicidade! 🌈' },
];

// Duplicar e embaralhar as cartas
const shuffledCards = [...cards, ...cards]
    .sort(() => 0.5 - Math.random());

// Estado do jogo
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

// Criar e exibir as cartas
shuffledCards.forEach(({ id, content }) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.id = id;
    card.innerHTML = `<div class="content">${content}</div>`;
    card.addEventListener('click', handleCardClick);
    gameBoard.appendChild(card);
});

// Função de clique na carta
function handleCardClick(event) {
    if (lockBoard) return;

    const clickedCard = event.currentTarget;
    if (clickedCard === firstCard) return;

    clickedCard.classList.add('flipped');

    if (!firstCard) {
        firstCard = clickedCard;
        return;
    }

    secondCard = clickedCard;
    checkForMatch();
}

// Verificar se as cartas são iguais
function checkForMatch() {
    const isMatch = firstCard.dataset.id === secondCard.dataset.id;

    if (isMatch) {
        const matchedCard = cards.find(card => card.id === parseInt(firstCard.dataset.id));
        showMessage(matchedCard.message);
        disableCards();
        matches += 1;
        if (matches === cards.length) {
            setTimeout(() => alert('Parabéns! Você encontrou todos os pares! 💕'), 500);
        }
        return;
    }

    unflipCards();
}

// Mostrar mensagem fofa
function showMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = message;
    document.body.appendChild(messageElement);

    setTimeout(() => {
        messageElement.remove();
    }, 6000);
}

// Desabilitar cartas correspondentes
function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    resetBoard();
}

// Virar cartas de volta
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

// Resetar estado do tabuleiro
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}
