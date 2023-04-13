const express = require("express");
const {
  postThread,
  getThread,
  getThreadsByUser,
  deleteThread,
  getThreadsByType,
  getThreads,
} = require("../db/threadControllers");
let router = express.Router();

router.post('/new', async (req, res) => {
  const thread = await postThread(req.body);
  return res.send(thread[0]);
})

router.get('/', async (req, res) => {
  const threads = await getThreads();

  return res.send(threads);
})

router.get('/type/:type', async (req, res) => {
  const threads = await getThreadsByType(req.params.type);
  return res.send(threads);
})

router.get("/id/:id", async (req, res) => {
  const thread = await getThread(req.params.id);
  return res.send(thread[0]);
});

router.get("/users/:username", async (req, res) => {
  const threads = await getThreadsByUser(req.params.username);
  return res.send(threads);
});

router.delete('/:id', async (req, res) => {
  await deleteThread(req.params.id);
  return res.send('Thread deleted!');
})

module.exports = router;
