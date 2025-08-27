// Chatbot logic
const chatbotWindow = document.querySelector('.chatbot-window');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotMessages = document.querySelector('.chatbot-messages');
const chatbotToggle = document.getElementById('chatbot-toggle');

if (chatbotClose) {
    chatbotClose.addEventListener('click', () => {
        chatbotWindow.style.display = 'none';
    });
}
if (chatbotSend && chatbotInput && chatbotMessages) {
    chatbotSend.addEventListener('click', sendChatbotMessage);
    chatbotInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            sendChatbotMessage();
        }
    });
}
function sendChatbotMessage() {
    const text = chatbotInput.value.trim();
    if (!text) return;
    addChatbotMessage('user', text);
    chatbotInput.value = '';
    showChatbotLoading();
    setTimeout(() => {
        fetch('https://chatbot-api-5d9u.onrender.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: text })
        }).then(response => response.json())
        .then(data => {
            hideChatbotLoading();
            if(data.similarity < 0.4) {
                addChatbotMessage('bot', "Prepáčte, nerozumela som vám. Možete to prosím zopakovať?");
            } else {
                addChatbotMessage('bot', data.answer);
                if(data.tag == 'podujatie') {
                    addChatbotMessage('bot', "Ak chcete, môžem vám poskytnúť viac informácií o konkrétnom podujatí.");
                    createQuickQuestionButtons(['Predstav mi najbližšie podujatie']);
                }
            }   
        })
    }, 700);
}
function showChatbotLoading() {
    hideChatbotLoading();
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'chatbot-msg bot chatbot-loading';
    loadingDiv.innerHTML = '<span><svg width="24" height="24" viewBox="0 0 24 24" style="vertical-align:middle;"><circle cx="12" cy="12" r="10" stroke="#ff8c42" stroke-width="4" fill="none" opacity="0.3"/><circle cx="12" cy="12" r="6" stroke="#ff8c42" stroke-width="4" fill="none" stroke-dasharray="18" stroke-dashoffset="0"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/></circle></svg> ...</span>';
    chatbotMessages.appendChild(loadingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}
function hideChatbotLoading() {
    const loadingDiv = chatbotMessages.querySelector('.chatbot-loading');
    if (loadingDiv) loadingDiv.remove();
}
function addChatbotMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chatbot-msg ' + sender;
    msgDiv.innerHTML = `<span>${text}</span>`;
    if (sender === 'user') {
        msgDiv.style.alignSelf = 'flex-end';
        msgDiv.style.background = 'linear-gradient(90deg, #ff8c42 0%, #ff6b35 100%)';
        msgDiv.style.color = '#fff';
        msgDiv.style.borderRadius = '16px 16px 4px 16px';
        msgDiv.style.margin = '6px 0 6px auto';
        msgDiv.style.padding = '10px 16px';
        msgDiv.style.maxWidth = '80%';
        msgDiv.style.boxShadow = '0 2px 8px rgba(255,108,66,0.08)';
    } else {
        msgDiv.style.alignSelf = 'flex-start';
        msgDiv.style.background = '#f3f3f3';
        msgDiv.style.color = '#22304a';
        msgDiv.style.borderRadius = '16px 16px 16px 4px';
        msgDiv.style.margin = '6px auto 6px 0';
        msgDiv.style.padding = '10px 16px';
        msgDiv.style.maxWidth = '80%';
        msgDiv.style.boxShadow = '0 2px 8px rgba(34,48,74,0.07)';
    }
    chatbotMessages.appendChild(msgDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}
function createQuickQuestionButtons(questions) {
    let oldContainer = document.getElementById('chatbot-quick-questions');
    if (oldContainer) oldContainer.remove();
    const container = document.createElement('div');
    container.id = 'chatbot-quick-questions';
    container.style.display = 'flex';
    container.style.flexWrap = 'wrap';
    container.style.gap = '0.3rem';
    container.style.margin = '0.3rem 0.5rem';
    container.style.justifyContent = 'center';
    container.style.background = 'rgba(255,255,255,0.3)';
    container.style.borderRadius = '8px';
    container.style.padding = '0.2rem 0.3rem';
    questions.forEach(q => {
        const btn = document.createElement('button');
        btn.className = 'chatbot-quick-btn';
        btn.textContent = q;
        btn.style.background = 'rgba(255,140,66,0.7)';
        btn.style.color = '#fff';
        btn.style.border = 'none';
        btn.style.borderRadius = '8px';
        btn.style.padding = '0.25rem 0.7rem';
        btn.style.fontSize = '0.85rem';
        btn.style.cursor = 'pointer';
        btn.style.marginBottom = '0.1rem';
        btn.style.opacity = '0.85';
        btn.addEventListener('click', function() {
            chatbotInput.value = q;
            sendChatbotMessage();
            container.remove();
        });
        container.appendChild(btn);
    });
    const inputArea = document.querySelector('.chatbot-input-area');
    if (inputArea) {
        inputArea.parentNode.insertBefore(container, inputArea);
    }
}
if (chatbotToggle && chatbotWindow) {
    chatbotToggle.addEventListener('click', function() {
        chatbotWindow.style.display = 'flex';
        chatbotToggle.classList.add('hide');
    });
}
if (chatbotClose) {
    chatbotClose.addEventListener('click', function() {
        chatbotWindow.style.display = 'none';
        chatbotToggle.classList.remove('hide');
    });
}
if (chatbotWindow) {
    chatbotWindow.style.display = 'none';
    chatbotToggle.classList.remove('hide');
}

addChatbotMessage('bot', "Ahoj! Som virtuálny asistent Lea. 😊 Ako vám môžem pomôcť?");
