const server = require('./src/app.js');
const PORT = 3001;
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server listening at: ${PORT} mi pana`); // eslint-disable-line no-console
  });
});
module.exports = {
  server
}