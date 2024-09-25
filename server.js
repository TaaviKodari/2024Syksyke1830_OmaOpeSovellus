import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/get-question',(req, res)=>{
    const question = req.body.question;
    console.log(question);
});

app.listen(port,() =>{
    console.log(`Server running at http://localhost:${port}`);
});