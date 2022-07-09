import { Strategy, ExtractJwt } from 'passport-jwt';

import User from './models/user.js';

const applyPassportStrategy = (passport) => {
    passport.use(
        new Strategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secret',
        }, async (payload, done) => {
            try {
                const user = User.findById(payload.id).orFail();
                return done(null, user);
            } catch (e) {
                return done(null, false);
            }
        }),
    );
};

export default applyPassportStrategy;
