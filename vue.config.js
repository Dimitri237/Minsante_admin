const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: ['bcryptjs'],
  configureWebpack: {
    resolve: {
      fallback: {
        vm: require.resolve("vm-browserify"),
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify")
      }
    }
  }
});