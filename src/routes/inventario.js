const { Router } = require("express");
const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");

const {
    crearInventario,
    verInventario,
    verInventario2
} = require("../controllers/inventario");



const router = Router();



router.get("/verinventario", verInventario);

router.get("/verinventario2", verInventario2);

//router.post("/", crearInventario);

// Crear producto - privado - cualquier persona con un token válido
router.post(
    "/",
    [
      validarJWT,
      validarCampos,
    ],
    crearInventario
  );


module.exports = router;
