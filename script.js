const API_URL = "https://api-inference.huggingface.co/models/shristi0777/llama3-merged-lawyer";
const API_KEY = "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"; 

document.getElementById('send-btn').addEventListener('click', async () => {
    const userInput = document.getElementById('user-input').value;
    if (!userInput) return;

    addMessage(userInput, 'user');
    document.getElementById('user-input').value = '';

    // Show loading indicator
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message bot loading';
    loadingDiv.innerHTML = '🤖 Thinking...';
    document.getElementById('chat-box').appendChild(loadingDiv);

    try {
        const response = await queryHuggingFace(userInput);
        // Remove loading indicator
        loadingDiv.remove();
        addMessage(response, 'bot');
    } catch (error) {
        loadingDiv.remove();
        addMessage('Sorry, I encountered an error. Please try again.', 'bot');
        console.error('Error:', error);
    }
});

async function queryHuggingFace(prompt) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            inputs: prompt,
            parameters: {
                max_new_tokens: 200,
                temperature: 0.7,
                do_sample: true,
                return_full_text: false
            },
        }),
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data[0].generated_text;
}

function addMessage(text, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Allow Enter key to send message
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('send-btn').click();
    }
});
