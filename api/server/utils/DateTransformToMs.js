import ms from "ms";

/**
 * @return {String}
 */
export default (exp='') => {
    return Date.now() + ms(exp);
}
