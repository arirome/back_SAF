const { Router } = require("express");


const {
    crearInventario,
    verInventario
} = require("../controllers/inventario");



const router = Router();



router.get("/verinventario", verInventario);

router.post("/crearInventario", crearInventario);


module.exports = router;
