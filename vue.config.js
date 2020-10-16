module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/local/'
    : '/',
    transpileDependencies: [
        'vuetify',
    ],
};
