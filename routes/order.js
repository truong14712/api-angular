const Order = require("../models/Order");
const Product = require("../models/Product");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.patch("/updateStatus", async (req, res) => {
  const { orderId, status } = req.body;
  try {
    // Tìm giỏ hàng dựa trên userId
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Tìm sản phẩm trong giỏ hàng dựa trên productId

    // Cập nhật trạng thái mới cho sản phẩm
    order.status = status;

    // Lưu giỏ hàng đã cập nhật
    await order.save();

    return res.json({
      message: "updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER ORDERS
router.get("/find/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).lean();
    const products = await Product.find({}).lean();
    const findItemInOrder = orders.map((order) => {
      const orderItems = order.products.map((orderItem) => {
        const findProduct = products.find(
          (product) => product._id == orderItem.productId
        );
        if (findProduct) {
          return { ...orderItem, ...findProduct };
        }
        return orderItem;
      });
      return { ...order, products: orderItems };
    });
    res.status(200).json(findItemInOrder);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find().lean();
    const products = await Product.find({}).lean();
    const findItemInOrder = orders.map((order) => {
      const orderItems = order.products.map((orderItem) => {
        const findProduct = products.find(
          (product) => product._id == orderItem.productId
        );
        if (findProduct) {
          return { ...orderItem, ...findProduct };
        }
        return orderItem;
      });
      return { ...order, products: orderItems };
    });
    res.status(200).json(findItemInOrder);
    // const orders = await Order.find();
    // res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET MONTHLY INCOME

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
