"use strict";

const Deuda = require('../models/Deuda');
const Alumno = require('../models/Alumno'); // Asegúrate de que este modelo está importado
const Asignar_Escala = require('../models/Asignar_Escala'); // Asegúrate de que este modelo está importado
const Asignar_Concepto = require('../models/Asignar_Concepto'); // Asegúrate de que este modelo está importado

// Obtener todas las deudas
const getDeudas = async (req, res) => {
  try {
    const deudas = await Deuda.findAll();
    res.status(200).json(deudas);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error al obtener las deudas'
    });
  }
};

// Obtener una deuda por ID
const getDeudaById = async (req, res) => {
  try {
    const {
      idDeuda
    } = req.params;
    const deuda = await Deuda.findByPk(idDeuda);
    if (!deuda) {
      return res.status(404).json({
        error: 'Deuda no encontrada'
      });
    }
    res.status(200).json(deuda);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error al obtener la deuda'
    });
  }
};

// Crear una nueva deuda
const createDeuda = async (req, res) => {
  try {
    const {
      idAlumno,
      idAsignarEscala,
      idAsignar_Concepto,
      fecha
    } = req.body;

    // Validar que los datos obligatorios estén presentes
    if (!idAlumno || !idAsignarEscala || !idAsignar_Concepto || !fecha) {
      return res.status(400).json({
        error: 'Todos los campos obligatorios deben ser proporcionados'
      });
    }
    const nuevaDeuda = await Deuda.create({
      idAlumno,
      idAsignarEscala,
      idAsignar_Concepto,
      fecha
    });
    res.status(201).json(nuevaDeuda);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error al crear la deuda'
    });
  }
};

// Actualizar una deuda existente
const updateDeuda = async (req, res) => {
  try {
    const {
      idDeuda
    } = req.params;
    const {
      idAlumno,
      idAsignarEscala,
      idAsignar_Concepto,
      fecha
    } = req.body;
    const deuda = await Deuda.findByPk(idDeuda);
    if (!deuda) {
      return res.status(404).json({
        error: 'Deuda no encontrada'
      });
    }
    await deuda.update({
      idAlumno,
      idAsignarEscala,
      idAsignar_Concepto,
      fecha
    });
    res.status(200).json(deuda);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error al actualizar la deuda'
    });
  }
};

// Eliminar una deuda
const deleteDeuda = async (req, res) => {
  try {
    const {
      idDeuda
    } = req.params;
    const deuda = await Deuda.findByPk(idDeuda);
    if (!deuda) {
      return res.status(404).json({
        error: 'Deuda no encontrada'
      });
    }
    await deuda.destroy();
    res.status(200).json({
      message: 'Deuda eliminada exitosamente'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error al eliminar la deuda'
    });
  }
};
const getDeudasWithDetails = async (req, res) => {
  try {
    const deudas = await Deuda.findAll({
      include: [{
        model: Alumno,
        attributes: ['primerNombre', 'ApellidoPaterno']
      }, {
        model: Asignar_Escala,
        attributes: ['idEscala', 'fechaAsignacion']
      }, {
        model: Asignar_Concepto,
        attributes: ['concepto']
      }]
    });
    res.status(200).json(deudas);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error al obtener las deudas con detalles'
    });
  }
};
module.exports = {
  getDeudas,
  getDeudaById,
  createDeuda,
  updateDeuda,
  deleteDeuda,
  getDeudasWithDetails // Exportar la nueva función
};