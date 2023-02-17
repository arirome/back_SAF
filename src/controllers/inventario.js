const { response } = require("express");
const { Inventario, Punto, Usuario } = require("../models");

const { Date } = require("../helpers/generar-lote");
const { default: mongoose } = require("mongoose");

const ctrlInventario = {};



ctrlInventario.verInventario = async (req, res) => {
try {
  const inventario = await Inventario.find();
  res.json(inventario);

} catch (error) {

    console.log("error  al mostrar el inventario", error)
    
}


}

ctrlInventario.crearInventario = async (req, res = response) => {
  const { estado, usuario, ...body } = req.body;

  if (!body.lote) {
    let date = new Date();
    body.lote = date.yyyymmdd();
  }

  try {
 

    // Generar la data a guardar
    const data = {
      ...body,
      /* nombre: body.productos.nombre.toUpperCase(), */
      usuario: req.usuario._id,
    };

    const inventario = new Inventario(data);

    // Guardar DB
    await inventario.save();

    res.status(201).json(data);
  } catch (err) {
    console.log("Error al crear el inventario: ", err);
    res.status(500).json({
      msg: "Por favor, hable con el administrador",
    });
  }
};



module.exports = ctrlInventario;
