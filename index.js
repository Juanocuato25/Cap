const express = require("express");
const cors = require("cors");
const db = require("./config/conexion");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const PORT = process.env.PORT || 3001;

app.use(cors());

//Api Rest
app.get("/personajes", (req, res) => {
  db.query("select personaje.nombre_personaje Personaje,tipo_personaje.nombre_tipo_personaje,"+
  " pelicula.nombre_pelicula Pelicula"+
  " from tipo_personaje"+
  " inner join personaje on personaje.fk_id_tipo_personaje = tipo_personaje.id_tipo_personaje"+
  " inner join pelicula on personaje.fk_id_pelicula = pelicula.id_pelicula"+
  " order by tipo_personaje.nombre_tipo_personaje asc",(err, data) => {
      if (err) {
        return err;
      }
      res.json({ personaje: data});
    }
  );
});

app.get("/aliados", (req, res) => {
    db.query("select personaje.nombre_personaje Personaje,tipo_personaje.nombre_tipo_personaje, "+
    " pelicula.nombre_pelicula Pelicula,pelicula.fecha_estreno_pelicula,pelicula.duracion_pelicula Duracion"+
    " from tipo_personaje"+
    " inner join personaje on personaje.fk_id_tipo_personaje = tipo_personaje.id_tipo_personaje"+
    " inner join pelicula on personaje.fk_id_pelicula = pelicula.id_pelicula order by tipo_personaje.nombre_tipo_personaje asc;",(err, data) => {
        if (err) {
          return err;
        }
        res.json({ personaje: data});
      }
    );
  });

  app.get("/misiones", (req, res) => {
    db.query("SELECT * FROM mision",(err, data) => {
        if (err) {
          return err;
        }
        res.json({Misiones: data});
      }
    );
  });

  app.post('/personajes',(req, res)=>{
    console.log(Object.values(req.body))
    const values = Object.values(req.body);
    const sql ="INSERT INTO personaje (nombre_personaje, fk_id_tipo_personaje, fk_id_pelicula) VALUES(?,?,?)"
    db.query(sql, values,(err, data)=>{
      if(err){
        console.log(err)
        return err;
      }
      res.json({
        mensaje: 'Personaje Agregado',
        data
      })
    })
  })

app.listen(PORT, () => {
  console.log("Servidor en ejecucion en el puerto: " + PORT);
});
