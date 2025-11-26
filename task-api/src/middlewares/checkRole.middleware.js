export const checkRole = (roleExpected) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Necesitas iniciar sesión" });
    }

    if (req.user.rol && req.user.rol !== roleExpected) {
      return res.status(403).json({ message: "No tienes permisos para realizar esta acción" });
    }

    next();
  };
};