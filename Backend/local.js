/* The line `import signup from "./models/signup.js";` is importing the `signup` module from the file
located at "./models/signup.js". This allows the code to access and use the functionalities defined
in the `signup` module within the current file. */
import signup from "./models/signup.js";
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
