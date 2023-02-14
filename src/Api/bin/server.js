const app = require('../src/app');
const conn = require('../src/db/connection');

const port = normalizaPort(process.env.PORT || '8080');

function normalizaPort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}
conn.connect((err) => {
    if (err) {
        console.log('Erro connecting to database...', err)
        return
    }
    console.log('Connection established!')
})

app.listen(port, function () {
    console.log(`app listening on port ${port}`)
})