const adminAuthenticated = (request, response, next) => {
  if (request.user && request.user.isAdmin) {
    console.log("request.user.isAdmin:", request.user.isAdmin);
    next();
  } else {
    response.status(403).json({ message: "Admin Permission required" });
  }
};

export default adminAuthenticated;
