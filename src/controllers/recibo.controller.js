const Recibo = require('../models/Recibo');

// Obtener todos los recibos
const getRecibos = async (req, res) => {
    try {
        const recibos = await Recibo.findAll();
        res.status(200).json(recibos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los recibos' });
    }
};

// Obtener un recibo por ID
const getReciboById = async (req, res) => {
    try {
        const { id } = req.params;
        const recibo = await Recibo.findByPk(id);

        if (!recibo) {
            return res.status(404).json({ error: 'Recibo no encontrado' });
        }

        res.status(200).json(recibo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el recibo' });
    }
};

// Crear un nuevo recibo
const createRecibo = async (req, res) => {
    try {
        const { idAlumno, idDeuda, formaPago, nOperacion, fechaEmision, importe } = req.body;

        // Validar que los datos obligatorios están presentes
        if (!idAlumno || !idDeuda || !formaPago || !nOperacion || !fechaEmision || !importe) {
            return res.status(400).json({ error: 'Todos los campos obligatorios deben ser proporcionados' });
        }

        const nuevoRecibo = await Recibo.create({
            idAlumno,
            idDeuda,
            formaPago,
            nOperacion,
            fechaEmision,
            importe
        });

        res.status(201).json(nuevoRecibo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el recibo' });
    }
};

// Actualizar un recibo existente
const updateRecibo = async (req, res) => {
    try {
        const { id } = req.params;
        const { idAlumno, idDeuda, formaPago, nOperacion, fechaEmision, importe } = req.body;

        const recibo = await Recibo.findByPk(id);

        if (!recibo) {
            return res.status(404).json({ error: 'Recibo no encontrado' });
        }

        await recibo.update({
            idAlumno,
            idDeuda,
            formaPago,
            nOperacion,
            fechaEmision,
            importe
        });

        res.status(200).json(recibo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el recibo' });
    }
};

// Eliminar un recibo
const deleteRecibo = async (req, res) => {
    try {
        const { id } = req.params;

        const recibo = await Recibo.findByPk(id);

        if (!recibo) {
            return res.status(404).json({ error: 'Recibo no encontrado' });
        }

        await recibo.destroy();

        res.status(200).json({ message: 'Recibo eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el recibo' });
    }
};

const recibos = await Recibo.findAll({
    include: [
        { model: Alumno, attributes: ['primerNombre', 'apellidoPaterno'] }, // Ajusta según tu modelo
        { model: Deuda, attributes: ['fecha', 'montoTotal'] }
    ]
});


module.exports = {
    getRecibos,
    getReciboById,
    createRecibo,
    updateRecibo,
    deleteRecibo
};
