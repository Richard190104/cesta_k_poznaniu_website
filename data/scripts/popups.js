// Poem Popup Functions
function openPoemPopup(poemId) {
    const poemData = document.getElementById(poemId);
    if (!poemData) return;
    const overlay = document.createElement('div');
    overlay.className = 'poem-popup-overlay';
    const popup = document.createElement('div');
    popup.className = 'poem-popup';
    const closeBtn = document.createElement('button');
    closeBtn.className = 'popup-close';
    closeBtn.innerHTML = '×';
    closeBtn.onclick = () => document.body.removeChild(overlay);
    const title = poemData.querySelector('h4').outerHTML;
    const content = poemData.querySelector('.full-poem').outerHTML;
    popup.innerHTML = title + content;
    popup.appendChild(closeBtn);
    overlay.appendChild(popup);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    });
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            document.body.removeChild(overlay);
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
    document.body.appendChild(overlay);
}

// Contact Description Toggle
function toggleDescription(descriptionId) {
    const description = document.getElementById(descriptionId);
    const button = event.target.closest('button');
    if (description.style.display === 'none' || description.style.display === '') {
        description.style.display = 'block';
        button.querySelector('span').textContent = 'Skryť informácie';
    } else {
        description.style.display = 'none';
        button.querySelector('span').textContent = 'Viac informácií';
    }
}

// Load and render events from events.json
function loadEvents() {
    fetch('events.json')
        .then(response => response.json())
        .then(events => {
            const eventsSection = document.getElementById('events-list');
            if (!eventsSection) return;
            eventsSection.innerHTML = '';
            const grid = document.createElement('div');
            grid.className = 'events-grid';
            events.forEach(event => {
               
                const card = document.createElement('div');
                card.className = 'event-card';
                card.innerHTML = `
                    <div class="event-date">
                        <span class="event-day">${event.date}</span>
                    </div>
                    <div class="event-content">
                        <div class="event-title">${event.title}</div>
                        <div class="event-description">${event.description}</div>
                        <div class="event-meta">
                            <span class="event-location">📍${event.location}</span>
                        </div>
                    </div>
                `;
                grid.appendChild(card);
            });
            eventsSection.appendChild(grid);
        });
}

document.addEventListener('DOMContentLoaded', loadEvents);
