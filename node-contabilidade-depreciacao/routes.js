


module.exports=function(app){
    app.get('/', (req, res) => {
        res.render('home/home');
    });
    app.get('/about-us', (req, res) => {
        res.render('about-us');
    });

    require('./controller/DepreciacaoSomaDigitosController')(app);
}