var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one': {
        title: 'Article One | Pallavi MAzumder',
        heading: 'Article One',
        date: '25 Sept, 2016',
        content:`
        
                    <p>
                        This is the content of my first article. I love cats.This is the content of my first article. I love cats.This is the content of my first article. I love cats a lot.
                    </p>
                    
                    <p>
                        Durga Puja is right here. Thanks to Ma durga for making this work! LOL! HAPPY DURGA PUJA! It's really hard to concentrate when you are a bengali and durga puja is knocking at the door.
                    </p>`
                
    
                  
    },
    'article-two': {
     title: 'Article Two | Pallavi MAzumder',
        heading: 'Article Two',
        date: '28 Sept, 2016',
        content: `
        
                    <p>
                        This is the content of my second article. I love cats.This is the content of my first article. I love cats.This is the content of my second article. I love cats.
                    </p>
                    <p>
                        This is the content of my first article. I love cats.This is the content of my first article. I love cats.
                        This is the content of my first article. I love cats.
                    </p>
                    <p>
                        This is the content of my first article. I love cats.This is the content of my first article. I love cats.This is the content of my first article. I love cats.
                    </p> ` 
                
        
    },
    'article-three' : {
         title: 'Article Three|Pallavi MAzumder',
        heading: 'Article Three',
        date: '30 Sept, 2016',
        content:`
        
                    <p>
                        This is the content of my third article. I love cats.This is the content of my first article. I love cats.This is the content of my first article. I love cats.
                    </p>
                   
                    <p>
                        This is the content of my first article. I love cats.This is the content of my first article. I love cats.This is the content of my first article. I love cats.
                    </p>`
                
        
    }
};

function createTemplate (data) {
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    
    var htmlTemplate = `

    <html>
        <head>
            <title>
                ${title}
            </title>
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <link href="/ui/style.css" rel="stylesheet" />
            
        </head>
        <body>
            <div class="container">
                <div>
                    <a href="/">Home</a>
                </div>
                <hr/>
                <h3>
                    ${heading}
                </h3>
                <div>
                    ${date}
                </div>
                <div>
                    ${content}
                    
                </div>
            </div>
        </body>
    </html>
    `;
    return htmlTemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var counter = 0;
app.get('/counter',function(req,res){
   counter = counter+1;
   res.send(counter.toString());
    
});

app.get('/:articleName',function (req,res) {
    //ArticleName == article-one
    //articles[articleName]== content object of articleOne
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});


app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var names=[];
app.get('/submit-name/:name',function(req,res){
    //get the name from the request object
    var name = req.params.name;
    names.push(name);
    res.send(JSON.stringify(names));
    
})
var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
