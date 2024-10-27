const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const queries = require("../db/queries");

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
