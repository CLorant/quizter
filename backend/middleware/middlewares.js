//404-es Web errornál logolja a rossz elérési útvonalt majd küld egy random képet vissza
function notFound(req, res, next) {
  res.status(404);
  return res.redirect(`https://http.cat/${res.statusCode}`);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode); 
  res.redirect(`https://http.cat/${res.statusCode}`);
}

module.exports = {
  notFound,
  errorHandler,
};
