const Concepto = require('../models/Concepto');

// Obtener todos los registros
const getConceptos = async (req, res) => {
    try {
        const conceptos = await Concepto.findAll();
        res.status(200).json(conceptos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los conceptos' });
    }
};

// Obtener un registro por ID
const getConceptoById = async (req, res) => {
    try {
        const { idConcepto } = req.params;
        const concepto = await Concepto.findByPk(idConcepto);

        if (!concepto) {
            return res.status(404).json({ error: 'Concepto no encontrado' });
        }

        res.status(200).json(concepto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el concepto' });
    }
};

// Crear un nuevo registro
const createConcepto = async (req, res) => {
    try {
        const { concepto, descripcion } = req.body;

        // Validar que los campos requeridos estén presentes
        if (!concepto || !descripcion) {
            return res.status(400).json({ error: 'Todos los campos obligatorios deben ser proporcionados' });
        }

        const nuevoConcepto = await Concepto.create({
            concepto,
            descripcion
        });

        res.status(201).json(nuevoConcepto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el concepto' });
    }
};

// Actualizar un registro existente
const updateConcepto = async (req, res) => {
    try {
        const { idConcepto } = req.params;
        const { concepto, descripcion } = req.body;

        const conceptoExistente = await Concepto.findByPk(idConcepto);

        if (!conceptoExistente) {
            return res.status(404).json({ error: 'Concepto no encontrado' });
        }

        await conceptoExistente.update({
            concepto,
            descripcion
        });

        res.status(200).json(conceptoExistente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el concepto' });
    }
};

// Eliminar un registro
const deleteConcepto = async (req, res) => {
    try {
        const { idConcepto } = req.params;

        const concepto = await Concepto.findByPk(idConcepto);

        if (!concepto) {
            return res.status(404).json({ error: 'Concepto no encontrado' });
        }

        await concepto.destroy();

        res.status(200).json({ message: 'Concepto eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el concepto' });
    }
};

module.exports = {
    getConceptos,
    getConceptoById,
    createConcepto,
    updateConcepto,
    deleteConcepto
};
