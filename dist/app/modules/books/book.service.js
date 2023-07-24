"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paginationHelpers_1 = __importDefault(require("../../../helpers/paginationHelpers"));
const book_constant_1 = require("./book.constant");
const book_model_1 = __importDefault(require("./book.model"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const getAllBooksFromDB = (paginationOption, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelpers_1.default)(paginationOption);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: book_constant_1.bookFilterableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }
    if (Object.keys(filtersData).length > 0) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield book_model_1.default.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .exec();
    const total = yield book_model_1.default.countDocuments(whereConditions).exec();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const postBookInDB = (book) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.default.create(book);
    return result;
});
const getSingleBookFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.default.findById(_id).exec();
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book Doesn't Exist");
    }
    return result;
});
const updateBookInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield book_model_1.default.findById(id).exec();
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found !");
    }
    const result = yield book_model_1.default.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    }).exec();
    return result;
});
const deleteBookFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield book_model_1.default.findById(_id).exec();
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found !");
    }
    const result = yield book_model_1.default.findOneAndDelete({ _id: _id }).exec();
    return result;
});
const postReviewInDB = (_id, review) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield book_model_1.default.findById(_id).exec();
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found !");
    }
    const result = yield book_model_1.default.findOneAndUpdate({ _id }, {
        $push: { reviews: review },
    }, {
        new: true,
    }).exec();
    return result;
});
exports.default = {
    getAllBooksFromDB,
    postBookInDB,
    getSingleBookFromDB,
    updateBookInDB,
    deleteBookFromDB,
    postReviewInDB
};
