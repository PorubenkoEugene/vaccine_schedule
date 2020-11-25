
import database from '../src/models';

class UserService {

    static async addUser(newUser) {
        try {
            return await database.User.create(newUser);
        } catch (error) {
            throw error;
        }
    }
    static async updateUser(args={}, data={}) {
        try {
            let User = await database.User.findOne({
                    where: { ...args }
                });
            if(User) {
                return await User.update(data);
            }
            return null;

        } catch (error) {
            throw error;
        }
    }
    static async setData(user, data={}) {
        try {
            return await user.update(data);
        } catch (error) {
            throw error;
        }
    }


    static async userExist(args={},attributes={}) {
        try {
            const User = await database.User.findOne({
                where: { ...args }, ...attributes
            });
            return User;
        } catch (error) {
            throw error;
        }
    }
    static async checkPassword( user, pwd ) {
        try {
            return await user.validPassword(pwd);
        } catch (error) {
            throw error;
        }
    }
}

export default UserService;
