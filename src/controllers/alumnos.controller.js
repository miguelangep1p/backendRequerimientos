import Product from '../models/Alumno'


export const createAlumnos = (req, res) => {
    const{name,}
    console.log(req.body)
    new Alumno(name: req.body.name)
    res.json('Creating Alumno')
}
export const getAlumnos = (req, res) => {
    res.json('Get Alumnos')
}
export const getAlumnosById = (req, res) => {
    res.json('Creating Alumno')
}
export const updateAlumnosById = (req, res) => {
    res.json('Creating Alumno')
}
export const deleteAlumnosById = (req, res) => {
    res.json('Creating Alumno')
}