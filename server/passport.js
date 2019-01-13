const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const GooglePlusTokenStrategy = require("passport-google-plus-token");
const { ExtractJwt } = require("passport-jwt");
const { JWT_SECRET } = require("./configuration/index.js");
const { User } = require("./database/index.js");
passport.use(
  "googleToken",
  new GooglePlusTokenStrategy(
    {
      clientID:
        "44043094992-tsmmdkf8hjs0j5f10eapp5q6g5ncf2pp.apps.googleusercontent.com",
      clientSecret: process.env.GoogleClientSecret
    },
    async (accessToken, rereshToken, profile, done) => {
      done(null, profile);
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
      secretOrKey: JWT_SECRET
    },
    async (payLoad, done) => {
      //payload is signtoken in controllers/user.js
      try {
        const user = await User.findOne({
          where: {
            googleId: payLoad.sub
          }
        });
        if (!user) {
          // null
          return done(null, false);
        }
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
); //middleware behavior simular express.js
