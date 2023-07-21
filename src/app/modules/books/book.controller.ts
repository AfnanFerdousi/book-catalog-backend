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

const postBook = catchAsync(async (req, res, next) => {
    const book = await bookService.postBookInDB(req.body);
    sendResponse<IBook>(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        data: book,
        message: "successfully created book 😎"
    })
})

const getSingleBook = catchAsync(async (req, res, next) => {
    const book = await bookService.getSingleBookFromDB(req.params.id);
    sendResponse<IBook>(res, {
        success: true,
        statusCode: httpStatus.OK,
        data: book,
        message: "successfully retrieved book 😎"
    })
})

const updateBook = catchAsync(async (req, res, next) => {
    const book = await bookService.updateBookInDB(req.params.id, req.body);
    sendResponse<IBook>(res, {
        success: true,
        statusCode: httpStatus.OK,
        data: book,
        message: "successfully updated book 😎"
    })
})

const deleteBook = catchAsync(async (req, res, next) => {
    const book = await bookService.deleteBookFromDB(req.params.id);
    sendResponse<IBook>(res, {
        success: true,
        statusCode: httpStatus.OK,
        data: book,
        message: "successfully deleted book 😎"
    })
})

const postReview = catchAsync(async (req, res, next) => {
    const review = await bookService.postReviewInDB(req.params.id,req.body);
    sendResponse<IBook>(res, {
        success: true,
        statusCode: httpStatus.OK,
        data: review,
        message: "successfully posted review 😎"
    })
})

export default {
    getAllBooks,
    postBook,
    getSingleBook,
    updateBook,
    deleteBook,
    postReview
}