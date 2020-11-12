const { v4: uuidv4 } = require('uuid');

export default class RefreshSessionEntity {
    constructor ({ dateInMs } = {}) {
        this.refreshToken = uuidv4();
        this.expiresIn = dateInMs
    }
}

