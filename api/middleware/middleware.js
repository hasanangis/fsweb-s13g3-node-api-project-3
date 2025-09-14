const Users = require('../users/users-model');
function logger(req, res, next) {
  const tarih = new Date().toLocaleString();
  console.log(`${req.method} ${req.originalUrl} ${tarih} `);
  next();
}

async function validateUserId(req, res, next) {
  try {
    const { id } = req.params;
    const user = await Users.getById(id);
    if (!user) {
      return res.status(404).json({ message: "kullanıcı bulunamadı" });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);  
  }
}

function validateUser(req, res, next) {
  const name = req.body && req.body.name;
  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ message: "gerekli name alanı eksik" });
  }
  req.body.name = name.trim();
  next();
}

function validatePost(req, res, next) {
    const text = req.body && req.body.text;
  if (!text || typeof text !== "string" || text.trim() === "") {
    return res.status(400).json({ message: "gerekli text alanı eksik" });
  }
  req.body.text = text.trim();
  next();
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
};
// bu işlevleri diğer modüllere değdirmeyi unutmayın
