import ResUtil from '../utils/ResUtil';
const util = new ResUtil();

export async function error(err, req, res, next) {
    util.setError(500, err.message);
    return util.send(res)
}