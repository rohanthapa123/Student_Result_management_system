exports.isAuthenticated = (req, res) => {
    try {
      if (req.session && req.session.role) {
        res.status(200).json({
          authenticated: true,
          message: "Authenticated",
          role: req.session.role,
        });
      } else {
        res.status(401).json({
          authenticated: false,
          message: "Unauthorized",
        });
      }
    } catch (error) {
      console.error("Error in isAuthenticated controller:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  