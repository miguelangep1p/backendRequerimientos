"use strict";

const AsignarConcepto = require('../models/Asignar_Concepto');

// Obtener todos los registros
const getAsignarConceptos = async (req, res) => {
  try {
    const asignarConceptos = await AsignarConcepto.findAll();
    res.status(200).json(asignarConceptos);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error al obtener los registros de Asignar Concepto'
    });
  }
};

// Obtener un registro por ID
const getAsignarConceptoById = async (req, res) => {
  try {
    const {
      idAsignar_Concepto
    } = req.params;
    const asignarConcepto = await AsignarConcepto.findByPk(idAsignar_Concepto);
    if (!asignarConcepto) {
      return res.status(404).json({
        error: 'Registro no encontrado'
      });
    }
    res.status(200).json(asignarConcepto);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error al obtener el registro'
    });
  }
};

// Crear un nuevo registro
const createAsignarConcepto = async (req, res) => {
  try {
    const {
      idEscala,
      idConcepto
    } = req.body;

    // Validar que los datos obligatorios estén presentes
    if (!idEscala || !idConcepto) {
      return res.status(400).json({
        error: 'Todos los campos obligatorios deben ser proporcionados'
      });
    }

    // Validar duplicados
    const existente = await AsignarConcepto.findOne({
      where: {
        idEscala,
        idConcepto
      }
    });
    if (existente) {
      return res.status(409).json({
        error: 'Esta asignación ya existe'
      });
    }
    const nuevoAsignarConcepto = await AsignarConcepto.create({
      idEscala,
      idConcepto
    });
    res.status(201).json({
      message: 'Asignación creada exitosamente',
      data: nuevoAsignarConcepto
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error al crear el registro'
    });
  }
};

// Actualizar un registro existente
const updateAsignarConcepto = async (req, res) => {
  try {
    const {
      idAsignar_Concepto
    } = req.params;
    const {
      idEscala,
      idConcepto
    } = req.body;
    const asignarConcepto = await AsignarConcepto.findByPk(idAsignar_Concepto);
    if (!asignarConcepto) {
      return res.status(404).json({
        error: 'Registro no encontrado'
      });
    }
    await asignarConcepto.update({
      idEscala,
      idConcepto
    });
    res.status(200).json({
      message: 'Asignación actualizada exitosamente',
      data: asignarConcepto
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error al actualizar el registro'
    });
  }
};

// Eliminar un registro
const deleteAsignarConcepto = async (req, res) => {
  try {
    const {
      idAsignar_Concepto
    } = req.params;
    const asignarConcepto = await AsignarConcepto.findByPk(idAsignar_Concepto);
    if (!asignarConcepto) {
      return res.status(404).json({
        error: 'Registro no encontrado'
      });
    }
    await asignarConcepto.destroy();
    res.status(200).json({
      message: 'Registro eliminado exitosamente'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error al eliminar el registro'
    });
  }
};
module.exports = {
  getAsignarConceptos,
  getAsignarConceptoById,
  createAsignarConcepto,
  updateAsignarConcepto,
  deleteAsignarConcepto
};