import { SortOrder } from "mongoose";
import paginationHelpers from "../../../helpers/paginationHelpers";
import IGenericResponse from "../../../interfaces/genericResponse";
import IPaginationOptions from "../../../interfaces/pagination";
import { bookFilterableFields } from "./book.constant";
import { IBook, IBookFilters } from "./book.interface";
import Books from "./book.model";

const getAllBooksFromDB = async (
    paginationOption: IPaginationOptions,
    filters: IBookFilters
): Promise<IGenericResponse<IBook[]>> => {
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } =
        paginationHelpers(paginationOption);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: bookFilterableFields.map((field) => ({
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
    const sortConditions: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions =
        andConditions.length > 0 ? { $and: andConditions } : {};

    const result = await Books.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .exec();

    const total = await Books.countDocuments(whereConditions).exec();

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};

const postBookInDB = async (book: IBook): Promise<IBook> => {
    const result = await Books.create(book);
    return result;
}

export default {
    getAllBooksFromDB,
    postBookInDB
}