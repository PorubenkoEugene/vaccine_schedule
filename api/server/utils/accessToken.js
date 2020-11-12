require('dotenv').config();
import {jwtSign, jwtVerify} from './jwt';

const SECRET = process.env.TOKEN_SECRET;

/**
 * @return {Promise} string
 */
export function generateAccessToken ({ id, name }, expiresIn) {
    let config = {
            payload: {
                name,
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
