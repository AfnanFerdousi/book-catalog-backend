import "dotenv/config";

export default {
    port: process.env.PORT,
    database_url: process.env.DB_URL,
    env: process.env.NODE_ENV,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt: {
        jwt_secret: process.env.JWT_SECRET,
        expires_in: process.env.EXPIRES_IN,
        jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
        refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    },
};
