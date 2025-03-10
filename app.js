const express = require('express');
const ejsMate = require('ejs-mate'); // Import ejs-mate
const path = require('path');


const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(path.join(__dirname, 'public')));
// Middleware to receive email

//just a comment
  // Example route
  app.get('/', (req, res) => {
    res.render('index');
  });

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });



