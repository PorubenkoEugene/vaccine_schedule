import redis from 'redis';

const REDIS_PORT = process.env.PORT || 6379;

function redisConnect (){
    return redis.createClient(REDIS_PORT);
}
export default redisConnect;