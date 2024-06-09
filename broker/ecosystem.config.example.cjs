module.exports = {
    apps: [
        {
            name: 'Producer',
            port: '3000',
            exec_mode: 'fork',
            script: './dist/producer/src/index.js',
            env: {
                PORT: "",
                REDIS_URL: "",
                REDIS_USERNAME: "",
                REDIS_PASSWORD: "",
                STREAM_NAME: ""
            }
        }
    ]
}