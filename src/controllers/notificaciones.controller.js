const Notificaciones = require('../models/Notificaciones');

// Obtener todas las notificaciones
const getNotificaciones = async (req, res) => {
    try {
        const notificaciones = await Notificaciones.findAll();
        res.status(200).json(notificaciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las notificaciones' });
    }
};

// Obtener una notificación por ID
const getNotificacionById = async (req, res) => {
    try {
        const { id } = req.params;
        const notificacion = await Notificaciones.findByPk(id);

        if (!notificacion) {
            return res.status(404).json({ error: 'Notificación no encontrada' });
        }

        res.status(200).json(notificacion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la notificación' });
    }
};

// Crear una nueva notificación
const createNotificacion = async (req, res) => {
    try {
        const { idAlumno, idPadre, idDeuda, tipo, descripcion, fechaNotificacion, estado } = req.body;

        // Validar que los datos obligatorios están presentes
        if (!descripcion || !fechaNotificacion) {
            return res.status(400).json({ error: 'Los campos obligatorios deben ser proporcionados' });
        }

        const nuevaNotificacion = await Notificaciones.create({
            idAlumno,
            idPadre,
            idDeuda,
            tipo,
            descripcion,
            fechaNotificacion,
            estado
        });

        res.status(201).json(nuevaNotificacion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la notificación' });
    }
};

// Actualizar una notificación existente
const updateNotificacion = async (req, res) => {
    try {
        const { id } = req.params;
        const { idAlumno, idPadre, idDeuda, tipo, descripcion, fechaNotificacion, estado } = req.body;

        const notificacion = await Notificaciones.findByPk(id);

        if (!notificacion) {
            return res.status(404).json({ error: 'Notificación no encontrada' });
        }

        await notificacion.update({
            idAlumno,
            idPadre,
            idDeuda,
            tipo,
            descripcion,
            fechaNotificacion,
            estado
        });

        res.status(200).json(notificacion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la notificación' });
    }
};

// Eliminar una notificación
const deleteNotificacion = async (req, res) => {
    try {
        const { id } = req.params;

        const notificacion = await Notificaciones.findByPk(id);

        if (!notificacion) {
            return res.status(404).json({ error: 'Notificación no encontrada' });
        }

        await notificacion.destroy();

        res.status(200).json({ message: 'Notificación eliminada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la notificación' });
    }
};
const notificaciones = await Notificaciones.findAll({
    include: [
        { model: Alumno, attributes: ['primerNombre', 'apellidoPaterno'] }, // Ajusta según el modelo
        { model: Padre, attributes: ['primerNombre', 'apellidoPaterno'] },
        { model: Deuda, attributes: ['fecha', 'montoTotal'] }
    ]
});


module.exports = {
    getNotificaciones,
    getNotificacionById,
    createNotificacion,
    updateNotificacion,
    deleteNotificacion
};
