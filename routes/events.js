/*
        Eventos Routes
        host + /api/events
*/


const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

const {validarJWT} = require('../middlewares/validar-jwt')
const { validarCampos } = require('../middlewares/validar-campos');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
//todas tienen que pasar por la validacion del JWT
//obtener eventos
router.use( validarJWT );


// Obtener eventos 
router.get('/', getEventos );

//crear eventos
router.post(
    '/',
    [
        check('title','El título es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom(isDate),
        check('end','Fecha de finalización es obligatoria').custom(isDate),
        
        validarCampos
    ]    ,
    crearEvento 
);

//actualizar evento
router.put(
    '/:id', 
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    actualizarEvento 
);

//eliminar evento
router.delete('/:id', eliminarEvento );


module.exports = router;