const HistorialCambios = require('../models/Historial_Cambios');

// Obtener todos los cambios del historial
const getHistorialCambios = async (req, res) => {
    try {
        const historialCambios = await HistorialCambios.findAll();
        res.status(200).json(historialCambios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el historial de cambios' });
    }
};

// Obtener un cambio del historial por ID
const getHistorialCambioById = async (req, res) => {
    try {
        const { id } = req.params;
        const historialCambio = await HistorialCambios.findByPk(id);

        if (!historialCambio) {
            return res.status(404).json({ error: 'Cambio no encontrado en el historial' });
        }

        res.status(200).json(historialCambio);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el cambio del historial' });
    }
};

// Crear un nuevo registro en el historial de cambios
const createHistorialCambio = async (req, res) => {
    try {
        const { idAsignarEscala, descripcion, fechaCambio } = req.body;

        // Validar que los datos obligatorios están presentes
        if (!idAsignarEscala || !descripcion || !fechaCambio) {
            return res.status(400).json({ error: 'Todos los campos obligatorios deben ser proporcionados' });
        }

        const nuevoCambio = await HistorialCambios.create({
            idAsignarEscala,
            descripcion,
            fechaCambio
        });

        res.status(201).json(nuevoCambio);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el registro en el historial de cambios' });
    }
};

// Actualizar un registro existente en el historial de cambios
const updateHistorialCambio = async (req, res) => {
    try {
        const { id } = req.params;
        const { idAsignarEscala, descripcion, fechaCambio } = req.body;

        const historialCambio = await HistorialCambios.findByPk(id);

        if (!historialCambio) {
            return res.status(404).json({ error: 'Cambio no encontrado en el historial' });
        }

        await historialCambio.update({
            idAsignarEscala,
            descripcion,
            fechaCambio
        });

        res.status(200).json(historialCambio);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el registro en el historial de cambios' });
    }
};

// Eliminar un registro del historial de cambios
const deleteHistorialCambio = async (req, res) => {
    try {
        const { id } = req.params;

        const historialCambio = await HistorialCambios.findByPk(id);

        if (!historialCambio) {
            return res.status(404).json({ error: 'Cambio no encontrado en el historial' });
        }

        await historialCambio.destroy();

        res.status(200).json({ message: 'Registro eliminado del historial de cambios exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el registro del historial de cambios' });
    }
};

const historialCambios = await HistorialCambios.findAll({
    include: {
        model: Asignar_Escala, // Ajusta según el modelo
        attributes: ['idAlumno', 'fechaAsignacion'] // Ajusta según las columnas necesarias
    }
});


module.exports = {
    getHistorialCambios,
    getHistorialCambioById,
    createHistorialCambio,
    updateHistorialCambio,
    deleteHistorialCambio
};
