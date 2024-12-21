const Pago = require('../models/Pago');
const Padre = require('../models/Padre'); // Ensure this model is properly imported
const Alumno = require('../models/Alumno'); // Ensure this model is properly imported
const Deuda = require('../models/Deuda'); // Ensure this model is properly imported

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
        const { idPago } = req.params;
        const pago = await Pago.findByPk(idPago);

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
        const { idPago } = req.params;
        const { idPadre, idAlumno, idDeuda, fechaPago, estadoPago } = req.body;

        const pago = await Pago.findByPk(idPago);

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
        const { idPago } = req.params;

        const pago = await Pago.findByPk(idPago);

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

const getPagosWithDetails = async (req, res) => {
    try {
        const pagos = await Pago.findAll({
            include: [
                { model: Padre, attributes: ['primerNombre', 'apellidoPaterno'] },
                { model: Alumno, attributes: ['primerNombre', 'apellidoPaterno'] },
                { model: Deuda, attributes: ['fecha', 'montoTotal'] }
            ]
        });
        res.status(200).json(pagos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los pagos con detalles' });
    }
};

const pagarDeuda = async (req, res) => {
    const idDeuda = req.body.idDeuda;
    const fecha = req.body.fecha;

    // Validar que los datos obligatorios están presentes
    if (!idDeuda || !fecha) {
        return res.status(400).json({ error: 'Faltan datos obligatorios: idDeuda y fecha' });
    }

    try {
        // Obtener la conexión de la base de datos desde Sequelize
        const connection = await Deuda.sequelize.connectionManager.getConnection();

        // Llamar al procedimiento almacenado
        await connection.query('CALL pagar_deuda(?, ?)', {
            replacements: [idDeuda, fecha]
        });

        // Liberar la conexión
        connection.release();

        res.status(200).json({ message: 'Deuda pagada exitosamente' });
    } catch (error) {
        console.error('Error al pagar la deuda:', error);
        res.status(500).json({ error: 'Error al pagar la deuda' });
    }
};


module.exports = {
    getPagos,
    getPagoById,
    createPago,
    updatePago,
    deletePago,
    getPagosWithDetails, // Exporting the new function
    pagarDeuda
};