const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const APIError=require("../helpers/APIError")
const router = require("express").Router();
const httpStatus = require('http-status');


//CREATE

router.post("/", verifyToken, async (req, res,next) => {
  const { userId, products } = req.body;
  try {
    // .populate('products.productId')
    // Tìm giỏ hàng theo userId
    const cart = await Cart.findOne({ userId });
    if (cart) {
      // Duyệt qua từng sản phẩm trong danh sách
      for (const product of products) {
        const { productId, quantity } = product;
        let productExists = false;
        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
        for (let i = 0; i < cart.products.length; i++) {
          if (cart.products[i].productId == productId) {
            // Nếu sản phẩm đã tồn tại, tăng số lượng lên
            cart.products[i].quantity += +quantity;
            productExists = true;
            break;
          }
        }
        console.log(productExists)
        // Nếu sản phẩm không tồn tại trong giỏ hàng, thêm sản phẩm mới vào giỏ hàng
        if (!productExists) {
          cart.products.push({ productId, quantity });
        }
      }

      // Lưu thay đổi vào cơ sở dữ liệu
      await cart.save();

      res.json({ message: 'Products added to cart successfully.',cart });
    } else {
      // Nếu giỏ hàng không tồn tại, tạo giỏ hàng mới và thêm sản phẩm vào đó
      const newCart = new Cart({ userId, products });
      await newCart.save();

      res.json({ message: 'Cart created and products added successfully.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding products to the cart.' });
  }
});

//UPDATE
router.post("/update", async (req, res) => {
  const { userId, products } = req.body;
  try {
    // .populate('products.productId')
    // Tìm giỏ hàng theo userId
    const cart = await Cart.findOne({ userId });
    if (cart) {
      // Duyệt qua từng sản phẩm trong danh sách
      for (const product of products) {
        const { productId, quantity } = product;
        let productExists = false;
        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
        for (let i = 0; i < cart.products.length; i++) {
          if (cart.products[i].productId == productId) {
            // Nếu sản phẩm đã tồn tại, tăng số lượng lên
            cart.products[i].quantity -= +quantity;
            productExists = true;
            break;
          }
        }
        // Nếu sản phẩm không tồn tại trong giỏ hàng, thêm sản phẩm mới vào giỏ hàng
        if (!productExists) {
          cart.products.push({ productId, quantity });
        }
      }

      // Lưu thay đổi vào cơ sở dữ liệu
      await cart.save();

      res.json({ message: 'Products added to cart successfully.',cart });
    } else {
      // Nếu giỏ hàng không tồn tại, tạo giỏ hàng mới và thêm sản phẩm vào đó
      const newCart = new Cart({ userId, products });
      await newCart.save();

      res.json({ message: 'Cart created and products added successfully.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding products to the cart.' });
  }
});

router.patch("/updateCart",async (req,res)=>{
  const { userId, products } = req.body;
  try {
    // Tìm giỏ hàng dựa trên userId
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    // Cập nhật products trong giỏ hàng
    cart.products = products;

    // Lưu giỏ hàng đã cập nhật
    await cart.save();  

   return res.json("Cart updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
})

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const deleteCart=await Cart.findOneAndDelete({userId:req.params.id});
    // await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({message:"Cart has been deleted..."});
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id }).populate('products.productId');
    if(!cart){
     return res.status(200).json({cart:[]});
    }
    return res.status(200).json({cart});

  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/", async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;