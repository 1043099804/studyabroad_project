var express = require('express');
var router = express.Router();
var path = require('path');

var Enter = require('./controller/Enter.js');
var CreateUser = require('./controller/CreateUser.js');
var CreateMerchant = require('./controller/CreateMerchant.js');
var CreateAdmin = require('./controller/CreateAdmin.js');
var AdminProfile = require('./controller/AdminProfile.js');
var AdminTaskProfile = require('./controller/AdminTaskProfile.js');
var MerchantProfile = require('./controller/MerchantProfile.js');
var UserInformation = require('./controller/UserInformation.js');
var ResetWebsiteProfile = require('./controller/ResetWebsiteProfile.js');


var Test = require('./controller/Test.js');


module.exports = function(app) {

	app.all("/", Enter.indexpageEnter);
	app.all("/admin", Enter.authenticateAdmin, Enter.adminPageEnter);




    //Admin Area
    app.get("/admin", Enter.authenticateAdmin, Enter.getAllAccess);
    app.post("/admin/password", AdminProfile.companyPasswordChecking);
    app.post("/admin/profile/token", AdminProfile.returnToken);
    app.post("/admin/login", AdminProfile.adminLogin);
    app.post("/admin/create", CreateAdmin.createNewAdmin);
    app.post("/admin/profile/change", Enter.authenticateAdmin, AdminProfile.updateAdmin);
    app.get("/admin/liufanhh/access", Enter.getAllAccess);
    app.get("/admin/delete", Enter.authenticateAdmin, AdminProfile.deleteAdmin);
    app.get("/admin/login", Enter.authenticateAdmin, Enter.adminPageEnter);
    app.get("/admin/index", Enter.authenticateAdmin, Enter.adminPageEnter);
    app.get("/admin/get/admin/list", Enter.authenticateAdmin, AdminProfile.getAllAdmins);
    app.get("/admin/all/task/list", Enter.authenticateAdmin, AdminTaskProfile.getAllTasks);
    app.get("/admin/get/merchant/list", Enter.authenticateAdmin, MerchantProfile.getMerchantList);
    app.get("/admin/current/name", function(req, res) {
    	res.sendData(req.session.admin_name,"获取成功");
    });
    app.get("/admin/response/merchants/name", Enter.authenticateAdmin, AdminTaskProfile.getAdminResponseMerchantList);
    app.get("/admin/search/merchant", Enter.authenticateAdmin, MerchantProfile.searchMerchant);
    

    app.get("/website/profile/create", ResetWebsiteProfile.createWebsiteInformation);
    app.get("/website/profile/usersAmountCount", ResetWebsiteProfile.countUsersAmount);
    app.get("/website/profile/usersAmountSet", ResetWebsiteProfile.setUsersAmount);
    app.get("/website/profile/merchantsAmountCount", ResetWebsiteProfile.countMerchantsAmount);
    app.get("/website/profile/merchantsAmountSet", ResetWebsiteProfile.setMerchantsAmount);



    //Index Page
	app.get("/merchant/logos", MerchantProfile.getMerchantsLogo);	

	//User Area
	app.get("/user/signup/page", Enter.userSignup);
	app.get("/user/login/page", Enter.userLogin);
	// app.get("/user/login", Enter.authenticateUser, Enter.indexpageEnter);
	app.get("/user/login/profile", Enter.authenticateUser, Enter.userProfilePage);
	app.post("/user/register", CreateUser.newuserCreate);
	app.post("/user/profile/token", UserInformation.getToken);
	app.post("/user/name/checking", UserInformation.nameChecking);
	app.post("/user/email/checking", UserInformation.emailChecking);
	app.post("/user/information", Enter.authenticateUser, UserInformation.getOneUser);
	app.post("/user/login", UserInformation.userLogin);
	app.get("/verification", UserInformation.emailVerify);
	app.get("/user/email/sent", Enter.emailSent);



	//Merchant Area
	app.get("/merchant/cooperate", MerchantProfile.merchantLogin);
	app.get("/merchant/login", Enter.authenticateMerchant, Enter.merchantProfilePage);

	app.post("/merchant/login", MerchantProfile.merchantLogin);
	app.post("/merchant/profile/password", MerchantProfile.createNewPassword);
	app.post("/merchant/profile/create", CreateMerchant.createNewMerchant);
	app.post("/merchant/profile/token", MerchantProfile.returnToken);
	app.get("/merchant/profile/find", MerchantProfile.findOneMerchant);
	app.post("/merchant/profile/logo", Enter.authenticateMerchant, MerchantProfile.profileUpload);
	app.post("/merchant/profile/business_license", Enter.authenticateMerchant, MerchantProfile.profileUpload);
	app.post("/merchant/profile/tax_registration", Enter.authenticateMerchant, MerchantProfile.profileUpload);
	app.post("/merchant/profile/organization_order", Enter.authenticateMerchant, MerchantProfile.profileUpload);
	app.get("/merchant/name/complete", MerchantProfile.merchantNameComplete);

}
