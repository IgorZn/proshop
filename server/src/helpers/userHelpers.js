import {createHash} from "crypto";

export const hashPassword = (password) => {
    return createHash('sha256', process.env.CRYPTO_SECRET)
        .update(password)
        .digest('hex')
}