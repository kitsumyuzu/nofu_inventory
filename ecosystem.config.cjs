module.exports = {
  apps: [
    {
      name: 'nofu_inventory',
      script: './server/dist/index.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
      },
    },
  ],
};
