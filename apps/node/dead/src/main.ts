const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/live', (req, res) => {
  res.send('ok')
})

app.get('/health', (req, res) => {
  res.send('ok')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
//
// function dead(req, res) {
//   res.send(`Hello ${req.query.name || req.body.name || 'World'}!`);
// }
//
// function stam(req, res) {
//   res.send(`Hello ${req.query.name || req.body.name || 'World'}!`);
// }
//
// export { dead, stam };
