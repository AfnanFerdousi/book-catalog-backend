import httpStatus from "http-status";
import { paginationFields } from "../../../constant/pagination";
import IGenericResponse from "../../../interfaces/genericResponse";
import IPaginationOptions from "../../../interfaces/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { bookFilterableFields } from "./book.constant";
import { IBook, IBookFilters } from "./book.interface";
import bookService from "./book.service";

const getAllBooks = catchAsync(async (req, res, next) => {
    const filters: IBookFilters = pick(req.query, bookFilterableFields);
    const paginationOptions: IPaginationOptions = pick(req.query, paginationFields);

    const books: IGenericResponse<IBook[]> = await bookService.getAllBooksFromDB(
        paginationOptions,
        filters
    )

    sendResponse<IBook[]>(res, {
        success: true,
        statusCode: httpStatus.OK,
        data: books.data,
        meta: books.meta,
        message: "successfully retrieved books 😎"
    });
    
})


export default {
    getAllBooks
}