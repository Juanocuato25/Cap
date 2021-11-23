const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'cap_american',
    insecureAuth : true
});

conexion.connect((err)=> {
    if(err){
        console.log('Error DB: ', err);
        return err;
    }
    console.log('Conexion Establecida');
})

module.exports = conexion;