// publish key : pk_test_yDa5Ew4gZYXaGcCKumAy0NaB00zXM38NLQ
// secret key : Your secret Key
const express = require("express");

const stripe = require("stripe")("Your secret Key");

const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();

//handlebar middleware
app.engine('handlebars',exphbs({defaultLayout: 'main'}));
app.set('view engine','handlebars');

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//set static folder
app.use(express.static(`${__dirname}/public`));

//index route
app.get("/",(req,res) => {
   res.render('index');
});


//charge route
app.post("/charge",(req,res) => {
   const amount = 3000;
   // console.log(req.body);
   // res.send('test');
   stripe.customers.create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
   })
       .then(customer => stripe.charges.create({
          amount,
          description:"Life's Amazing Secrets",
          currency:"usd",
          customer:customer.id
       }))
       .then(charge => res.render("success"));
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
   console.log(`Server started on port ${port}`);
});