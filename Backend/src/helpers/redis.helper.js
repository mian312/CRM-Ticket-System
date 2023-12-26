import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

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
        return err;
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
        return err;
    }
};

// Function to delete a JWT token from Redis using a key
const deleteJWT = async (key) => {
    try {
        // Delete the value associated with the key from Redis and await the result
        const res = await client.del(key);
        return res;
    } catch (err) {
        // Throw an error if there's an issue
        return err;
    }
}

export {
    setJWT,
    getJWT,
    deleteJWT
};
