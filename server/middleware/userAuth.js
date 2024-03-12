const userLoggedIn = (req, res, next) => {
    try {
      const token = req.cookies.token;
  
      if (token) {
        next(); // Proceed to the next middleware
      } else {
        res.redirect("/login"); // Redirect to the login page
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  };
  
  const userNotLoggedIn = (req, res, next) => {
    try {
      const token = req.cookies.token;
  
      if (!token) {
        next(); // Proceed to the next middleware
      } else {
        res.redirect("/"); // Redirect to the home page or another appropriate route
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  };
  
  module.exports = {
    userLoggedIn,
    userNotLoggedIn,
  };
  