const Pago = require('../models/Pago');

// Obtener todos los pagos
const getPagos = async (req, res) => {
    try {
        const pagos = await Pago.findAll();
        res.status(200).json(pagos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los pagos' });
    }
};

// Obtener un pago por ID
const getPagoById = async (req, res) => {
    try {
        const { id } = req.params;
        const pago = await Pago.findByPk(id);

        if (!pago) {
            return res.status(404).json({ error: 'Pago no encontrado' });
        }

        res.status(200).json(pago);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el pago' });
    }
};

// Crear un nuevo pago
const createPago = async (req, res) => {
    try {
        const { idPadre, idAlumno, idDeuda, fechaPago, estadoPago } = req.body;

        // Validar que los datos obligatorios estén presentes
        if (!idPadre || !idAlumno || !idDeuda || !fechaPago || !estadoPago) {
            return res.status(400).json({ error: 'Todos los campos obligatorios deben ser proporcionados' });
        }

        const nuevoPago = await Pago.create({
            idPadre,
            idAlumno,
            idDeuda,
            fechaPago,
            estadoPago
        });

        res.status(201).json(nuevoPago);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el pago' });
    }
};

// Actualizar un pago existente
const updatePago = async (req, res) => {
    try {
        const { id } = req.params;
        const { idPadre, idAlumno, idDeuda, fechaPago, estadoPago } = req.body;

        const pago = await Pago.findByPk(id);

        if (!pago) {
            return res.status(404).json({ error: 'Pago no encontrado' });
        }

        await pago.update({
            idPadre,
            idAlumno,
            idDeuda,
            fechaPago,
            estadoPago
        });

        res.status(200).json(pago);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el pago' });
    }
};

// Eliminar un pago
const deletePago = async (req, res) => {
    try {
        const { id } = req.params;

        const pago = await Pago.findByPk(id);

        if (!pago) {
            return res.status(404).json({ error: 'Pago no encontrado' });
        }

        await pago.destroy();

        res.status(200).json({ message: 'Pago eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el pago' });
    }
};

const pagos = await Pago.findAll({
    include: [
        { model: Padre, attributes: ['primerNombre', 'apellidoPaterno'] }, // Ajusta según tu modelo
        { model: Alumno, attributes: ['primerNombre', 'apellidoPaterno'] },
        { model: Deuda, attributes: ['fecha', 'montoTotal'] }
    ]
});


module.exports = {
    getPagos,
    getPagoById,
    createPago,
    updatePago,
    deletePago
};
