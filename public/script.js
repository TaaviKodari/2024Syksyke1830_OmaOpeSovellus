let currentQuestion ='';
let correctAnswer = '';
document.getElementById('send-button').addEventListener('click',sendMessage);
document.getElementById('user-input').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        sendMessage();
    }
});
document.getElementById('send-images-button').addEventListener('click',sendImages);
document.getElementById('send-answer-button').addEventListener('click',sendAnswer);

function sendAnswer(){
    //console.log("Lähetetään vastausta");
    const answerInput = document.getElementById('answer-input').value;
    if(answerInput.trim() === '') return;

    console.log(answerInput);
    addMessageToChatBox('Sinä: ' + answerInput,'user-message', 'omaopebox');

    try{
 
    }catch(error){
        console.log('Error:',error);
    }
    document.getElementById('answer-input').value ='';
}


async function sendImages(){
    console.log("Kuvia lähetetty!");
    const imageInput = document.getElementById('image-input');
    console.log(imageInput.files); 
    const files = imageInput.files;
    if(files.length === 0){
        alert('Valitse kuvia ensin!');
        return;
    }

    const formData = new FormData();

    for(let i = 0; i < files.length; i++){
        formData.append('images',files[i]);
    }

    console.log(formData);

    try{
        const response = await fetch('/upload-Images',{
            method:'POST',
            body:formData
        })
        const data = await response.json();
        console.log(data);
        currentQuestion = data.question;
        correctAnswer = data.answer;
        console.log('Current question: ' + currentQuestion);
        console.log('Current answer: ' + correctAnswer);
        addMessageToChatBox('OmaOpe: ' + currentQuestion,'bot-message','omaopebox');

    }catch(error){
        console.error('Error:',error);
    }
}

async function sendMessage(){
    const userInput = document.getElementById('user-input').value;
    //poistaa tyhjät merkit alusta ja lopusta ja jos tekstikenttä tyhjä, poistuu funktiosta
    if(userInput.trim() === '') return;
    console.log(userInput);
    
    addMessageToChatBox('Sinä: ' + userInput,'user-message','chatbox');

    try{
        const response = await fetch('/chat',{
             method: 'POST',
             headers:{
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({question:userInput})
         });
     
         const data = await response.json();
     
         console.log(data);
         addMessageToChatBox(data.reply,'bot-message','chatbox');
    }catch(error){
        console.error('Error', error);
        addMessageToChatBox('ChatGPT: Jotain meni pieleen!','bot-message','chatbox');
    }

    //Clear input field tyhjentää tekstikentän
    document.getElementById('user-input').value = '';
}
function addMessageToChatBox(message,className,box){
    //luodaan uusi div
    const messageElement = document.createElement('div');
    messageElement.classList.add('message',className);
    //lisätään käyttäjän viesti uuteen diviin
    messageElement.textContent = message;
    console.log(messageElement);
    document.getElementById(box).appendChild(messageElement);
}