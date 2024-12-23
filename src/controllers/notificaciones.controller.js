const Notificaciones = require('../models/Notificaciones');
const Alumno = require('../models/Alumno'); // Asegúrate de que este modelo está importado
const Padre = require('../models/Padre'); // Asegúrate de que este modelo está importado
const Deuda = require('../models/Deuda');
const { getPadreByAlumno } = require('./padres.controller');

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
        const { idNotificacion } = req.params;
        const notificacion = await Notificaciones.findByPk(idNotificacion);

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
        const { idAlumno, idDeuda, tipo, descripcion, fechaNotificacion, estado } = req.body;

        // Validar que los datos obligatorios están presentes
        if (!idAlumno || !descripcion || !fechaNotificacion) {
            return res.status(400).json({ error: 'Los campos idAlumno, descripcion y fechaNotificacion son obligatorios.' });
        }

        // Buscar el padre asociado al idAlumno
        const padre = await Padre.findOne({ where: { idAlumno } });

        if (!padre) {
            return res.status(404).json({
                error: `No se encontró un padre asociado al alumno con idAlumno: ${idAlumno}. Por favor, verifica que el idAlumno sea correcto.`,
            });
        }

        const idPadre = padre.id;

        // Crear la nueva notificación con el idPadre encontrado
        const nuevaNotificacion = await Notificaciones.create({
            idAlumno,
            idPadre,
            idDeuda,
            tipo,
            descripcion,
            fechaNotificacion,
            estado,
        });

        res.status(201).json(nuevaNotificacion);
    } catch (error) {
        console.error('Error al crear la notificación:', error);
        res.status(500).json({ error: 'Error interno al crear la notificación.' });
    }
};


// Actualizar una notificación existente
const updateNotificacion = async (req, res) => {
    try {
        const { idNotificacion } = req.params;
        const { idAlumno, idDeuda, tipo, descripcion, fechaNotificacion, estado } = req.body;

        const notificacion = await Notificaciones.findByPk(idNotificacion);
        if (!notificacion) {
            return res.status(404).json({ error: 'Notificación no encontrada' });
        }

        // Buscar idPadre asociado al idAlumno si se actualiza el idAlumno
        let idPadre = notificacion.idPadre;
        if (idAlumno && idAlumno !== notificacion.idAlumno) {
            const padre = await Padre.findOne({ where: { idAlumno } });
            if (!padre) {
                return res.status(404).json({ error: 'No se encontró un padre asociado al alumno proporcionado' });
            }
            idPadre = padre.id;
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
        const { idNotificacion } = req.params;

        const notificacion = await Notificaciones.findByPk(idNotificacion);

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
const getNotificacionesWithDetails = async (req, res) => {
    try {
        const notificaciones = await Notificaciones.findAll({
            include: [
                { model: Alumno, attributes: ['primerNombre', 'apellidoPaterno'] }, // Ajusta según el modelo
                { model: Padre, attributes: ['primerNombre', 'apellidoPaterno'] },
                { model: Deuda, attributes: ['fecha', 'montoTotal'] }
            ]
        });
        res.status(200).json(notificaciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las notificaciones con detalles' });
    }
};

const getDeudasByAlumno = async (req, res) => {
    try {
        const { idAlumno } = req.params;

        // Validar que el idAlumno esté presente
        if (!idAlumno) {
            return res.status(400).json({ error: 'El idAlumno es obligatorio.' });
        }

        // Buscar las deudas asociadas al alumno
        const deudas = await Deuda.findAll({ where: { idAlumno } });

        if (!deudas || deudas.length === 0) {
            return res.status(404).json({ error: `No se encontraron deudas para el alumno con idAlumno: ${idAlumno}.` });
        }

        res.status(200).json(deudas);
    } catch (error) {
        console.error('Error al obtener las deudas del alumno:', error);
        res.status(500).json({ error: 'Error interno al obtener las deudas.' });
    }
};

const getNotificacionesByPadre = async (req, res) => {
    try {
        const { idPadre } = req.params;

        // Validar que el idPadre esté presente
        if (!idPadre) {
            return res.status(400).json({ error: 'El idPadre es obligatorio.' });
        }

        // Buscar las notificaciones asociadas al idPadre
        const notificaciones = await Notificaciones.findAll({
            where: { idPadre },
            attributes: ['idNotificacion', 'descripcion', 'fechaNotificacion', 'estado'] // Solo los campos relevantes
        });

        if (!notificaciones || notificaciones.length === 0) {
            return res.status(404).json({ error: `No se encontraron notificaciones para el padre con idPadre: ${idPadre}.` });
        }

        res.status(200).json(notificaciones);
    } catch (error) {
        console.error('Error al obtener notificaciones para el padre:', error);
        res.status(500).json({ error: 'Error interno al obtener notificaciones.' });
    }
};


module.exports = {
    getNotificaciones,
    getNotificacionById,
    createNotificacion,
    updateNotificacion,
    deleteNotificacion,
    getNotificacionesWithDetails,
    getDeudasByAlumno ,
    getNotificacionesByPadre// Exportar la nueva función
};