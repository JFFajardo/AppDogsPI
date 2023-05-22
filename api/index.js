const server = require('./src/app.js');
const port = process.env.PORT;
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(port, () => {
    console.log(`Server listening at: ${port} mi pana`); // eslint-disable-line no-console
  });
});
module.exports = {
  server
}