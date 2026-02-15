module.exports = {
    apps : [
        {
            name: "formulaone-web",
            script: "./start.js",
            env: {
                NODE_ENV: "development",
                PORT: 3000,
                API_BASE_URL: "https://f1experiences.co.uk/api/public",
            },
            env_production: {
                NODE_ENV: "production",
                PORT: 3000,
                API_BASE_URL: "https://f1experiences.co.uk/api/public",
            },
            watch: true,
            ignore_watch: ["node_modules", "dist", "build", "public", "storage", "vendor", "logs"],
            max_memory_restart: "1G",
        }
    ]
}
/// pm2 start bun --name formulaone-web -- start --port 3000