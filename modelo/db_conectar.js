import mysql from 'mysql2'
var conectar = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '4125',
      database : 'base_de_datos_empresa'
  })

  conectar.connect(function(err) {
      if (err) {
          console.error('Error en la conexion: ' + err.stack)
      return
    }
 
        console.log('conexion exitosa ID: ' + conectar.threadId)
  })

export {conectar}