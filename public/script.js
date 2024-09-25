document.getElementById('send-button').addEventListener('click',sendMessage);
document.getElementById('user-input').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        sendMessage();
    }
});

function sendMessage(){
    const userInput = document.getElementById('user-input').value;
    //poistaa tyhjät merkit alusta ja lopusta ja jos tekstikenttä tyhjä, poistuu funktiosta
    if(userInput.trim() === '') return;
    console.log(userInput);
    
    addMessageToChatBox(userInput);

    fetch('/get-question',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({question:userInput})
    });

    //Clear input field tyhjentää tekstikentän
    document.getElementById('user-input').value = '';
}
function addMessageToChatBox(message){
    //luodaan uusi div
    const messageElement = document.createElement('div');
    //lisätään käyttäjän viesti uuteen diviin
    messageElement.textContent = message;
    console.log(messageElement);
    document.getElementById('chatbox').appendChild(messageElement);
}