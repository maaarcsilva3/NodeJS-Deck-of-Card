const express = require('express');
const app = express();


var globaldeck = [];


function createDeck() {
  const suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
  const ranks = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
  
  // create deck
  for (let suit of suits) {
    for (let rank of ranks) {
        globaldeck.push(`${rank} of ${suit}`);
    }
  }

  return globaldeck;
}



app.get('/deck', (req, res) => {
  createDeck();
  res.send(globaldeck);
  console.log('deck generated');
  console.log(globaldeck);

});



app.get('/shuffle', (req, res) => {
 

  // shuffle deck
  for (let i = globaldeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [globaldeck[i], globaldeck[j]] = [globaldeck[j], globaldeck[i]];
  }
  console.log('This is a shuffled deck');
  console.log(globaldeck);
  res.send(globaldeck);
});



app.get('/draw', (req, res) => {
  var draw;
  draw = globaldeck.pop();
  console.log('you just draw a card');
  res.send(draw);
  console.log(draw);
});


app.get('/show', (req, res) => {
    res.send(globaldeck);
    console.log('Your updated deck without the draw card');
    console.log(globaldeck);
});

app.get('/clear', (req, res) => {
    globaldeck = [];
    res.send({globaldeck, message: 'Deck cleared!' });
    console.log(globaldeck);
    console.log("Deck Cleared");
});
  


app.listen(3000, () => console.log('Port 3000 is running'));
