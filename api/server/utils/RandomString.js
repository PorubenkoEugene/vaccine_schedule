const Crypto = require('crypto');

export default function randomString(size = 16) {
    return Crypto
        .randomBytes(size)
        .toString('hex')
        .slice(0, size)
}