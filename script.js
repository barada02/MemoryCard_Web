// DOM Elements
const addCardBtn = document.getElementById('add-card');
const modal = document.getElementById('add-card-modal');
const closeBtn = document.querySelector('.close');
const cardForm = document.getElementById('card-form');
const cardsContainer = document.getElementById('cards-container');

// Example Cards (Static cards that will always be shown)
const exampleCards = [
    {
        id: 'example1',
        title: "Birthday Celebration",
        date: "2023-09-10",
        description: "Happy Birthday to my friend Riya! It was a fun-filled day filled with laughter and joy. An amazing birthday celebration with friends and family. The memories will last forever!",
        image: "CatWithSari.webp",
        isExample: true
    },
    {
        id: 'example2', // Using string IDs to distinguish example cards
        title: "Happy Diwali",
        date: "2023-07-15",
        description: "To Sirisha: A special Diwali celebration with loved ones, filled with lights, colors, and joy. A day to cherish and share the joy of Diwali with friends and family. Let's make this Diwali a memorable one!",
        image: "CatWearing_Kurta.png",
        isExample: true // Flag to identify example cards
    },
    {
        id: 'example3',
        title: "Mountain Adventure",
        date: "2023-08-20",
        description: "Hiking to the summit was challenging but the view was absolutely worth it. Nature's beauty at its finest!",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        isExample: true
    }
    
];

// Load user's memory cards from localStorage
let userMemoryCards = JSON.parse(localStorage.getItem('memoryCards')) || [];

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
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
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
            addNewCard(title, date, description, event.target.result);
        };
        reader.readAsDataURL(imageFile);
    } else {
        addNewCard(title, date, description, 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
    }
}

function addNewCard(title, date, description, image) {
    const newCard = {
        id: Date.now(),
        title,
        date,
        description,
        image,
        isExample: false
    };

    userMemoryCards.unshift(newCard);
    saveToLocalStorage();
    displayMemoryCards();
    closeModal();
    showNotification('Memory card created successfully!');
}

function displayMemoryCards() {
    cardsContainer.innerHTML = '';
    
    // Display user's cards first
    userMemoryCards.forEach(card => {
        const cardElement = createCardElement(card);
        cardsContainer.appendChild(cardElement);
    });

    // Then display example cards
    exampleCards.forEach(card => {
        const cardElement = createCardElement(card);
        cardsContainer.appendChild(cardElement);
    });
}

function createCardElement(card) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'memory-card';
    if (card.isExample) {
        cardDiv.classList.add('example-card');
    }
    
    cardDiv.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
                <img src="${card.image}" alt="${card.title}" class="card-image">
                ${card.isExample ? '<div class="example-badge">Example</div>' : ''}
                <div class="card-content">
                    <h3 class="card-title">${card.title}</h3>
                    <p class="card-date">
                        <i class="fas fa-calendar-alt"></i>
                        ${formatDate(card.date)}
                    </p>
                </div>
            </div>
            <div class="card-back">
                <div class="card-content">
                    <h3 class="card-title">${card.title}</h3>
                    <p class="card-description">${card.description}</p>
                    <button class="btn delete-btn" onclick="deleteCard('${card.id}', ${card.isExample})">
                        <i class="fas fa-trash"></i> Delete Memory
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return cardDiv;
}

function deleteCard(id, isExample) {
    if (confirm('Are you sure you want to delete this memory?')) {
        if (isExample) {
            // Remove example card from the static array
            const index = exampleCards.findIndex(card => card.id === id);
            if (index !== -1) {
                exampleCards.splice(index, 1);
            }
        } else {
            // Remove user card
            userMemoryCards = userMemoryCards.filter(card => card.id !== Number(id));
            saveToLocalStorage();
        }
        displayMemoryCards();
        showNotification('Memory card deleted successfully!');
    }
}

function saveToLocalStorage() {
    localStorage.setItem('memoryCards', JSON.stringify(userMemoryCards));
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        ${message}
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}
