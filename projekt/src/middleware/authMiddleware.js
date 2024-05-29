const withAuth = (req, res, next) => {
  if (!req.session.user) {
    res.status(401).json({ message: 'Nieautoryzowany dostęp!' });
  } else {
    next();
  }
};

const withAdminAuth = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Brak uprawnień do tej operacji!' });
  }
};

module.exports = {
  withAuth,
  withAdminAuth
};
