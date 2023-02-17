const { response } = require("express");
const Inventario  = require("../models/inventario");

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


ctrlInventario.verInventario2 = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  let query;

  query = {
    estado: true,
    disponible: true,
    "destino.cantidad": { $ne: 0 },
  };

  try {
    const [total,inventario] = await Promise.all([
      Inventario.countDocuments(query),
      Inventario.find(query)
        .populate("usuario", "nombre")
        .populate("productos.categoria", "nombre")
        .populate("proveedor", "nombre")
        .populate("destino.punto", "nombre")
        .skip(Number(desde))
        .limit(Number(limite)),
    ]);

    res.json({
      total,
      inventario,
    });
  } catch (err) {
    console.log("Error al mostrar los productos: ", err);
    res.status(500).json({
      msg: "Por favor, hable con el administrador",
    });
  }
};


ctrlInventario.crearInventario = async (req, res = response) => {
  const { estado, usuario, ...body } = req.body;

 
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
