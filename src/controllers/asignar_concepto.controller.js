const AsignarConcepto = require('../models/Asignar_Concepto');

// Obtener todos los registros
const getAsignarConceptos = async (req, res) => {
    try {
        const asignarConceptos = await AsignarConcepto.findAll();
        res.status(200).json(asignarConceptos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los registros de Asignar Concepto' });
    }
};

// Obtener un registro por ID
const getAsignarConceptoById = async (req, res) => {
    try {
        const { idAsignar_Concepto } = req.params;
        const asignarConcepto = await AsignarConcepto.findByPk(idAsignar_Concepto);

        if (!asignarConcepto) {
            return res.status(404).json({ error: 'Registro no encontrado' });
        }

        res.status(200).json(asignarConcepto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el registro' });
    }
};

// Crear un nuevo registro
const createAsignarConcepto = async (req, res) => {
    try {
        const { concepto, idEscala, idConcepto } = req.body;

        if (!concepto || !idEscala || !idConcepto) {
            return res.status(400).json({ error: 'Todos los campos obligatorios deben ser proporcionados' });
        }

        const nuevoAsignarConcepto = await AsignarConcepto.create({
            concepto,
            idEscala,
            idConcepto
        });

        res.status(201).json(nuevoAsignarConcepto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el registro' });
    }
};

// Actualizar un registro existente
const updateAsignarConcepto = async (req, res) => {
    try {
        const { idAsignar_Concepto } = req.params;
        const { concepto, idEscala, idConcepto } = req.body;

        const asignarConcepto = await AsignarConcepto.findByPk(idAsignar_Concepto);

        if (!asignarConcepto) {
            return res.status(404).json({ error: 'Registro no encontrado' });
        }

        await asignarConcepto.update({
            concepto,
            idEscala,
            idConcepto
        });

        res.status(200).json(asignarConcepto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el registro' });
    }
};

// Eliminar un registro
const deleteAsignarConcepto = async (req, res) => {
    try {
        const { idAsignar_Concepto } = req.params;

        const asignarConcepto = await AsignarConcepto.findByPk(idAsignar_Concepto);

        if (!asignarConcepto) {
            return res.status(404).json({ error: 'Registro no encontrado' });
        }

        await asignarConcepto.destroy();

        res.status(200).json({ message: 'Registro eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el registro' });
    }
};

module.exports = {
    getAsignarConceptos,
    getAsignarConceptoById,
    createAsignarConcepto,
    updateAsignarConcepto,
    deleteAsignarConcepto
};
