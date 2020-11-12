import UserService from '../services/UserService';
import ResUtil from '../utils/ResUtil';

import { generateAccessToken } from '../utils/accessToken';
import RefreshSessionEntity from '../utils/RefreshSessionEntity';
import DateTransformToMs from "../utils/DateTransformToMs";
import mailCredentials from '../services/mailService/config';
import mailService from '../services/mailService/nodemailer';
import client from '../services/Redis';

require('dotenv').config();
const SECRET = process.env.TOKEN_SECRET;

const redisClient = client();
redisClient.on('connect', function() {
    console.log('Redis client connected');
});

redisClient.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

const mailer = mailService(mailCredentials);

const util = new ResUtil();

class UserController {

    static async register(req, res, next) {
        const { name, email, password } = req.body;
        if (!name || !email|| !password) {
            util.setError(400, 'Please fill in all required fields');
            return util.send(res);
        }

        const userExist = await UserService.userExist({ email });
        if (userExist) {
            util.setError(400, 'This email already exist!');
            return util.send(res);
        }
        const newUser = req.body;
        try {
            const createdUser = await UserService.addUser(newUser);

            const { email, urlString } = createdUser;

            const mailSuccess = await mailer.send({ email, urlString });

            util.setSuccess(200, 'Check email to confirm registration', mailSuccess.accepted[0]);
            return util.send(res);
        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }

    static async verify(req, res) {
        try {
            const { urlString } = req.query;
            console.log(urlString+'URL')
            const alteredUser = await UserService.updateUser({ urlString }, { isActive: true });
            if (!alteredUser) {
                util.setError(400,'Verify error. Try again!');
                util.send(res);
            } else {
                util.setSuccess(200, 'Your profile activated! Please login!', alteredUser);
                return util.send(res);
            }
        } catch(error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }

    static async login(req, res) {
        console.log('login')
        const { email, password } = req.body;
        if (!email || !password) {
            util.setError(400, 'Please fill in all required fields');
            return util.send(res);
        }
        try {
            const userExist = await UserService.userExist({ email });
            const { isActive, id } = userExist;
            if (isActive) {
                const validPassword = await UserService.checkPassword(userExist, password);
                if(!validPassword) {
                    util.setError(400, 'Password not valid!');
                    return util.send(res);
                }

                const dateInMs = DateTransformToMs('180d');

                const { refreshToken, expiresIn } =
                    new RefreshSessionEntity({ dateInMs });

                const { id, name, email, isActive } =
                    await UserService.setData(userExist,{ refreshToken, expiresIn });

                util.setSuccess(200, 'Successful login!', {
                    id,
                    name,
                    email,
                    isActive
                });

                const cookie = {
                    name:'refreshToken',
                    value:refreshToken,
                    options: {'maxAge': dateInMs-Date.now(), 'httpOnly': true }
                };
                util.setCookies(res, cookie);

                const token = await generateAccessToken(userExist, '2m');
                util.setAdditionalData({ token });

                return util.send(res);
            }
            util.setError(400, 'You need to confirm registration, please check your email! ');
            return util.send(res);
        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }

    static async logout(req, res) {
        let refreshToken = req.cookies.refreshToken || null;
        if (refreshToken) {
            redisClient.set(refreshToken, JSON.stringify({
                    refresh_token: refreshToken,
                }),
                redisClient.print
            );
            let redis_token = redisClient.get(refreshToken, function(err, val) {
                return err ? null : val ? val : null;
            });
            console.log(redis_token+'REDIS')
        }
        res.send('OK')

    }

}

export default UserController;
