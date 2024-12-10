const Padre = require('../models/Padre');

// Obtener todos los registros
const getPadres = async (req, res) => {
    try {
        const padres = await Padre.findAll();
        res.status(200).json(padres);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los registros de Padres' });
    }
};

// Obtener un registro por ID
const getPadreById = async (req, res) => {
    try {
        const { id } = req.params;
        const padre = await Padre.findByPk(id);

        if (!padre) {
            return res.status(404).json({ error: 'Registro no encontrado' });
        }

        res.status(200).json(padre);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el registro' });
    }
};

// Crear un nuevo registro
const createPadre = async (req, res) => {
    try {
        const { primerNombre, ApellidoPaterno, ApellidoMaterno, direccion, telefono, email, dni, idAlumno, ubicacion } = req.body;

        if (!primerNombre || !ApellidoPaterno || !ApellidoMaterno || !direccion || !telefono || !email || !dni) {
            return res.status(400).json({ error: 'Todos los campos obligatorios deben ser proporcionados' });
        }

        const nuevoPadre = await Padre.create({
            primerNombre,
            ApellidoPaterno,
            ApellidoMaterno,
            direccion,
            telefono,
            email,
            dni,
            idAlumno,
            ubicacion
        });

        res.status(201).json(nuevoPadre);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el registro' });
    }
};

// Actualizar un registro existente
const updatePadre = async (req, res) => {
    try {
        const { id } = req.params;
        const { primerNombre, ApellidoPaterno, ApellidoMaterno, direccion, telefono, email, dni, idAlumno, ubicacion } = req.body;

        const padre = await Padre.findByPk(id);

        if (!padre) {
            return res.status(404).json({ error: 'Registro no encontrado' });
        }

        await padre.update({
            primerNombre,
            ApellidoPaterno,
            ApellidoMaterno,
            direccion,
            telefono,
            email,
            dni,
            idAlumno,
            ubicacion
        });

        res.status(200).json(padre);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el registro' });
    }
};

// Eliminar un registro
const deletePadre = async (req, res) => {
    try {
        const { id } = req.params;

        const padre = await Padre.findByPk(id);

        if (!padre) {
            return res.status(404).json({ error: 'Registro no encontrado' });
        }

        await padre.destroy();

        res.status(200).json({ message: 'Registro eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el registro' });
    }
};

const padres = await Padre.findAll({
    include: {
        model: Alumno,
        attributes: ['primerNombre', 'apellidoPaterno']
    }
});


module.exports = {
    getPadres,
    getPadreById,
    createPadre,
    updatePadre,
    deletePadre
};
