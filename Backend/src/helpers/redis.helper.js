import { createClient } from 'redis';

// Create the Redis client using the provided URL from environment variables
const client = createClient({
    url: process.env.REDIS_URL
});

// Attempt to connect to the Redis server
try {
    await client.connect();
    console.log('Redis Client connected');
} catch (err) {
    console.log('Redis Client Error', err);
}

// Function to set a JWT token in Redis
const setJWT = async (key, value) => {
    try {
        // Set the key-value pair in Redis and await the result
        const res = await client.set(key, value);
        return res;
    } catch (err) {
        // Throw an error if there's an issue
        throw err;
    }
};

// Function to get a JWT token from Redis using a key
const getJWT = async (key) => {
    try {
        // Get the value associated with the key from Redis and await the result
        const res = await client.get(key);
        return res;
    } catch (err) {
        // Throw an error if there's an issue
        throw err;
    }
};

export {
    setJWT,
    getJWT
};
