import { Request, Response } from "express";
import * as ProductService from '../services/ProductService';

export const createProduct = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, image, type, countInStock, rating, description, discount, selled, price } = req.body;

        if (!name || !image || !type || !countInStock || !rating || !price) {
            return res.status(400).json({
                status: "ERR",
                message: "The input is required",
            });
        }

        if (price < 0 || countInStock < 0 || rating < 0) {
            return res.status(400).json({
                status: "ERR",
                message: "The number fields cannot be less than 0",
            });
        }

        const response = await ProductService.createProduct(req.body);
        return res.status(200).json(response);
    } catch (error: any) {
        return res.status(404).json({
            message: error.message || error,
        });
    }
};

export const updateProduct = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = req.params.id;
        const data = req.body;

        if (!id) {
            return res.status(400).json({
                status: "ERR",
                message: "The Id was not defined",
            });
        }

        if (!data) {
            return res.status(400).json({
                status: "ERR",
                message: "The data was not defined",
            });
        }

        const response = await ProductService.updateProduct(id, data);
        return res.status(200).json(response);
    } catch (error: any) {
        return res.status(400).json({
            message: error.message || error,
        });
    }
};

export const getAllProducts = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { limit, page, sort, filter } = req.query;
        const response = await ProductService.getAllProducts(
            Number(limit) || null,
            Number(page) || 0,
            sort,
            filter
        );
        return res.status(200).json(response);
    } catch (error: any) {
        return res.status(400).json({
            message: error.message || error,
        });
    }
};

export const getDetailsProduct = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                status: "ERR",
                message: "This Product does not exist",
            });
        }

        const response = await ProductService.getDetailsProduct(id);
        return res.status(200).json(response);
    } catch (error: any) {
        return res.status(400).json({
            message: error.message || error,
        });
    }
};

export const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(400).json({
                status: "ERR",
                message: "The ProductId is required",
            });
        }

        const response = await ProductService.deleteProduct(productId);
        return res.status(200).json(response);
    } catch (error: any) {
        return res.status(400).json({
            message: error.message || error,
        });
    }
};