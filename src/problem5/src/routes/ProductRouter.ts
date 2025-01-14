import express, { Request, Response } from "express";
import * as productController from '../controllers/ProductController';

const router = express.Router();

router.post("/create", (req: Request, res: Response) => { productController.createProduct(req, res) });
router.get("/", (req: Request, res: Response) => { productController.getAllProducts(req, res) });
router.get("/details/:id", (req: Request, res: Response) => { productController.getDetailsProduct(req, res) });
router.put("/:id", (req: Request, res: Response) => { productController.updateProduct(req, res) });
router.delete("/:id", (req: Request, res: Response) => { productController.deleteProduct(req, res) });

export default router;
