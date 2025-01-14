import { ProductData } from "../interfaces/ProductData";
import Product from "../models/ProductModel"

export const createProduct = (newProduct: ProductData): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, countInStock, rating, description, discount, selled, price } = newProduct;
        try {
            const checkProduct = await Product.findOne({ name });
            if (checkProduct !== null) {
                resolve({
                    status: "OK",
                    message: "The name is already existed",
                });
            }

            const createProduct = await Product.create({
                name,
                image,
                type,
                countInStock: Number(countInStock),
                rating,
                description,
                discount: Number(discount),
                selled,
                price,
            });
            if (createProduct) {
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: createProduct,
                });
            }
        } catch (e: any) {
            reject(e);
        }
    });
};

export const getAllProducts = (
    limit: number | null,
    page: number,
    sort: [string, string] | undefined | any,
    filter: [string, string] | undefined | any
): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            let filterCond = {};
            let limitCond = 0;
            let sortCond = { createdAt: -1, updatedAt: -1 };

            if (filter) {
                const [label, value] = filter;
                filterCond = { [label]: { $regex: value } };
            }
            if (sort) {
                const [direction, field] = sort;
                sortCond = { [field]: direction === "asc" ? 1 : -1, ...sortCond };
            }

            if (limit) {
                limitCond = limit;
            }

            const products = await Product.find(filterCond)
                .limit(limitCond)
                .skip(page * limitCond)
                .sort(sortCond);

            const totalProducts = await Product.countDocuments(filterCond);

            resolve({
                status: "OK",
                data: products,
                total: totalProducts,
                pageCurrent: page + 1,
                totalPage: limitCond ? Math.ceil(totalProducts / limitCond) : 1,
            });
        } catch (error: any) {
            reject(error);
        }
    });
};

export const deleteProduct = (id: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const productInfo = await Product.findOne({ _id: id });
            if (!productInfo) {
                resolve({
                    status: "ERR",
                    message: "The product is not defined",
                });
            }

            await Product.findByIdAndDelete(id);
            resolve({
                status: "OK",
                message: "Delete product success",
            });
        } catch (error: any) {
            reject(error);
        }
    });
};

export const getDetailsProduct = (productId: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const productInfo = await Product.findOne({ _id: productId });
            if (!productInfo) {
                resolve({
                    status: "ERR",
                    message: "The product does not exist",
                });
            }
            resolve({
                status: "OK",
                data: productInfo,
            });
        } catch (error: any) {
            reject(error);
        }
    });
};

export const updateProduct = (id: string, data: object): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const productInfo = await Product.findOne({ _id: id });
            if (!productInfo) {
                resolve({
                    status: "ERR",
                    message: "The product does not exist",
                });
            }

            const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });

            resolve({
                status: "OK",
                message: "Update successful",
                data: updatedProduct,
            });
        } catch (error: any) {
            reject(error);
        }
    });
};
