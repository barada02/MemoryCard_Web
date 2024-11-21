// DOM Elements
const addCardBtn = document.getElementById('add-card');
const modal = document.getElementById('add-card-modal');
const closeBtn = document.querySelector('.close');
const cardForm = document.getElementById('card-form');
const cardsContainer = document.getElementById('cards-container');

// Memory Cards Array
let memoryCards = JSON.parse(localStorage.getItem('memoryCards')) || [];

// Event Listeners
addCardBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
cardForm.addEventListener('submit', createMemoryCard);
window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// Load existing cards when page loads
document.addEventListener('DOMContentLoaded', () => {
    displayMemoryCards();
});

// Functions
function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
    cardForm.reset();
}

function createMemoryCard(e) {
    e.preventDefault();

    const title = document.getElementById('card-title').value;
    const date = document.getElementById('card-date').value;
    const description = document.getElementById('card-description').value;
    const imageFile = document.getElementById('card-image').files[0];

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const newCard = {
                id: Date.now(),
                title,
                date,
                description,
                image: event.target.result
            };

            memoryCards.push(newCard);
            saveToLocalStorage();
            displayMemoryCards();
            closeModal();
        };
        reader.readAsDataURL(imageFile);
    } else {
        const newCard = {
            id: Date.now(),
            title,
            date,
            description,
            image: 'https://via.placeholder.com/300x200?text=No+Image'
        };

        memoryCards.push(newCard);
        saveToLocalStorage();
        displayMemoryCards();
        closeModal();
    }
}

function displayMemoryCards() {
    cardsContainer.innerHTML = '';
    
    memoryCards.forEach(card => {
        const cardElement = createCardElement(card);
        cardsContainer.appendChild(cardElement);
    });
}

function createCardElement(card) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'memory-card';
    
    cardDiv.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
                <img src="${card.image}" alt="${card.title}" class="card-image">
                <div class="card-content">
                    <h3 class="card-title">${card.title}</h3>
                    <p class="card-date">${formatDate(card.date)}</p>
                </div>
            </div>
            <div class="card-back">
                <div class="card-content">
                    <h3 class="card-title">${card.title}</h3>
                    <p class="card-description">${card.description}</p>
                    <button class="btn delete-btn" onclick="deleteCard(${card.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return cardDiv;
}

function deleteCard(id) {
    if (confirm('Are you sure you want to delete this memory?')) {
        memoryCards = memoryCards.filter(card => card.id !== id);
        saveToLocalStorage();
        displayMemoryCards();
    }
}

function saveToLocalStorage() {
    localStorage.setItem('memoryCards', JSON.stringify(memoryCards));
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}
