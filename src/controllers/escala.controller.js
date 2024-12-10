const Escala = require('../models/Escala');

// Obtener todas las escalas
const getEscalas = async (req, res) => {
    try {
        const escalas = await Escala.findAll();
        res.status(200).json(escalas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las escalas' });
    }
};

// Obtener una escala por ID
const getEscalaById = async (req, res) => {
    try {
        const { id } = req.params;
        const escala = await Escala.findByPk(id);

        if (!escala) {
            return res.status(404).json({ error: 'Escala no encontrada' });
        }

        res.status(200).json(escala);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la escala' });
    }
};

// Crear una nueva escala
const createEscala = async (req, res) => {
    try {
        const { escala, descripcion, monto } = req.body;

        // Validar que los datos obligatorios están presentes
        if (!escala || !descripcion || !monto) {
            return res.status(400).json({ error: 'Todos los campos obligatorios deben ser proporcionados' });
        }

        const nuevaEscala = await Escala.create({
            escala,
            descripcion,
            monto
        });

        res.status(201).json(nuevaEscala);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la escala' });
    }
};

// Actualizar una escala existente
const updateEscala = async (req, res) => {
    try {
        const { id } = req.params;
        const { escala, descripcion, monto } = req.body;

        const escalaExistente = await Escala.findByPk(id);

        if (!escalaExistente) {
            return res.status(404).json({ error: 'Escala no encontrada' });
        }

        await escalaExistente.update({
            escala,
            descripcion,
            monto
        });

        res.status(200).json(escalaExistente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la escala' });
    }
};

// Eliminar una escala
const deleteEscala = async (req, res) => {
    try {
        const { id } = req.params;

        const escala = await Escala.findByPk(id);

        if (!escala) {
            return res.status(404).json({ error: 'Escala no encontrada' });
        }

        await escala.destroy();

        res.status(200).json({ message: 'Escala eliminada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la escala' });
    }
};
const escalas = await Escala.findAll({
    include: [
        { model: 'Asignar_Escala', attributes: ['idAsignarEscala'] }, // Ajusta según las columnas necesarias
        { model: 'Asignar_Concepto', attributes: ['concepto'] }
    ]
});


module.exports = {
    getEscalas,
    getEscalaById,
    createEscala,
    updateEscala,
    deleteEscala
};
