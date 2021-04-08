var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var mail = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret_key = process.env.SECRET_KEY || "prew";

var con= mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Mbrayan99",
    database: "baselista",
    insecureAuth: true,
    multipleStatements: true
});

//Funcion para mostrar todas las listas completadas
router.get('/get_listac', (req,res,next)=>{
    var query = "select lista.*, usuarios.nombre from baselista.lista join baselista.usuarios on lista.iduser = usuarios.idusuarios where usuarios.idusuarios = ? and lista.estado=1";
    var value = [req.query.idusuarios];
    con.query(query,value, (err, result, field)=>{
        if(err){
            next(err);
        }
        else{
            res.status(200).json(result);
        }
    });
});
//Funcion para mostrar todas las listas no completadas
router.get('/get_listan', (req,res,next)=>{
    var query = "select lista.*, usuarios.nombre from baselista.lista join baselista.usuarios on lista.iduser = usuarios.idusuarios where usuarios.idusuarios = ? and lista.estado=0";
    var value = [req.query.idusuarios];
    con.query(query,value, (err, result, field)=>{
        if(err){
            next(err);
        }
        else{
            res.status(200).json(result);
        }
    });
});

//Funcion para insertar una lista
router.post('/insert_lista', (req,res,next)=>{
    var query = "insert into baselista.lista(iduser,titulo,descripcion,estado) values (?,?,?,?)";
    var value = [req.body.iduser, req.body.titulo, req.body.descripcion, req.body.estado]; 
    con.query(query, value, (err, result, field) =>{
        if(err){
            next(err);
        }
        else{
            res.status(200).json(result);
        }
    });  
});

//Funcion para agregar un usuario
router.post('/insert_usuario', (req,res,next)=>{
    var user = {
        idusuarios: req.body.idusuarios,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        password: req.body.password,
        correo: req.body.correo
    };
    const create_user = (user) => {
       // console.log(user);
        var query = "insert into baselista.usuarios(idusuarios,nombre,apellido,password,correo) values (?) ";
        con.query(query, [Object.values(user)], (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500).send();
            } else {
                res.status(200).send();
            }
        });
    };
    bcrypt.hash(user.password, 18).then((hashedPassword) => {
        user.password = hashedPassword;
        create_user(user);
    });
});

//Funcion de Loguearse
router.post('/login', (req,res,next) =>{
    var user = {
        idusuarios: req.body.idusuarios,
        password: req.body.password
    };
    const get_token = (user) => {
        var query = "SELECT idusuarios, password FROM baselista.usuarios WHERE idusuarios = ?"
        con.query(query, [user.idusuarios], (err, result, fields) => {
            if (err || result.length == 0) {
                console.log(err);
                res.status(400).json({message:"Usuario o Contraseña Incorrectos"});
            } else {
                bcrypt.compare(user.password,result[0].password, (error, isMatch)=> {
                    if (isMatch){
                        var token = jwt.sign({userId: result[0].idusuarios}, secret_key);
                        res.status(200).json({token});
                    }else if (error){
                        res.status(400).json(error);
                    }else {
                        res.status(400).json({message: "Usuario o Contraseña Incorrectos"});
                    }
                });
            }
        });
    }
    get_token(user);

});

//Funcion para Modificar la lista
router.put('/update_lista', (req, res, next) => {
    var query = "update baselista.lista set titulo=?, descripcion=?, estado=? where iduser = ? and idlista=?";
    var value = [req.body.titulo, 
                 req.body.descripcion, 
                 req.body.estado,
                 req.body.iduser,
                 req.body.idlista];
    con.query(query, value,  (err, result, field) => {
        if(err){
            next(err);
        }
        else{
            res.status(200).json(result);
        }
    });
});

//Funcion para alterar el estado
router.put('/update_listaestado', (req, res, next) => {
    var query = "update baselista.lista set estado=? where idlista=?";
    var value = [req.body.estado,
                 req.body.idlista];
    con.query(query, value,  (err, result, field) => {
        if(err){
            next(err);
        }
        else{
            res.status(200).json(result);
        }
    });
});






router.put('/update_lista', (req, res, next) => {
    var query = "update baselista.lista set titulo=?,descripcion=? where idlista=?";
    var value = [req.body.titulo,
                 req.body.descripcion,
                req.body.idlista];
    con.query(query, value,  (err, result, field) => {
        if(err){
            next(err);
        }
        else{
            res.status(200).json(result);
        }
    });
});





//Guardamos al ususario logueado
router.put('/update_logueo', (req, res, next) => {
    var query = "update baselista.logeo set usuario = ? where id=1";
    var value = [req.body.usuario];
    console.log(value);
    con.query(query, value,  (err, result, field) => {
        if(err){
            next(err);
        }
        else{
            res.status(200).json(result);
        }
    });
});

//Obtenemos al ususario logueado
router.get('/get_ususario', (req,res,next)=>{
    var query = "select usuario from baselista.logeo where id=1";
    con.query(query, (err, result, field)=>{
        if(err){
            next(err);
        }
        else{
            res.status(200).json(result);
        }
    });
});


router.get('/get_nombre', (req,res,next)=>{
    var query = "SELECT nombre FROM baselista.usuarios where idusuarios=?";
    var value = [req.query.idusuarios];
    con.query(query,value, (err, result, field)=>{
        if(err){
            next(err);
        }
        else{
            res.status(200).json(result);
        }
    });
});


router.delete('/delete_tarea', (req, res, next) => {
    var query = 'delete from baselista.lista where idlista = ?';
    
    var values = [req.query.idlista];

    con.query(query, values, (err, result, field) => {
       if(err){
           next(err);
       } else {
           res.status(200).json(result)
       }
      });
});


//Obtenemos la descripcion del Usuario
router.get('/get_descripcion', (req,res,next)=>{
    var query = "SELECT descripcion FROM baselista.lista where idlista=?";
    var value = [req.query.idlista];
    con.query(query,value, (err, result, field)=>{
        if(err){
            next(err);
        }
        else{
            res.status(200).json(result);
        }
    });
});

router.post('/insert_recovery', (req,res,next)=>{
    var query = "insert into baselista.recovery(iduser,pass,correo) values (?,?,?)";
    var value = [req.body.iduser, req.body.pass, req.body.correo]; 
    con.query(query, value, (err, result, field) =>{
        if(err){
            next(err);
        }
        else{
            res.status(200).json(result);
        }
    });  
});

//recuperamos la contraseña del usuario
router.post('/correo', (req, res, next)=>{
    var query = "Select pass from baselista.recovery where correo = ?";
    var value = [req.body.correo];
    console.log(value);
    var x="";
    con.query(query,value, (err, result)=>{
        x = result[0].pass;
        if(err){
            next(err);
        }
        else{
            
            mail = mail.createTransport({
                service: 'gmail',
                secure: false,
                auth: {
                  user: 'josueamador2711@gmail.com',
                  pass: 'egtcdhzryexqibnr'
                },
                tls: {
                    rejectUnauthorized: false
                }
              });

              var mailOptions = {
                from: 'josueamador2711@gmail.com',
                to: req.body.correo,
                subject: 'CLAVE DE USUARIO RECUPERADA',
                text: 'La clave de su cuenta es: '+x
              };

              mail.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });

              res.status(200).json(result);
        }
    });
});

module.exports = router; 