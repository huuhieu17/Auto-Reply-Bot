import express from "express"
import { createMessageReply, deleteMessageReply, editMessageReply, findById, getListMessage } from "../../../services/message.js";
var indexRouter = express.Router();

/* GET home page. */
indexRouter.get('/', async function (req, res, next) {
  const messages = await getListMessage();
  res.render('index', { messages });
});

// get page add 
indexRouter.get('/add', (req, res) => {
  // res.send("all users");
  res.render('add_message', { title: "Add Message" });
});

indexRouter.post('/add', (req, res) => {
  const { question, answer } = req.body;
  if (!question || !answer) return;
  createMessageReply(question, answer);
  res.redirect('/');
});

indexRouter.get('/edit/:id', async (req, res) => {
  // res.send("all users");
  let id = req.params.id;
  const msg = await findById(id);
  return res.render('edit_message', {
    title: "Edit message",
    message: msg
  })

});

indexRouter.post('/edit/:id', async (req, res) => {
  let id = req.params.id;
  const { question, answer } = req.body;
  await editMessageReply({
    _id: id,
    question,
    answer
  })
  res.redirect('/');
});


indexRouter.get('/delete/:id', async (req, res) => {
  let id = req.params.id;
  await deleteMessageReply(id);
  res.redirect('/');

});


export default indexRouter;
