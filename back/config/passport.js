const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const queries = require("../db/queries");
const { ExtractJwt, Strategy: JwtStrategy } = require("passport-jwt");

const verifyCallback = async (username, password, done) => {
  try {
    const user = await queries.getUserByUsername(username);

    if (!user) {
      return done(null, false, { message: "Invalid username or password" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return done(null, false, { message: "Invalid email or password" });
    }

    return done(null, user);
  } catch (err) {
    done(err);
  }
};

passport.use(new LocalStrategy(verifyCallback));
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
    },
    async (jwt_payload, done) => {
      // Could be problematic bcs getUserByUsername throws on empty finds
      //   Might want to limit jwt user only to id?
      const user = await queries.getUserByUsername(jwt_payload.user.username);
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    }
  )
);
