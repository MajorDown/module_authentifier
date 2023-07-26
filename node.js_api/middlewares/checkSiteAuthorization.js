const sites = require("../authorizedSites.json");

function checkSiteAuthorization(req, res, next) {
  const site = sites.find((url) => url === req.headers.referer);
  if (!site) {
    console.log("checkAutorizedSite ~> site utilisateur non autorisé");
    return res
      .status(403)
      .json({ error: "Site non autorisé à utiliser l'API." });
  }
  req.site = site;
  console.log("checkAutorizedSite ~> site utilisateur autorisé");
  next();
}

module.exports = checkSiteAuthorization;
