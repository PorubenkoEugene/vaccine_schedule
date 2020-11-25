require('dotenv').config();
import {jwtSign, jwtVerify} from './jwt';

const SECRET = process.env.TOKEN_SECRET;

/**
 * @return {Promise} string
 */
export function generateAccessToken ({ id, email }, expiresIn) {
    let config = {
            payload: {
                email,
                uid: id,
            },
            options: {
                expiresIn,
            }
    };
    return jwtSign(config.payload, SECRET, config.options)
}

export function verifyAccessToken (token, options={}) {
    return jwtVerify(token, SECRET, options)
}
