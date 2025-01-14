import { Application } from "express";
import ProductRouter from "../routes/ProductRouter";

const routes = (app: Application): void => {
    app.use('/api/product', ProductRouter);
};

export default routes;
