export default class ResUtil {
    constructor() {
        this.statusCode = null;
        this.type = null;
        this.data = null;
        this.message = null;
    }

    setSuccess(statusCode, message, data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.type = 'success';
    }

    setError(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
        this.type = 'error';
    }

    setAdditionalData(data={}) {
        // for (const [key, value] of Object.entries(data)) {
        //     this[key] = value;
        this.data = Object.assign(this.data, data);
        // }
        console.log(JSON.stringify(this.data))
    }
    setCookies(res, { name='', value, options={} }) {
        res.cookie(name, value, options);
    }

    redirect(res, route = '') {
        return res.redirect(this.statusCode, route)
    }

    send(res) {
        const { statusCode, type, data, message} = this;
        const result = {
            status: type,
            message: message,
            data: data,
        };
        if (type === 'success') {
            return res.status(statusCode).json(result);
        }
        return res.status(statusCode).json({
            status: this.type,
            message: this.message,
        });
    }
}
