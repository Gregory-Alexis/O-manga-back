const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401);
    throw new Error('Un-Authorized');
  }

  try {
    const token = authorization.split(' ')[1];

    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    // check if the user is the one trying to access the resource

    if (payload.role === 'USER' && payload.id !== parseInt(req.params.userId) && payload.id !== parseInt(req.body.user_id)) {
      res.status(401)
      throw new Error('Forbidden');
    }


    req.payload = payload;
  } catch (err) {
    console.log(err);
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: err.message });
    }
    return res.status(401).json({ message: err.message });
  }

  next();
};
