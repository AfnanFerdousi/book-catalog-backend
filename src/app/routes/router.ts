const router = express.Router();
import express from 'express';
import bookRoutes from "../modules/books/book.route";

const routes = [
    {
        path: "/book",
        route: bookRoutes,
    },
];

routes.forEach((route) => {
    router.use(route.path, route.route);
});


export default router;
