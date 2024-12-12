const DetallePago = require('../models/Detalle_Pago');
const Pago = require('../models/Pago'); // Asegúrate de que este modelo está correctamente importado.
const Deuda = require('../models/Deuda'); // Asegúrate

const getDetallePagos = async (req, res) => {
    try {
        const detallePagos = await DetallePago.findAll();
        res.status(200).json(detallePagos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los detalles de pago' });
    }
};

const getDetallePagoById = async (req, res) => {
    try {
        const { idDetalle_Pago } = req.params;
        const detallePago = await DetallePago.findByPk(idDetalle_Pago);

        if (!detallePago) {
            return res.status(404).json({ error: 'Detalle de pago no encontrado' });
        }

        res.status(200).json(detallePago);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el detalle de pago' });
    }
};

const createDetallePago = async (req, res) => {
    try {
        const { idPago, idDeuda, descripcion } = req.body;

        // Validar que los datos obligatorios estén presentes
        if (!idPago || !idDeuda || !descripcion) {
            return res.status(400).json({ error: 'Todos los campos obligatorios deben ser proporcionados' });
        }

        const nuevoDetallePago = await DetallePago.create({
            idPago,
            idDeuda,
            descripcion
        });

        res.status(201).json(nuevoDetallePago);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el detalle de pago' });
    }
};

const updateDetallePago = async (req, res) => {
    try {
        const { idDetalle_Pago } = req.params;
        const { idPago, idDeuda, descripcion } = req.body;

        const detallePago = await DetallePago.findByPk(idDetalle_Pago);

        if (!detallePago) {
            return res.status(404).json({ error: 'Detalle de pago no encontrado' });
        }

        await detallePago.update({
            idPago,
            idDeuda,
            descripcion
        });

        res.status(200).json(detallePago);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el detalle de pago' });
    }
};

const deleteDetallePago = async (req, res) => {
    try {
        const { idDetalle_Pago } = req.params;

        const detallePago = await DetallePago.findByPk(id);

        if (!detallePago) {
            return res.status(404).json({ error: 'Detalle de pago no encontrado' });
        }

        await detallePago.destroy();

        res.status(200).json({ message: 'Detalle de pago eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el detalle de pago' });
    }
};

const getAllDetallePagosWithRelations = async (req, res) => {
    try {
        const detallePagos = await DetallePago.findAll({
            include: [
                { model: Pago, attributes: ['monto', 'fecha'] },
                { model: Deuda, attributes: ['montoTotal', 'estado'] }
            ]
        });
        res.status(200).json(detallePagos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los detalles de pagos con relaciones' });
    }
};

module.exports = {
    getDetallePagos,
    getDetallePagoById,
    createDetallePago,
    updateDetallePago,
    deleteDetallePago,
    getAllDetallePagosWithRelations // Exportar la nueva función

};
