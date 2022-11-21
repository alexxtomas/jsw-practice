const errors = [
  {
    name: 'CastError',
    action: (res) => res.status(400).json({ error: 'Used id is malformed' })
  },
  {
    name: 'JsonWebTokenError',
    action: (res) =>
      res.status(401).json({ error: 'Token is missing or invalid' })
  },
  {
    name: 'ToeknExpirerError',
    action: (res) => res.status(401).json({ error: 'Token expired' })
  }
]
module.exports = (err, req, res, next) => {
  console.error(err.name)
  const { name: errName } = err
  const errFound = errors.find(({ name }) => name === errName)

  if (!errFound) res.status(500).end()
  errFound.action(res)
}
