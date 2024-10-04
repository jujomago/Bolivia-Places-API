import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Obtener el token desde las cookies
  console.log('token in server', token);
  if (!token) return res.sendStatus(401); // No hay token, no hay acceso

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Token inválido
    req.user = user;
    next(); // Usuario autenticado, puede continuar
  });
};

export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.sendStatus(403); // No tiene permisos de administrador
  }
  next(); // Usuario es admin, puede continuar
};
