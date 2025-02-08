const passport = require('passport');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const MicrosoftStrategy = require('passport-microsoft').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      const user = {
        id: profile.id,
        name: profile.displayName,
        provider: 'google',
        email: profile.emails?.[0]?.value || null,
      };

      return done(null, { user });
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/github/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      const user = {
        id: profile.id,
        name: profile.displayName,
        provider: 'github',
        email: profile.emails?.[0]?.value || null,
      };

      return done(null, { user });
    }
  )
);

// passport.use(
//   new MicrosoftStrategy(
//     {
//       clientID: process.env.MICROSOFT_CLIENT_ID,
//       clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
//       callbackURL: 'http://localhost:5000/auth/microsoft/callback',
//       scope: ['user.read'],
//     },
//     (accessToken, refreshToken, profile, done) => {
//       const user = {
//         id: profile.id,
//         name: profile.displayName,
//         provider: 'microsoft',
//       };
//       const token = generateJWT(user);
//       return done(null, { user, token });
//     }
//   )
// );

module.exports = passport;
