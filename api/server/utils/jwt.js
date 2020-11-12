import jwt from 'jsonwebtoken';


/**
 * @return {Promise} true/Error
 */

export function jwtVerify (token, SECRET, options) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET, options,(error, decoded) => {
            if (error) {
                return reject(error)
            }
            return resolve(decoded)
        })
    })
}

/**
 * @return {Promise} string (token)
 */

export function jwtSign (payload, SECRET, options = {}) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, SECRET, options, (error, token) => {
            if (error) return reject(error);
            return resolve(token)
        })
    })
}

