import VentaDAO from "../dao/VentaDAO.js";
import { AppError } from "../utils/appError.js";

class VentaController {

    static async crearVenta(req, res, next) {
        try {
            const { total, iva, productosventa } = req.body;

            if (!total || !iva || !productosventa) {
                next(new AppError('Los campos total, iva y productosventa son requeridos', 400));
            }

            const ventaData = { total, iva, productosventa }
            const venta = await VentaDAO.crearVenta(ventaData);

            res.status(201).json(venta);
        } catch (error) {
            next(new AppError('Ocurrio un error al crear la venta.', 500));
        }
    }

    static async agregarProductosVenta(req, res, next) {
        try {
            const idVenta = req.params.id;
            const productos = req.body;

            if (!idVenta || !productos) {
                next(new AppError('Los campos idVenta y productos son requeridos'), 400);
            }

            const ventaConProductos = await VentaDAO.agregaProductosAVenta(idVenta, productos);

            res.status(201).json(ventaConProductos);
        } catch (error) {
            console.log(error.message);
            next(new AppError('Ocurrio un error al crear la venta.', 500));
        }
    }
}

export default VentaController;