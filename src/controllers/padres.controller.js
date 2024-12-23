const Padre = require('../models/Padre');
const Alumno = require('../models/Alumno');


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
        const { idPadre } = req.params;
        const padre = await Padre.findByPk(idPadre);

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
        const { idPadre } = req.params;
        const { primerNombre, ApellidoPaterno, ApellidoMaterno, direccion, telefono, email, dni, idAlumno, ubicacion } = req.body;

        const padre = await Padre.findByPk(idPadre);

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
        const { idPadre } = req.params;

        const padre = await Padre.findByPk(idPadre);

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

const getPadresWithDetails = async (req, res) => {
    try {
        const padres = await Padre.findAll({
            include: [{
                model: Alumno,
                attributes: ['primerNombre', 'apellidoPaterno']
            }]
        });
        res.status(200).json(padres);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los registros de Padres con detalles' });
    }
};

const getPadreByAlumno = async (req, res) => {
    try {
        const { idAlumno } = req.params;

        console.log('ID Alumno recibido:', idAlumno); // Depuración

        if (!idAlumno) {
            return res.status(400).json({ error: 'El idAlumno es obligatorio.' });
        }

        const padre = await Padre.findOne({ where: { idAlumno } });

        if (!padre) {
            return res.status(404).json({ error: `No se encontró un padre asociado al alumno con idAlumno: ${idAlumno}.` });
        }

        res.status(200).json(padre);
    } catch (error) {
        console.error('Error al buscar el padre:', error);
        res.status(500).json({ error: 'Error interno al buscar el padre.' });
    }
};

module.exports = {
    getPadres,
    getPadreById,
    createPadre,
    updatePadre,
    deletePadre,
    getPadresWithDetails ,
    getPadreByAlumno
};