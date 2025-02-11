const passport = require('passport');
const jwt = require('jsonwebtoken');
const student = require('../models/student');
const investorModel = require('../models/investorModel');
const companyModel = require('../models/companyModel');
const jobseekerModel = require('../models/jobseekerModel');
const founderModel = require('../models/founderModel');

require('dotenv').config();

const userTypes = {
  student: student,
  investor: investorModel,
  company: companyModel,
  jobseeker: jobseekerModel,
  founder: founderModel,
};

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const MicrosoftStrategy = require('passport-microsoft').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/callback',
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      const userRole = req.query.state;
      const userSchema = userTypes[userRole];

      let user = await userSchema.findOne({ email: profile.emails[0].value });
      if (!user) {
        console.log('New user found. Creating user in role', userRole);
        user = new userSchema({
          id: profile.id,
          name: profile.displayName,
          provider: 'google',
          email: profile.emails?.[0]?.value,
          role: userRole,
        });
        await user.save();
      } else {
        console.log('user already exists!');
      }

      return done(null, { ...user.toObject(), userRole });
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/github/callback',
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      const userRole = req.query.state;
      const userSchema = userTypes[userRole];

      let user = await userSchema.findOne({ email: profile.emails[0].value });
      if (!user) {
        console.log('New user found. Creating user in role', userRole);
        user = new userSchema({
          id: profile.id,
          name: profile.displayName,
          provider: 'github',
          email: profile.emails?.[0]?.value,
          role: userRole,
        });
        await user.save();
      } else {
        console.log('user already exists!');
      }

      return done(null, { ...user.toObject(), userRole });
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
