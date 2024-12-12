const Condonacion = require('../models/Condonacion');
const Deuda = require('../models/Deuda'); // Asegúrate de tener este modelo y que esté correctamente asociado.

const getCondonaciones = async (req, res) => {
    try {
        const condonaciones = await Condonacion.findAll();
        res.status(200).json(condonaciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las condonaciones' });
    }
};

const getCondonacionById = async (req, res) => {
    try {
        const { idCondonacion } = req.params;
        const condonacion = await Condonacion.findByPk(idCondonacion);

        if (!condonacion) {
            return res.status(404).json({ error: 'Condonación no encontrada' });
        }

        res.status(200).json(condonacion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la condonación' });
    }
};

const createCondonacion = async (req, res) => {
    try {
        const { idDeuda, fecha } = req.body;

        // Validar que los datos obligatorios están presentes
        if (!idDeuda || !fecha) {
            return res.status(400).json({ error: 'Todos los campos obligatorios deben ser proporcionados' });
        }

        const nuevaCondonacion = await Condonacion.create({
            idDeuda,
            fecha
        });

        res.status(201).json(nuevaCondonacion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la condonación' });
    }
};

const updateCondonacion = async (req, res) => {
    try {
        const { idCondonacion } = req.params;
        const { idDeuda, fecha } = req.body;

        const condonacion = await Condonacion.findByPk(idCondonacion);

        if (!condonacion) {
            return res.status(404).json({ error: 'Condonación no encontrada' });
        }

        await condonacion.update({
            idDeuda,
            fecha
        });

        res.status(200).json(condonacion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la condonación' });
    }
};

const deleteCondonacion = async (req, res) => {
    try {
        const { idCondonacion } = req.params;

        const condonacion = await Condonacion.findByPk(idCondonacion);

        if (!condonacion) {
            return res.status(404).json({ error: 'Condonación no encontrada' });
        }

        await condonacion.destroy();

        res.status(200).json({ message: 'Condonación eliminada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la condonación' });
    }
};

const getAllCondonacionesWithDeuda = async (req, res) => {
    try {
        const condonaciones = await Condonacion.findAll({
            include: {
                model: Deuda, // Asegúrate de que 'Deuda' sea el modelo correcto asociado en tus definiciones de sequelize
                attributes: ['montoTotal', 'fecha', 'estado']
            }
        });
        res.status(200).json(condonaciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las condonaciones con detalles de deuda' });
    }
};

module.exports = {
    getCondonaciones,
    getCondonacionById,
    createCondonacion,
    updateCondonacion,
    deleteCondonacion,
    getAllCondonacionesWithDeuda // Exportar la nueva función

};
