module.exports = {
    apps: [
      {
        name: "pm2-webui",
        script: "./app.js",
        env: {
          NODE_ENV: "production",
          ENV_PATH: "./.env"
        },
        watch: false, // غیرفعال کردن watch برای محیط production
        autorestart: true, // ری‌استارت خودکار در صورت کرش
        instances: 1, // تعداد پردازش‌ها (۱ = سینگل پروسس، "max" = تمام هسته‌ها)
        exec_mode: "fork" // اجرای عادی (می‌توانی به cluster تغییر دهی)
      }
    ]
  };
  