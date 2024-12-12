const AsignarEscala = require('../models/Asignar_Escala');
const Escala = require('../models/Escala'); // Asegúrate de tener este modelo
const Concepto = require('../models/Concepto'); // Asegúrate de tener este modelo


// Obtener todas las asignaciones
const getAsignarEscalas = async (req, res) => {
    try {
        const asignarEscalas = await AsignarEscala.findAll();
        res.status(200).json(asignarEscalas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las asignaciones' });
    }
};

// Obtener una asignación por ID
const getAsignarEscalaById = async (req, res) => {
    try {
        const { idAsignarEscala } = req.params;
        const asignarEscala = await AsignarEscala.findByPk(idAsignarEscala);

        if (!asignarEscala) {
            return res.status(404).json({ error: 'Asignación no encontrada' });
        }

        res.status(200).json(asignarEscala);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la asignación' });
    }
};

// Crear una nueva asignación
const createAsignarEscala = async (req, res) => {
    try {
        const { idAlumno, idEscala, fechaAsignacion } = req.body;

        // Validar que los datos obligatorios están presentes
        if (!idAlumno || !idEscala || !fechaAsignacion) {
            return res.status(400).json({ error: 'Todos los campos obligatorios deben ser proporcionados' });
        }

        const nuevaAsignacion = await AsignarEscala.create({
            idAlumno,
            idEscala,
            fechaAsignacion
        });

        res.status(201).json(nuevaAsignacion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la asignación' });
    }
};

// Actualizar una asignación existente
const updateAsignarEscala = async (req, res) => {
    try {
        const { idAsignarEscala } = req.params;
        const { idAlumno, idEscala, fechaAsignacion } = req.body;

        const asignarEscala = await AsignarEscala.findByPk(idAsignarEscala);

        if (!asignarEscala) {
            return res.status(404).json({ error: 'Asignación no encontrada' });
        }

        await asignarEscala.update({
            idAlumno,
            idEscala,
            fechaAsignacion
        });

        res.status(200).json(asignarEscala);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la asignación' });
    }
};

// Eliminar una asignación
const deleteAsignarEscala = async (req, res) => {
    try {
        const { idAsignarEscala } = req.params;

        const asignarEscala = await AsignarEscala.findByPk(idAsignarEscala);

        if (!asignarEscala) {
            return res.status(404).json({ error: 'Asignación no encontrada' });
        }

        await asignarEscala.destroy();

        res.status(200).json({ message: 'Asignación eliminada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la asignación' });
    }
};

const getAsignarConceptos = async (req, res) => {
    try {
        const asignarConceptos = await AsignarEscala.findAll({
            include: [
                { model: Escala, attributes: ['nombreEscala'] },
                { model: Concepto, attributes: ['nombreConcepto'] }
            ]
        });
        res.status(200).json(asignarConceptos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener conceptos y escalas asignadas' });
    }
};


module.exports = {
    getAsignarEscalas,
    getAsignarEscalaById,
    createAsignarEscala,
    updateAsignarEscala,
    deleteAsignarEscala,
    getAsignarConceptos 
};
