module.exports = {
    apps: [
      {
        name: 'frontend',
        script: 'node_modules/.bin/next',
        args: 'start --port 3000',
        cwd: './Frontend', // Set the current working directory to 'Frontend'
        instances: 1,
        autorestart: true,
        watch: false,
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  