const express = require('express');
const handlebars = require('express-handlebars');

const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // to support JSON
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  })); 

app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({
    layoutsDir: __dirname + '/views/layouts',
    //new configuration parameter
    extname: 'hbs',
    helpers: require('./views/hbs-helper')
}));
app.set('views', './views');
app.use('/assets', express.static(__dirname + '/assets'));

// routes
require('./routes')(app);

// port where app is served
app.listen(3000, () => {
    console.log('The web server has started on port 3000');
});