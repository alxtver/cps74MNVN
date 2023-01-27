module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      "": {
        target: "http://localhost:8080",
        ws: true,
        changeOrigin: true,
      },
    },
  },

  transpileDependencies: [
    'vuetify'
  ]
};
