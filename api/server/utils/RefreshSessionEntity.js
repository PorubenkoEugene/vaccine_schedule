const { v4: uuidv4 } = require('uuid');

export default class RefreshSessionEntity {
    constructor ({ dateInMs } = {}) {
        this.refresh_token = uuidv4();
        this.expires_in = dateInMs
    }
}

