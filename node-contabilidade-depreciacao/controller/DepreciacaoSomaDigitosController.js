

module.exports = function (app) {
    app.get('/depreciacao/soma-digitos', (req, res) => {
        res.render('depreciacao/soma-digitos/form');
    });

    app.post('/depreciacao/soma-digitos', (req, res) => {

        const anos = parseInt(req.body.anos);
        const valor = req.body.valor;
        let valor_bem = valor;

        let soma = 0;
        for (var i = 1; i <= anos; i++) {
            soma += i;
        }

        let linhas = [];

        if (req.body.tipo == 'CRESCENTE') {
            for (var i = 0; i <= anos; i++) {
                if (i == 0) {
                    linhas.push({
                        'ano': i,
                        'proporcao': '',
                        'porcentagem': '',
                        'valor_depreciacao': '',
                        'valor_bem': valor_bem.toFixed(2)
                    })
                } else {
                    const valor_depreciacao = parseFloat(valor * i / soma).toFixed(2);
                    linhas.push({
                        'ano': i,
                        'proporcao': `${i}/${soma}`,
                        'porcentagem': parseFloat(i / soma * 100).toFixed(2),
                        'valor_depreciacao': valor_depreciacao,
                        'valor_bem': parseFloat(valor_bem -= valor_depreciacao).toFixed(2)
                    })
                }
            }
        } else {
            linhas.push({
                'ano': 0,
                'proporcao': '',
                'porcentagem': '',
                'valor_depreciacao': '',
                'valor_bem': valor_bem.toFixed(2)
            })

            for (var i = anos; i >= 1; i--) {
                const valor_depreciacao = parseFloat(valor * i / soma).toFixed(2);
                linhas.push({
                    'ano': anos - i + 1,
                    'proporcao': `${(i)}/${soma}`,
                    'porcentagem': parseFloat(i / soma * 100).toFixed(2),
                    'valor_depreciacao': valor_depreciacao,
                    'valor_bem': parseFloat(valor_bem -= valor_depreciacao).toFixed(2)
                })

            }
        }

        res.render('depreciacao/soma-digitos/tabela', { layout: false, linhas: linhas });
    });
} 