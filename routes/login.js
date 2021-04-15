const router = require("express").Router();
// const { Router } = require("express");
const entry = require("../models/Entrie");
const userModel = require("../models/user");

router.get("/", (req, res) => {
  res.redirect("/homepage");
});


router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.redirect('/')
    res.clearCookie(req.app.get('cookieName'))
    return res.redirect('/')
  })
});
router.get('/yourforms',async (req,res) =>{
  const entries = await entry.find({currentdepartment:`${req.session.user.department}`})
  console.log(entries)
  res.render('allforms',{entries})
})

router.get("/allforms",async (req,res) =>{
  const entries = await entry.find()
  console.log(entries)
  res.render('allforms',{entries})
})
router.get("/newform",async (req,res)=>{
const newEntry = new entry({status:'editing',initiator:req.session.user.id,currentdepartment:`${req.session.user.department}`})
console.log(newEntry._id);
await entry.create(newEntry)
res.redirect(`entry/${newEntry._id}`)
})
router.get("/login", (req, res) => {
  res.render("login");
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
  const application = await entry.find({_id:req.params.id})
  res.render("main-form",application);
});
router.post("/entry/:id", async (req, res) => {
  let application = await entry.findOneAndUpdate({_id:req.params.id},req.body)
  // Object.assign(application, req.body)
  // application.status='sent'
  // application.save()
  console.log(req.body);
  res.redirect("/homepage");
});



module.exports = router;
