const express = require("express");
const {
  getuserstotal,
  findUser,
  blockuser,
  findCreator,
  findBusiness,
  findDeliveryPartners,
  findcoms,
  blockcomms,
  findposts,
  blockposts,
  blockproducts,
  findproducts,
  findreports,
  markreports,
  getdp,
  getalldata,
  findandblock,
  allapprovals,
  approvalactions,
  refresh,
  adminlogin,
  getCommunitiesforMon,
  communitiesRequests,
  store,
  approveStoreofUser,
  productApproval,
  allproductApprovals,
  dashboard,
  storecount,
} = require("../controllers/admin");
const router = express.Router();

router.get("/totalusers/:userId", getuserstotal);
router.post("/finduser/:useId/:id", findUser);
router.post("/findcreator/:userId/:id", findCreator);
router.post("/findbusiness/:userId/:id", findBusiness);
router.post("/finddeliverypartner/:userId/:id", findDeliveryPartners);
router.post("/findcomms/:comId/:id", findcoms);
router.post("/commsblock/:comId/:id", blockcomms);
router.post("/blockuser/:userId/:id", blockuser);
router.post("/findposts/:postId/:id", findposts);
router.post("/blockposts/:postId/:id", blockposts);
router.post("/findproducts/:prodId/:id", findproducts);
router.post("/blockproducts/:prodId/:id", blockproducts);
router.post("/findreports/:id", findreports);
router.post("/markreports/:reportId/:id", markreports);
router.get("/getdp/:userId", getdp);

//new routes
router.get("/getalldata/:id", getalldata);
router.post("/findandblock/:userId", findandblock);
router.get("/allapprovals/:userId", allapprovals);
router.post("/approvalactions/:userId", approvalactions);


// my
router.post("/adminlogin", adminlogin);
router.post("/refresh", refresh);
router.get("/v1/getCommunitiesforMon", getCommunitiesforMon);
router.post("/requests/:id", communitiesRequests);
router.get("/v1/store", store);
router.post("/approveStoreofUser/:id", approveStoreofUser);
router.post("/productApproval/:id/:pid", productApproval);
router.post("/allproductApprovals/:id", allproductApprovals);
router.get("/dashboard", dashboard);
router.get("/v1/storecount", storecount);
module.exports = router;
