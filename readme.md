#EXPRESS.JS
[![Express Logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)](http://expressjs.com/)

  Fast, unopinionated, minimalist web framework for [node](http://nodejs.org).


#description

This application 75% complete, buid using mysql and express.js


login admin

dickyperdian
asder123

#config database
create folder config
        --index.js

        input script below
        
        //start
        var mysql = require('mysql')

        var connection = mysql.createConnection({
            host : 'host',
            user : 'user',
            password : '',
            database : 'database',
            multipleStatements: true
        })

        connection.connect(function(err) {
            if (err) throw err
            console.log('connection ok')
        });


        module.exports = connection;
        //end