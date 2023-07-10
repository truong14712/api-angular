const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/signup", async (req, res) => {
  const userExists = await User.findOne({ email:req.body.email });
  if (userExists) {
       return res.status(404).json({
         message: "Email đã tồn tại",
       });
     }
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    isAdmin:req.body.isAdmin
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN

router.post('/signin', async (req, res) => {
  const {email}=req.body
    try{
        const user = await User.findOne(
            {
                email: req.body.email
            }
        );
        if(!user){
          return res.status(401).json({
            message:"Email không tồn tại"
          })
        }
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );


        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        const inputPassword = req.body.password;
        
        if( originalPassword != inputPassword){
        return  res.status(401).json({
            message:"Mật khẩu không chính xác"
          });
        }
           

        const accessToken = jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
            {expiresIn:"3d"}
        );
  
        const { password, ...others } = user._doc;  
        res.status(200).json({...others, accessToken});

    }catch(err){
      console.log(err)
        res.status(500).json(err);
    }

});

module.exports = router;
