"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const book_route_1 = __importDefault(require("../modules/books/book.route"));
const auth_route_1 = __importDefault(require("../modules/auth/auth.route"));
const routes = [
    {
        path: "/book",
        route: book_route_1.default,
    },
    {
        path: "/auth",
        route: auth_route_1.default,
    }
];
routes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
