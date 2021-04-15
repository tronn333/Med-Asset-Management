const router = require("express").Router();
const entry = require("../models/Entrie");
const userModel = require("../models/user");

router.get("/", (req, res) => {
  res.redirect("/login");
});


router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.redirect('/')
    res.clearCookie(req.app.get('cookieName'))
    return res.redirect('/')
  })
});

router.get("/allforms",async (req,res) =>{
  const entries = await entry.find()
  console.log(entries)
  res.render('allforms',{entries})
})
router.get("/newform",async (req,res)=>{
const newEntry = new entry()
console.log(newEntry._id);
await entry.create(newEntry)
res.redirect(`/${newEntry._id}`)
})
router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/homepage", (req, res) => {
  res.render("homepage");
});
router.get("/:id", (req, res) => {
  res.render("main-form");
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (email && password) {
    const currUser = await userModel.findOne({ email });
    if (currUser.password === password) {
      req.session.user = {
        userName: currUser.name,
        id: currUser._id,
      };
      return res.status(200).redirect("/homepage");
    }
    return res.status(418).redirect("/login");
  }
  return res.status(418).redirect("/login");
});

module.exports = router;
