// const chatLog = document.getElementById('chat-log');
// const userInput = document.getElementById('user-input');
// const submitButton = document.getElementById('submit-button');


// submitButton.addEventListener('click', async () => {
//     const userInputValue = userInput.value.trim();
//     if (userInputValue) {
//         try {
//             const response = await fetch('/chatbot', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ user_input: userInputValue })
//             });
//             const recommendations = await response.json();
//             chatLog.innerHTML += `<p>Recommendations:</p><ul>${recommendations.recommendations.map(recommendation => `<li>${recommendation.name}</li>`).join('')}</ul>`;
//         } catch (error) {
//             console.error(error);
//         }
//     }
// });

const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const submitButton = document.getElementById('submit-button');

submitButton.addEventListener('click', async () => {
    const userInputValue = userInput.value.trim();
    if (userInputValue) {
        try {
            const response = await fetch('/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_input: userInputValue })
            });
            const recommendations = await response.json();
            const chatLogHtml = '';
            recommendations.recommendations.forEach((recommendation) => {
                chatLogHtml += `<li>${recommendation.name}</li>`;
            });
            chatLog.innerHTML += `<p>Recommendations:</p><ul>${chatLogHtml}</ul>`;
            userInput.value = ''; // clear input field
        } catch (error) {
            console.error(error);
        }
    }
});