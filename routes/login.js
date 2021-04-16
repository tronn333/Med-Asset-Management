const router = require("express").Router();
// const { Router } = require("express");
const entry = require("../models/Entrie");
const userModel = require("../models/user");
const Comment = require("../models/comment");

router.get("/", (req, res) => { // redirect to homepage
  res.redirect("/homepage");
})
router.get('/logout', (req, res) => { //when logOut delete session and redirect to home page
  req.session.destroy((err) => {
    if (err) return res.redirect('/')
    res.clearCookie(req.app.get('cookieName'))
    return res.redirect('/')
  })
});
router.get('/yourforms', async (req, res) => { //render for all entry of departement of user
  const entries = await entry.find({ currentdepartment: `${req.session.user.department}` })
  // console.log(entries)
  res.render('allforms', { entries })
})

router.get("/allforms", async (req, res) => { // render of all entry
  const entries = await entry.find()
  console.log(entries)
  res.render('allforms', { entries })
})
router.get("/newform", async (req, res) => {
  const newEntry = new entry()
  // console.log(newEntry._id);
  // await entry.create(newEntry)
  res.redirect(`entry/${newEntry._id}`)
})
router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;
  if (email && password) {
    const currUser = await userModel.findOne({ email });
    if (currUser.password === password) {
      req.session.user = {
        userName: currUser.name,
        id: currUser._id,
        department: currUser.department
      };
      return res.status(200).redirect("/homepage");
    }
    return res.status(418).redirect("/login");
  }
  return res.status(418).redirect("/login");
});

router.get("/homepage", (req, res) => {
  res.render("homepage");
});
router.get("/entry/:id", async (req, res) => {
  let application = await entry.find({ _id: req.params.id })

  if (application.length === 0) {
    application.push(new entry({ _id: req.params.id }))
  } else {
    res.locals.status = application.status
  }
  console.log(application);
  res.render("main-form", { application });
});

router.post("/entry/:id", async (req, res) => {
  req.body.initiator = req.session.user.id
  req.body._id = req.params.id
  req.body.status = 'sent'
  for (const item in req.body) {
    if (req.body[item] == 'none' || req.body[item] == '') {
      delete req.body[item]
    }
    // console.log(typeof req.body[item]);
    if (typeof req.body[item] === 'object') {
      for (const key in req.body[item]) {
        if (req.body[item][key] == 'none' || req.body[item][key] == '') {
          delete req.body[item][key]
        }
      }
    }
  }
  let application = await entry.create(req.body)
  let comment = await Comment.create({
    user: req.body.initiator,
    entrie: req.params.id,
    comment: req.body.comment
  });
  res.redirect("/homepage");
});

router.get("/entry/:id/history", async (req, res) => {
  const idEntry = req.params.id;
  console.log("IDDDDDDD", idEntry);
  const entrys = await Comment.find({ entrie: idEntry }).populate("user");
  console.log("_________", entrys);
  res.render("history", { entrys });
});


module.exports = router;
