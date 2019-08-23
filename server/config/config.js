module.exports = {
    database: {
        url: 'mongodb+srv://haopn:nhathao123@cluster0-odpng.mongodb.net/test?retryWrites=true&w=majority',
        option: {
            useNewUrlParser: true,
            autoReconnect: true,
            reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
            reconnectInterval: 500, // Reconnect every 500ms
            poolSize: 10, // Maintain up to 10 socket connections
            bufferMaxEntries: 0,
            connectTimeoutMS: 10000, 
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            family: 4 // Use IPv4, skip trying IPv6
        }
    }
}