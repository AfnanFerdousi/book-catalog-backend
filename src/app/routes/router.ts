import express from 'express';

const router = express.Router();
import bookRoutes from "../modules/books/book.route";
import authRoutes from "../modules/auth/auth.route";

const routes = [
    {
        path: "/book",
        route: bookRoutes,
    },
    {
        path: "/auth",
        route: authRoutes,
    }
];

routes.forEach((route) => {
    router.use(route.path, route.route);
});


export default router;
