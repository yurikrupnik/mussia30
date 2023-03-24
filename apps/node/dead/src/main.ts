
function dead(req, res) {
  res.send(`Hello ${req.query.name || req.body.name || 'World'}!`);
}

function stam(req, res) {
  res.send(`Hello ${req.query.name || req.body.name || 'World'}!`);
}

export { dead, stam };
