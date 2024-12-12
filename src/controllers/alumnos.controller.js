import Alumno from '../models/Alumno';

export const createAlumnos = async (req, res) => {
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
        const newAlumno = new Alumno({
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
        res.status(500).json({ message: "Error creating student", error });
    }
};

export const getAlumnos = async (req, res) => {
    try {
        const alumnos = await Alumno.findAll();
        res.status(200).json(alumnos);
    } catch (error) {
        res.status(500).json({ message: "Error fetching students", error });
    }
};

export const getAlumnoById = async (req, res) => {
    const { idAlumno } = req.params;  // Adjust this line to match the parameter name used in your route
    try {
        const alumno = await Alumno.findByPk(idAlumno);  // Use findByPk assuming idAlumno is the primary key
        if (!alumno) {
            return res.status(404).json({ message: "Alumno not found" });
        }
        res.status(200).json(alumno);
    } catch (error) {
        console.error("Error fetching student by ID:", error);  // More detailed logging
        res.status(500).json({ message: "Error fetching student by ID", error: error.message });
    }
};


export const updateAlumnosById = async (req, res) => {
    const { idAlumno } = req.params;
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
        const alumno = await Alumno.findByPk(idAlumno);
        if (!alumno) {
            return res.status(404).json({ message: "Alumno not found" });
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
        res.status(500).json({ message: "Error updating student", error });
    }
};

export const deleteAlumnosById = async (req, res) => {
    const { idAlumno } = req.params;
    try {
        const alumno = await Alumno.findByPk(idAlumno);
        if (!alumno) {
            return res.status(404).json({ message: "Alumno not found" });
        }
        
        await alumno.destroy();
        res.status(200).json({ message: "Alumno deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting student", error });
    }
};
