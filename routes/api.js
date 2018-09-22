const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/users', (req, res) => {
    User.find({}, (err, user) => {
        res.json(user)
    });
});

router.post('/user', (req, res) => {
    var usuario = req.body.user;
    User.create(usuario, (err, user) => {
        if (err) {
            res.status(400);
            res.json('{' +
                'error: "Ocurrio un error creando el usuario"' +
                'estado: "' + JSON.stringify(err) + '"' +
                '}');
        }
        res.status(200);
        res.json("Creado exitosamente")
    });
});

router.post('/users', (req, res) => {
    var usuario = req.body.user;
    var amigo = req.body.friend;

    var success = false;
    User.findOne({ _id: usuario }, (err, user) => {
        var usuarioNuevo = JSON.parse(JSON.stringify(user));
        usuarioNuevo.amigo = amigo;
        usuarioNuevo.password = req.body.password;
        
        User.updateOne(user, usuarioNuevo, (err, user) => {
            if (!err) {
                success = true;
            }
            if (!success) {
                res.status(500).send("Error actualizando primer dato");
            }
            User.findOne({ nombre: amigo }, (err, user) => {
                var usuarioNuevo = JSON.parse(JSON.stringify(user));
                usuarioNuevo.ocupado = true;
                User.updateOne(user, usuarioNuevo, (err, user) => {
                    if (!err) {
                        success = true;
                        res.send(user);
                        return;
                    }
                    res.status(500).send("Ocurrio un error por favor reintente");
                })
            });
        });
    });
});

module.exports = router;