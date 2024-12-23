"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateAlumnosById = exports.getAlumnos = exports.getAlumnoById = exports.deleteAlumnosById = exports.createAlumnos = void 0;
var _Alumno = _interopRequireDefault(require("../models/Alumno"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createAlumnos = async (req, res) => {
  const {
    idAlumno,
    primerNombre,
    otrosNombres,
    ApellidoPaterno,
    ApellidoMaterno,
    anio,
    seccion,
    periodo,
    estado,
    imagen_perfil
  } = req.body;
  try {
    const newAlumno = new _Alumno.default({
      idAlumno,
      primerNombre,
      otrosNombres,
      ApellidoPaterno,
      ApellidoMaterno,
      anio,
      seccion,
      periodo,
      estado,
      imagen_perfil
    });
    const AlumnoGuardado = await newAlumno.save();
    res.status(201).json(AlumnoGuardado);
  } catch (error) {
    res.status(500).json({
      message: "Error creating student",
      error
    });
  }
};
exports.createAlumnos = createAlumnos;
const getAlumnos = async (req, res) => {
  try {
    const alumnos = await _Alumno.default.findAll();
    res.status(200).json(alumnos);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching students",
      error
    });
  }
};
exports.getAlumnos = getAlumnos;
const getAlumnoById = async (req, res) => {
  const {
    idAlumno
  } = req.params; // Adjust this line to match the parameter name used in your route
  try {
    const alumno = await _Alumno.default.findByPk(idAlumno); // Use findByPk assuming idAlumno is the primary key
    if (!alumno) {
      return res.status(404).json({
        message: "Alumno not found"
      });
    }
    res.status(200).json(alumno);
  } catch (error) {
    console.error("Error fetching student by ID:", error); // More detailed logging
    res.status(500).json({
      message: "Error fetching student by ID",
      error: error.message
    });
  }
};
exports.getAlumnoById = getAlumnoById;
const updateAlumnosById = async (req, res) => {
  const {
    idAlumno
  } = req.params;
  const {
    primerNombre,
    otrosNombres,
    ApellidoPaterno,
    ApellidoMaterno,
    anio,
    seccion,
    periodo,
    estado,
    imagen_perfil
  } = req.body;
  try {
    const alumno = await _Alumno.default.findByPk(idAlumno);
    if (!alumno) {
      return res.status(404).json({
        message: "Alumno not found"
      });
    }
    alumno.primerNombre = primerNombre || alumno.primerNombre;
    alumno.otrosNombres = otrosNombres || alumno.otrosNombres;
    alumno.ApellidoPaterno = ApellidoPaterno || alumno.ApellidoPaterno;
    alumno.ApellidoMaterno = ApellidoMaterno || alumno.ApellidoMaterno;
    alumno.anio = anio || alumno.anio;
    alumno.seccion = seccion || alumno.seccion;
    alumno.periodo = periodo || alumno.periodo;
    alumno.estado = estado || alumno.estado;
    alumno.imagen_perfil = imagen_perfil || alumno.imagen_perfil;
    const AlumnoActualizado = await alumno.save();
    res.status(200).json(AlumnoActualizado);
  } catch (error) {
    res.status(500).json({
      message: "Error updating student",
      error
    });
  }
};
exports.updateAlumnosById = updateAlumnosById;
const deleteAlumnosById = async (req, res) => {
  const {
    idAlumno
  } = req.params;
  try {
    const alumno = await _Alumno.default.findByPk(idAlumno);
    if (!alumno) {
      return res.status(404).json({
        message: "Alumno not found"
      });
    }
    await alumno.destroy();
    res.status(200).json({
      message: "Alumno deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting student",
      error
    });
  }
};
exports.deleteAlumnosById = deleteAlumnosById;