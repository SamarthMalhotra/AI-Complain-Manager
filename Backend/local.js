import signup from "Backend/models/signup.js";
const loginfun = async (email, password, done) => {
  try {
    const user = await signup.findOne({ email });
    if (!user) {
      return done(null, false, {
        message: "Incorrect Email and Password. Go for Signup",
      });
    }
    const isMAtch = await user.comparePassword(password);
    if (isMAtch) {
      return done(null, user);
    } else {
      return done(null, false, { message: "Incorrect Password." });
    }
  } catch (error) {
    return done(error);
  }
};
//Extract password from Bycrypt
export default loginfun;
