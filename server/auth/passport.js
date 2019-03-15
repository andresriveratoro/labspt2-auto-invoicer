const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user');
const FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: '/auth/google/home',
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    async (accessToken, refreshToken, profile, done) => {
      const currentUser = await User.findOne({ email: profile._json.email });
      if (currentUser) {
        done(null, currentUser);
      } else {
        const newUser = await new User({
          email: profile._json.email,
          name: profile.displayName,
          google: {
            googleId: profile.id,
            picture: profile._json.picture,
            gender: profile._json.gender,
            locale: profile._json.locale
          }
        }).save();
        done(null, newUser);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      callbackURL: '/auth/facebook/home',
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET_KEY,
      profileFields: ['id', 'emails', 'name']
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(accessToken, refreshToken, profile);
    }
  )
);
