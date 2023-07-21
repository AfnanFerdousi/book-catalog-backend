import { IUser } from "./auth.interface";
import User from "./auth.model";

const createUserInDB = async (
    payload: IUser,
) => {
    const user = User.create(payload);
    return user;
}

export default {
    createUserInDB
}