const User = require("../models/userAuth");
const Order = require("../models/orders");
const Post = require("../models/post");
const Product = require("../models/product");
const Community = require("../models/community");
const Report = require("../models/reports");
const Job = require("../models/jobs");
const Revenue = require("../models/revenue");
const Advertiser = require("../models/Advertiser");
const DelUser = require("../models/deluser");
const Approvals = require("../models/Approvals");
const Minio = require("minio");
const jwt = require("jsonwebtoken");
const Montenziation = require("../models/Montenziation");
const Request = require("../models/Request");
const Admin = require("../models/admins");
require("dotenv").config();

const minioClient = new Minio.Client({
  endPoint: "minio.grovyo.xyz",

  useSSL: true,
  accessKey: "shreyansh379",
  secretKey: "shreyansh379",
});

//function to generate a presignedurl of minio
async function generatePresignedUrl(bucketName, objectName, expiry = 604800) {
  try {
    const presignedUrl = await minioClient.presignedGetObject(
      bucketName,
      objectName,
      expiry
    );
    return presignedUrl;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to generate presigned URL");
  }
}

exports.getuserstotal = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else if (user.role !== "Admin") {
      res.status(404).json({ message: "UnAuthorized" });
    } else {
      const users = await User.countDocuments();
      const orders = await Order.countDocuments();
      const posts = await Post.countDocuments();
      const products = await Product.countDocuments();
      const comms = await Community.countDocuments();
      const reports = await Report.countDocuments();
      const jobs = await Job.countDocuments();
      const revenue = await Revenue.find();
      {
        /* proper representation of revenue and best selling product left cause its done on behalf of orders */
      }
      res.status(200).json({
        users,
        orders,
        posts,
        comms,
        products,
        reports,
        jobs,
        revenue,
        success: true,
      });
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.findUser = async (req, res) => {
  const { userId, id } = req.params;
  try {
    const main = await User.findById(id);
    const user = await User.findById(userId).find({ role: "User" });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else if (main.role !== "Admin") {
      res.status(404).json({ message: "UnAuthorized" });
    } else {
    }
    res.status(200).json({
      user,
      success: true,
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
exports.findCreator = async (req, res) => {
  const { userId, id } = req.params;
  try {
    const main = await User.findById(id);
    const user = await User.findById(userId).find({ role: "Creator" });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else if (main.role !== "Admin") {
      res.status(404).json({ message: "UnAuthorized" });
    } else {
    }
    res.status(200).json({
      user,
      success: true,
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
exports.findBusiness = async (req, res) => {
  const { userId, id } = req.params;
  try {
    const main = await User.findById(id);
    const user = await User.findById(userId).find({ role: "Business" });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else if (main.role !== "Admin") {
      res.status(404).json({ message: "UnAuthorized" });
    } else {
    }
    res.status(200).json({
      user,
      success: true,
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
exports.findDeliveryPartners = async (req, res) => {
  const { userId, id } = req.params;
  try {
    const main = await User.findById(id);
    const user = await User.findById(userId).find({ role: "Delivery" });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else if (main.role !== "Admin") {
      res.status(404).json({ message: "UnAuthorized" });
    } else {
    }
    res.status(200).json({
      user,
      success: true,
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
exports.findcoms = async (req, res) => {
  const { comId, id } = req.params;
  try {
    const main = await User.findById(id);
    const coms = await Community.findById(comId);
    if (!coms) {
      res.status(404).json({ message: "User not found" });
    } else if (main.role !== "Admin") {
      res.status(404).json({ message: "UnAuthorized" });
    } else {
    }
    res.status(200).json({
      coms,
      success: true,
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
exports.findposts = async (req, res) => {
  const { postId, id } = req.params;
  try {
    const main = await User.findById(id);
    const posts = await Post.findById(postId);
    if (!posts) {
      res.status(404).json({ message: "User not found" });
    } else if (main.role !== "Admin") {
      res.status(404).json({ message: "UnAuthorized" });
    } else {
    }
    res.status(200).json({
      posts,
      success: true,
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.blockcomms = async (req, res) => {
  const { comId, id } = req.params;
  try {
    const main = await User.findById(id);
    const coms = await Community.findById(comId);
    if (!coms) {
      res.status(404).json({ message: "User not found" });
    } else if (main.role !== "Admin") {
      res.status(404).json({ message: "UnAuthorized" });
    } else {
      if (coms.status === "Block") {
        const current = await Community.updateOne(
          { _id: comId },
          { $set: { status: "Unblock" } }
        );
        res.status(200).json({
          current,
          success: true,
        });
      } else if (coms.status === "Unblock") {
        const current = await Community.updateOne(
          { _id: comId },
          { $set: { status: "Block" } }
        );
        res.status(200).json({
          current,
          success: true,
        });
      }
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.blockuser = async (req, res) => {
  const { userId, id } = req.params;
  try {
    const main = await User.findById(id);
    const user = await User.findById(userId).find({ role: "User" });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else if (main.role !== "Admin") {
      res.status(404).json({ message: "UnAuthorized" });
    } else {
      if (user[0].status === "Block") {
        const current = await User.updateOne(
          { _id: userId },
          { $set: { status: "Unblock" } }
        );
        res.status(200).json({
          current,
          success: true,
        });
      } else if (user[0].status === "Unblock") {
        const current = await User.updateOne(
          { _id: userId },
          { $set: { status: "Block" } }
        );
        res.status(200).json({
          current,
          success: true,
        });
      }
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.blockposts = async (req, res) => {
  const { postId, id } = req.params;
  try {
    const main = await User.findById(id);
    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({ message: "User not found" });
    } else if (main.role !== "Admin") {
      res.status(404).json({ message: "UnAuthorized" });
    } else {
      if (post.status === "Block") {
        const current = await Post.updateOne(
          { _id: postId },
          { $set: { status: "Unblock" } }
        );
        res.status(200).json({
          current,
          success: true,
        });
      } else if (post.status === "Unblock") {
        const current = await Post.updateOne(
          { _id: postId },
          { $set: { status: "Block" } }
        );
        res.status(200).json({
          current,
          success: true,
        });
      }
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.findproducts = async (req, res) => {
  const { prodId, id } = req.params;
  try {
    const main = await User.findById(id);
    const prod = await Product.findById(prodId);
    if (!prod) {
      res.status(404).json({ message: "User not found" });
    } else if (main.role !== "Admin") {
      res.status(404).json({ message: "UnAuthorized" });
    } else {
    }
    res.status(200).json({
      prod,
      success: true,
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.blockproducts = async (req, res) => {
  const { prodId, id } = req.params;
  try {
    const main = await User.findById(id);
    const prod = await Product.findById(prodId);
    if (!prod) {
      res.status(404).json({ message: "User not found" });
    } else if (main.role !== "Admin") {
      res.status(404).json({ message: "UnAuthorized" });
    } else {
      if (prod.status === "Block") {
        const current = await Product.updateOne(
          { _id: prodId },
          { $set: { status: "Unblock" } }
        );
        res.status(200).json({
          current,
          success: true,
        });
      } else if (prod.status === "Unblock") {
        const current = await Product.updateOne(
          { _id: prodId },
          { $set: { status: "Block" } }
        );
        res.status(200).json({
          current,
          success: true,
        });
      }
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.findreports = async (req, res) => {
  const { id } = req.params;
  try {
    const main = await User.findById(id);
    const report = await Report.find();
    if (!report) {
      res.status(404).json({ message: "User not found" });
    } else if (main.role !== "Admin") {
      res.status(404).json({ message: "UnAuthorized" });
    } else {
    }
    res.status(200).json({
      report,
      success: true,
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.markreports = async (req, res) => {
  const { reportId, id } = req.params;
  try {
    const main = await User.findById(id);
    const report = await Report.findById(reportId);
    if (!report) {
      res.status(404).json({ message: "User not found" });
    } else if (main.role !== "Admin") {
      res.status(404).json({ message: "UnAuthorized" });
    } else {
      const current = await Report.updateOne(
        { _id: reportId },
        { $set: { status: "Resolved" } }
      );
      res.status(200).json({
        current,
        success: true,
      });
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.getdp = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (user) {
      const dp = await generatePresignedUrl(
        "images",
        user.profilepic.toString(),
        60 * 60
      );
      let isbanned = false;
      if (user.status === "Block") {
        isbanned = true;
      }
      res.status(200).json({ success: true, dp, isbanned });
    } else {
      res.status(404).json({ message: "User not found", success: false });
    }
  } catch (e) {
    res.status(400).json({ message: e.message, success: false });
  }
};

//new apis

//getting all user data for dashboard
exports.getalldata = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      let data = {
        users: await User.countDocuments(),
        orders: await Order.countDocuments(),
        posts: await Post.countDocuments(),
        products: await Product.countDocuments(),
        communities: await Community.countDocuments(),
        reports: await Report.countDocuments(),
        jobs: await Job.countDocuments(),
        revenue: await Revenue.find(),
        advertisers: await Advertiser.countDocuments(),
        deliverypartners: await DelUser.countDocuments(),
        pendingapprovals: await Approvals.countDocuments(),
      };
      res.status(200).json({ data, success: true });
    } else {
      res.status(404).json({ message: "User not found", success: false });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Something went wrong", success: false });
  }
};

//finding and blocking all users
exports.findandblock = async (req, res) => {
  try {
    const { userId } = req.params;
    const { type, id, action } = req.body;
    const user = await User.findById(userId);
    if (user) {
      if (type === "community") {
        await Community.updateOne({ _id: id }, { $set: { status: action } });
      } else if (type === "user") {
        await User.updateOne({ _id: id }, { $set: { status: action } });
      } else if (type === "product") {
        await Product.updateOne({ _id: id }, { $set: { status: action } });
      } else if (type === "deliverypartner") {
        await DelUser.updateOne({ _id: id }, { $set: { accstatus: action } });
      } else if (type === "advertiser") {
        await Advertiser.updateOne({ _id: id }, { $set: { idstatus: action } });
      } else {
        await Post.updateOne({ _id: id }, { $set: { status: action } });
      }
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ message: "User not found", success: false });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Something went wrong", success: false });
  }
};

//all approvals pending
exports.allapprovals = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (user) {
      const approvals = await Approvals.find();
      res.status(200).json({ approvals, success: true });
    } else {
      res.status(404).json({ message: "User not found", success: false });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Something went wrong", success: false });
  }
};

//approve or rejects the pending approvals
exports.approvalactions = async (req, res) => {
  try {
    const { userId } = req.params;
    const { id, action } = req.body;
    const user = await User.findById(userId);
    if (user) {
      await Approvals.updateOne({ _id: id }, { $set: { status: action } });
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ message: "User not found", success: false });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Something went wrong", success: false });
  }
};

const encryptaes = async (data) => {
  try {
    const textBytes = aesjs.utils.utf8.toBytes(data);
    const aesCtr = new aesjs.ModeOfOperation.ctr(
      JSON.parse(process.env.key),
      new aesjs.Counter(5)
    );
    const encryptedBytes = aesCtr.encrypt(textBytes);
    const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    return encryptedHex;
  } catch (e) {
    console.log(e);
  }
};

function generateAccessToken(data) {
  const access_token = jwt.sign(data, process.env.MY_SECRET_KEY, {
    expiresIn: "1h",
  });
  return access_token;
}

function generateRefreshToken(data) {

  const refresh_token = jwt.sign(data, process.env.MY_SECRET_KEY, {
    expiresIn: "10d",
  });
  return refresh_token;
}

exports.adminlogin = async (req, res) => {
  try {
    const { email, password } = req.body
    const admins = ["traceit241@gmail.com", "divysharma6306@gmail.com", "fsayush100@gmail.com", "aryansh@gmail.com"]
    if (!admins.includes(email)) {
      return res.status(409).json({ success: false, message: "You are not allowed to access this panel" })
    }
    const passw = await encryptaes(password)
    const user = await User.findOne({ email })

    if (user) {
      if (passw !== user.passw) {
        return res.status(400).json({ success: false, message: "InValid Details" })
      }

      console.log(passw, user.passw, passw == user.passw)
      const data = {
        id: user._id,
        fullname: user.fullname,
        username: user.username,
        pic: process.env.URL + user.profilepic
      }

      const access_token = generateAccessToken(data);
      const refresh_token = generateRefreshToken(data);

      res
        .status(200)
        .json({
          access_token, refresh_token, success: true
        });

    } else {
      return res.status(400).json({ success: false, message: "User Not found" })
    }


  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong", success: false });
  }
}

exports.refresh = async (req, res) => {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return res
        .status(200)
        .json({ success: false, message: "Refresh token not provided" });
    }
    jwt.verify(
      refresh_token,
      process.env.MY_SECRET_KEY,
      async (err, payload) => {
        try {
          if (err) {
            return res
              .status(400)
              .json({ success: false, message: "Invalid refresh token" });
          }
          const sessionId = payload.sessionId;
          const user = await User.findById(payload.id);
          // const dp = await generatePresignedUrl(
          //   "images",
          //   user.profilepic.toString(),
          //   60 * 60
          // );

          const dp =
            process.env.URL + user.profilepic;
          if (!user) {
            return res
              .status(400)
              .json({ success: false, message: "User not found" });
          }
          const data = {
            dp,
            fullname: user.fullname,
            username: user.username,
            id: user._id.toString(),
            sessionId,
          };
          const access_token = generateAccessToken(data);

          res.status(200).json({ success: true, access_token });
        } catch (err) {
          ;
          res.status(400).json({ success: true, access_token });
        }
      }
    );
  } catch (err) {
    ;
    res.status(400).json({ success: false, message: "Internal server error" });
  }
};

exports.getCommunitiesforMon = async (req, res) => {
  try {
    const monetization = await Montenziation.find({ status: "pending" })
    let community = []
    for (let i = 0; i < monetization.length; i++) {
      comm = await Community.findById(monetization[i].community.toString())
      const user = await User.findById(comm.creator)

      const mon = await Montenziation.findOne({ community: comm?._id })

      const posts = await Post.find({ community: comm?._id });

      let eng = []
      await posts.map((p, i) => {

        let final = p.views <= 0 ? 0 :
          (
            parseInt(p?.likes)
            / parseInt(p?.views)) * 100;
        eng.push(final)
      })

      let sum = 0
      for (let i = 0; i < eng.length; i++) {
        sum += eng[i]
      }
      let avg = 0

      if (eng.length > 0) {
        avg = Math.round(sum / eng.length)
      } else {
        avg = 0
      }

      const data = {
        username: user.username,
        fullname: user.fullname,
        profilepic: user.profilepic,
        userid: user._id,
        requested: mon?.createdAt,
        title: comm.title,
        dp: process.env.URL + comm.dp,
        topics: comm.topics.length,
        posts: comm.totalposts,
        members: comm.memberscount,
        category: comm.category,
        id: comm._id,
        createdAt: comm.createdAt,
        engagement: avg
      }

      community.push(data)
    }

    res.status(200).json({ success: true, community })

  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: "Something went wrong" })
  }
}

exports.communitiesRequests = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body
    const mont = await Montenziation.findOne({ community: id })
    const community = await Community.findById(id)

    if (!community) {
      return res.status(400).json({ success: false, message: "Community not found!" })
    }
    mont.status = status
    await mont.save()
    if (status === "approved") {
      community.ismonetized = true
    } else {
      community.ismonetized = false
    }
    await community.save()
    res.status(200).json({ success: true, message: `Community ${status}!` })
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: "Something went wrong" })
  }
}

// exports.store = async (req, res) => {
//   try {
//     const request = await Request.find({ status: "pending" }).populate("userid", "profilepic username fullname communitycreated ")
//     let store = []
//     let product = []

//     for (let i = 0; i < request.length; i++) {
//       const data = {
//         userid: request[i].userid,
//         id: request[i]._id,
//         fullname: request[i].userid.fullname,
//         username: request[i].userid.username,
//         pic: process.env.URL + request[i].userid.profilepic,
//         address: request[i].storeDetails,
//         documentphoto: process.env.URL + request[i].storeDetails.documentfile,
//         createdAt: request[i].createdAt,
//         communities: request[i].userid.communitycreated.length,
//       }
//       store.push(data)
//     }

//     const requests = await Request.find({ status: "approved" }).populate("userid", "profilepic username fullname communitycreated ")
//     for (let i = 0; i < requests.length; i++) {
//       const products = await Product.find({ isverified: "in review", creator: requests[i].userid })

//       let actualProducts = []
//       for (let j = 0; j < products.length; i++) {
//         const data = {
//           name: products[j].name,
//           dp: process.env.PRODUCT_URL + products[j].images[0].content
//         }
//         actualProducts.push(data)
//       }

//       const data = {
//         id: requests[i]._id,
//         userid: requests[i].userid,
//         fullname: requests[i].userid.fullname,
//         username: requests[i].userid.username,
//         pic: process.env.URL + requests[i].userid.profilepic,
//         address: requests[i].storeDetails,
//         products: actualProducts,
//         documentphoto: process.env.URL + requests[i].storeDetails.documentfile,
//         createdAt: requests[i].createdAt,
//         communities: requests[i].userid.communitycreated.length,
//       }
//       product.push(data)
//     }

//     res.status(200).json({ success: true, store, product })
//   } catch (error) {
//     console.log(error)
//     res.status(400).json({ success: false, message: "Something Went Wrong" })
//   }
// }

exports.approveStoreofUser = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const request = await Request.findOne({ userid: id })
    const user = await User.findById(id)
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" })
    }
    request.status = status
    if (status === "approved") {
      user.isStoreVerified = true
      request.isverified = true
    } else {
      user.isStoreVerified = false
      request.isverified = false
    }
    await request.save()
    await user.save()
    res.status(200).json({ success: true, message: `Store ${status}` })
  } catch (error) {
    res.status(400).json({ success: false, message: "Something Went Wrong!" })
  }
}

exports.store = async (req, res) => {
  try {
    const pendingRequests = await Request.find({ status: "pending" }).populate("userid", "profilepic username fullname communitycreated ").lean();
    const approvedRequests = await Request.find({ status: "approved" }).populate("userid", "profilepic username fullname communitycreated ").lean();

    const store = pendingRequests.map(request => ({
      userid: request.userid,
      id: request._id,
      fullname: request.userid.fullname,
      username: request.userid.username,
      pic: process.env.URL + request.userid.profilepic,
      address: request.storeDetails,
      documentphoto: process.env.URL + request.storeDetails.documentfile,
      createdAt: request.createdAt,
      communities: request.userid.communitycreated.length,
    }));

    const product = [];
    for (const request of approvedRequests) {
      const products = await Product.find({ isverified: "in review", creator: request.userid });
      const actualProducts = products.map(product => ({
        id: product._id,
        name: product.name,
        dp: process.env.PRODUCT_URL + product.images[0].content
      }));

      const data = {
        id: request._id,
        userid: request.userid,
        fullname: request.userid.fullname,
        username: request.userid.username,
        pic: process.env.URL + request.userid.profilepic,
        address: request.storeDetails,
        products: actualProducts,
        documentphoto: process.env.URL + request.storeDetails.documentfile,
        createdAt: request.createdAt,
        communities: request.userid.communitycreated.length,
      };
      product.push(data);
    }

    let order = []

    const rorders = await Order.find().populate("buyerId", "profilepic username fullname address phone email").populate({
      path: "productId",
      select: "images name creator"
    }).populate({
      path: "sellerId",
      select: "profilepic username fullname phone storeAddress"
    })
      .populate({
        path: "data.product",
        model: "Product",
        select: "name images brandname"
      })
    const orders = rorders.reverse()

    res.status(200).json({ success: true, store, product, orders, purl: process.env.PRODUCT_URL, url: process.env.URL });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Something Went Wrong" });
  }
}

exports.productApproval = async (req, res) => {
  try {
    const { id, pid } = req.params
    const { status } = req.body

    const product = await Product.findById(pid)
    if (!product) {
      return res.status(400).json({ success: false, message: "Products not found" })
    }
    console.log(product.name)

    if (status === "approved") {
      product.isverified = "verified"
    } else if (status === "rejected") {
      product.isverified = "rejected"
    } else {
      product.isverified = "pending"
    }
    await product.save()

    res.status(200).json({ success: true, message: `Product ${status}` })
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: "Something went wrong!" })
  }
}

exports.allproductApprovals = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const product = await Product.find({ creator: id, isverified: "in review" })
    if (!product) {
      return res.status(400).json({ success: false, message: "Products not found" })
    }

    if (status === "approved") {
      for (let i = 0; i < product.length; i++) {
        product[i].isverified = "verified"
        await product[i].save()
      }
    } else if (status === "rejected") {

      for (let i = 0; i < product.length; i++) {
        product[i].isverified = "rejected"
        await product[i].save()
      }
    } else {
      for (let i = 0; i < product.length; i++) {
        product[i].isverified = "pending"
        await product[i].save()
      }
    }

    res.status(200).json({ success: true, message: `Products ${status}` })
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: "Something went wrong!" })
  }
}

exports.dashboard = async (req, res) => {
  try {
    const monetization = await Montenziation.find({ status: "pending" }).limit(3)
    let community = []
    for (let i = 0; i < monetization.length; i++) {
      comm = await Community.findById(monetization[i].community.toString())
      const user = await User.findById(comm.creator)

      const mon = await Montenziation.findOne({ community: comm?._id })

      const posts = await Post.find({ community: comm?._id });

      let eng = []
      await posts.map((p, i) => {

        let final = p.views <= 0 ? 0 :
          (
            parseInt(p?.likes)
            / parseInt(p?.views)) * 100;
        eng.push(final)
      })

      let sum = 0
      for (let i = 0; i < eng.length; i++) {
        sum += eng[i]
      }
      let avg = 0

      if (eng.length > 0) {
        avg = Math.round(sum / eng.length)
      } else {
        avg = 0
      }

      const data = {
        username: user.username,
        fullname: user.fullname,
        profilepic: user.profilepic,
        userid: user._id,
        requested: mon?.createdAt,
        title: comm.title,
        dp: process.env.URL + comm.dp,
        topics: comm.topics.length,
        posts: comm.totalposts,
        members: comm.memberscount,
        category: comm.category,
        id: comm._id,
        createdAt: comm.createdAt,
        engagement: avg
      }

      community.push(data)
    }

    const pendingRequests = await Request.find({ status: "pending" }).populate("userid", "profilepic username fullname communitycreated ").limit(3).lean();
    const approvedRequests = await Request.find({ status: "approved" }).populate("userid", "profilepic username fullname communitycreated ").limit(3).lean();

    const store = pendingRequests.map(request => ({
      userid: request.userid,
      id: request._id,
      fullname: request.userid.fullname,
      username: request.userid.username,
      pic: process.env.URL + request.userid.profilepic,
      address: request.storeDetails,
      documentphoto: process.env.URL + request.storeDetails.documentfile,
      createdAt: request.createdAt,
      communities: request.userid.communitycreated.length,
    }));

    const product = [];
    for (const request of approvedRequests) {
      const products = await Product.find({ isverified: "in review", creator: request.userid });
      const actualProducts = products.map(product => ({
        id: product._id,
        name: product.name,
        dp: process.env.PRODUCT_URL + product.images[0].content
      }));

      const data = {
        id: request._id,
        userid: request.userid,
        fullname: request.userid.fullname,
        username: request.userid.username,
        pic: process.env.URL + request.userid.profilepic,
        address: request.storeDetails,
        products: actualProducts,
        documentphoto: process.env.URL + request.storeDetails.documentfile,
        createdAt: request.createdAt,
        communities: request.userid.communitycreated.length,
      };
      product.push(data);
    }

    res.status(200).json({ success: true, community, product, store })

  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: "Something went wrong!" })
  }
}

exports.storecount = async (req, res) => {
  try {
    const a = await Request.find({ status: "approved" })
    const totalStore = a.length
    const totalRequests = await Request.countDocuments()
    const b = await Request.find({ status: "pending" })
    const totalPendingStore = b.length
    const order = await Order.countDocuments()
    const community = await Community.countDocuments()
    const totaluser = await User.countDocuments()
    function formatDate(dateString) {
      const date = new Date(dateString);

      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so we add 1
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    }
    const tdate = Date.now()
    const date = formatDate(tdate)
    const data = await Admin.findOne({ date });
    const activeuser = data?.activeuser
    res.status(200).json({ success: true, totalStore, totalRequests, totalPendingStore, order, community, totaluser, activeuser, data })
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: "Something went wrong!" })
  }
}
