const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const Redis = require("ioredis");
const http = require("http").Server(app);
const io = require("socket.io")(http);

//import routes
// const userAuth = require("./routes/authRoutes");
// const chatRoutes = require("./routes/convRoutes");
// const messageRoutes = require("./routes/message");
// const communityRoutes = require("./routes/community");
// const topicRoutes = require("./routes/topic");
// const productRoutes = require("./routes/product");
// const postRoutes = require("./routes/post");
// // const prositeRoutes = require("./routes/prosite");
// const commentRoutes = require("./routes/comment");
// const reviewRoutes = require("./routes/review");
// const orderRoutes = require("./routes/order");
// const glimpseRoutes = require("./routes/glimpse");
// const replyRoutes = require("./routes/reply");
// const questionsRoutes = require("./routes/questions");
// const searchRoutes = require("./routes/searc");
const adminRoutes = require("./routes/admin");
// const notificationRoutes = require("./routes/notification");
// const libraryRoutes = require("./routes/library");
// const testRoutes = require("./routes/test");
// const workRoutes = require("./routes/workspace");
const adRoutes = require("./routes/Ads");
// const memRoutes = require("./routes/membership");
const prosRoutes = require("./routes/pros");
const workspacev1 = require("./routes/WorkspaceV1");
const Community = require("./models/community");
// const Order = require("./models/orders");
const User = require("./models/userAuth");
const Advertiser = require("./models/Advertiser");
const Ads = require("./models/Ads");
const Posts = require("./models/post");
const Analytics = require("./models/Analytics");
const Montenziation = require("./models/Montenziation");
const Request = require("./models/Request");

require("dotenv").config();

//middlewares
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(morgan("dev"));
// app.use(bodyParser.json());
// app.use(cookieParser());
// app.use("/api", userAuth);
// app.use("/api", chatRoutes);
// app.use("/api", messageRoutes);
// app.use("/api", communityRoutes);
// app.use("/api", topicRoutes);
// app.use("/api", productRoutes);
// app.use("/api", postRoutes);
// // app.use("/api", prositeRoutes);
// app.use("/api", commentRoutes);
// app.use("/api", reviewRoutes);
// app.use("/api", orderRoutes);
// app.use("/api", glimpseRoutes);
// app.use("/api", replyRoutes);
// app.use("/api", questionsRoutes);
// app.use("/api", searchRoutes);
app.use("/api", adminRoutes);
// app.use("/api", notificationRoutes);
// app.use("/api", libraryRoutes);
// app.use("/api", testRoutes);
// app.use("/api", workRoutes);
app.use("/api", adRoutes);
app.use("/api/v1", workspacev1);
app.use("/api/v1", prosRoutes);

//connect to DB
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.DATABASE).then(() => {
      console.log("DB is connected");
    });
    // mongoose.connect(process.env.ONLINEDB).then(() => {
    //   console.log("DB is connected");
    // });
    // mongoose
    //   .connect(
    //     "mongodb+srv://fsayush100:shreyansh7@cluster0.mrnejwh.mongodb.net/your-database-name?retryWrites=true&w=majority"
    //   )
    //   .then(() => {
    //     console.log("DB is connected");
    //   });
  } catch (err) {
    console.log(err);
  }
};

connectDB();

const connectApp = () => {
  try {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
connectApp();

// const addData = async () => {
//   try {
//     // const id = "65e56589fffd8a9eaeb2cbb7"
//     const analytics = new Analytics({
//       id: "65e4d138ccf652dfe3cd6e2b",
//       click: 60,
//       impressions: 90,
//       cpc: 9,
//       cost: 200,
//       views: 1000,
//       // date: "04/03/2024"
//       // date: "05/03/2024"
//       // date: "06/03/2024"
//       date: "07/03/2024"
//     })
//     await analytics.save()
//     console.log("done")
//   } catch (error) {
//     console.log(error)
//   }
// }

// const addData = async () => {
//   try {
//     const mon = new Montenziation({
//       creator: "65b68725750001cd4dc81483",
//       community: "65d0f8176a4e4ae4c6e8ff6f",
//     })

//     await mon.save()
//     console.log("done")
//   } catch (error) {
//     console.log(error)
//   }
// }

// const addData = async () => {
//   try {
//     const request = new Request({
//       userid: "6550737ffe8f9dc7614bba5f",
//       storeDetails: {
//         buildingno: "a/19 Shanti nagar",
//         city: "kanpur",
//         state: "uttar pradesh",
//         postal: 208004,
//         landmark: "aysuhs",
//         gst: "aysuhs",
//         businesscategory: "aysuhs",
//         documenttype: "aysuhs",
//         documentfile: "https://media.istockphoto.com/id/1401109426/photo/flowing-water-liquid-freshness-horizontal-movement-bright.webp?b=1&s=170667a&w=0&k=20&c=f9Ak9bj0gYxxx6I6GEAE1uWx23MxHPTikn2LfhaJ1Ho=",
//       },
//     })
//     await request.save()
//     console.log("done")
//   } catch (error) {
//     console.log(error)
//   }
// }

// addData()
