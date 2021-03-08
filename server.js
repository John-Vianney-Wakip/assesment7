
const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(__dirname + '/public'))

//Array to store users
let users = [];
let books=[];

// home route
app.get('/', (req, res)=> {  
    res.sendFile(__dirname + '/index.html')
})

//route for saving Users with their fav book
app.get('/savingUsers', (req, res)=>{
    
    let user = {
        name: req.query.userName,
        favbook: req.query.book
    };
    if(req.query.book){
        books.push(req.query.book)
    }
    
    users.push(user);
    res.status(201).redirect('/');
})
//route for showing users with their fav books
app.get('/showUsers', (req, res)=>{

    let info = JSON.stringify(users);

    res.send(info);
})

//route to show favourite highest book
app.get('/favbook', (re, rs)=>{
       let bookls = "";
       let val = "";
       let fbook =[];
       let count = 0;
       for(let i=0; i<books.length; i++){

        bookls = books[0];

        for(let item of users){

            if(bookls ===item.favbook)

                   bookls = item.favbook; 
          }
          
  }

  let data = JSON.stringify(`The most favoured book is ${bookls}`);
  rs.send(data);
//   console.log(bookls);
  
})


//listerning port
const PORT = process.env.PORT ||9001;
app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`));