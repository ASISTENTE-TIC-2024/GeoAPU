import passport from 'passport';
import { Strategy as OpenIDConnectStrategy } from 'passport-openidconnect';
import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = ['DOMAIN', 'AUTH_URL', 'TOKEN_URL', 'USER_INFO_URL', 'CLIENT_ID', 'CLIENT_SECRET', 'CALLBACK_URL'];
requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
        throw new Error(`Missing required environment variable: ${varName}`);
    }
});

passport.use(new OpenIDConnectStrategy({
    issuer: process.env.DOMAIN,
    authorizationURL: process.env.AUTH_URL,
    tokenURL: process.env.TOKEN_URL,
    userInfoURL: process.env.USER_INFO_URL,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
}, async (issuer, sub, profile, accessToken, refreshToken, done) => {
    try {
        return done(null, profile);
    } catch (error) {
        return done(error);
    }
}));

export default passport;