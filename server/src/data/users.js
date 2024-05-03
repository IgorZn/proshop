import {createHash} from "crypto";
import dotenv from "dotenv"

dotenv.config()

const hashPassword = (password) => {
    return createHash('sha256', process.env.CRYPTO_SECRET)
        .update(password)
        .digest('hex')
}

export const users = [
    {
        name: "Admin User",
        email: "admin@proshop",
        password: hashPassword('123456'),
        isAdmin: true
    },
    {
        name: "User1 User",
        email: "user1@proshop",
        password: hashPassword('123456'),
        isAdmin: true
    },
    {
        name: "User2 User",
        email: "user2@proshop",
        password: hashPassword('123456'),
        isAdmin: true
    },
    {
        name: "User3 User",
        email: "user3@proshop",
        password: hashPassword('123456'),
        isAdmin: true
    },
]