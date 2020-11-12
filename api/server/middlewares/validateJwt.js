import { promisify } from 'util';
import client from '../services/Redis'
import RefreshSessionEntity from "../utils/RefreshSessionEntity";
import { generateAccessToken, verifyAccessToken } from '../utils/accessToken';
import UserService from '../services/UserService';
import DateTransformToMs from "../utils/DateTransformToMs";
import ResUtil from '../utils/ResUtil';

const redisClient = client();
const redisPromisified = promisify(redisClient.get).bind(redisClient);


require('dotenv').config();

const util = new ResUtil();



export async function validate_jwt(req, res, next) {
    let accessToken = req.headers.authorization.split(' ')[0] || null;
    let refreshToken = req.cookies.refreshToken || null;
    let userId;

    if (accessToken && refreshToken) {
        let redis_token = await redisPromisified(refreshToken);
        if(redis_token) {
            return res.redirect(302,'/api/v1/auth/users/login');
        }
        try {
            let verifiedToken = await verifyAccessToken(accessToken);
            res.locals.token = null;
            return next();
        }
        catch (error) {
            if (error.name === "TokenExpiredError") {
                let { uid } = await verifyAccessToken(accessToken, {
                    ignoreExpiration: true
                });
                userId = uid;
            } else {
                return next(error)
            }
        }

        try {
            const userExist = await UserService.userExist({ id: userId });

            if(!userExist) return next(new Error('Nice try!'));

            const {
                refreshToken: userRefreshToken,
                expiresIn: refreshTokenExpiresDate
            } = userExist;
            if(!userRefreshToken||userRefreshToken!==refreshToken) {
                return next(new Error('Nice try!'));
            }
            if(refreshTokenExpiresDate < new Date()){
                console.log('Expires')

                return res.redirect(302,'/api/v1/auth/users/login');
            }
            else {
                const dateInMs = DateTransformToMs('180d');
                const { refreshToken, expiresIn } =
                    new RefreshSessionEntity({ dateInMs });

                const userWithNewRefreshSession =
                    await UserService.setData(userExist,{ refreshToken, expiresIn });

                const cookie = {
                    name:'refreshToken',
                    value:refreshToken,
                    options: {'maxAge': dateInMs-Date.now(), 'httpOnly': true }
                };

                util.setCookies(res, cookie);
                console.log('ACCESS')
                const accessToken = await generateAccessToken(userExist, '2m');

                res.locals.token = accessToken;
                return next();
            }

        }
        catch (error) {
            console.log(error+'ERROR');
            return next(error)
        }
    }
    else {
        return next(new Error('Missed token!'))
    }

}
