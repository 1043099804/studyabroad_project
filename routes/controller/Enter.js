// Redirect to a new page.

exports.indexpageEnter = function(req, res) {
	res.sendfile("./views/saindex.html");
}

exports.userLogin = function (req, res) {
	if (req.session.user_id) {
		res.sendfile("/user/login");
	} else{
		res.sendfile("./views/html/UserArea/login.html");
	};
}

exports.userSignup = function (req, res) {
	if (req.session.user_id) {
		res.redirect("/user/login");
	} else{
		res.sendfile("./views/html/UserArea/signup.html");
	};
}

exports.adminPageEnter = function(req, res) {
	res.sendfile("./views/html/AdminArea/merchantProfileAdmin.html");
}

exports.merchantProfilePage = function (req, res) {
  res.sendfile("./views/html/MerchantArea/merchantIndex.html");
}

exports.userProfilePage = function (req, res) {
  res.sendfile("./views/html/UserArea/userProfile.html");
}



// Access Control
exports.getAllAccess = function (req, res) {
	if (!req.session.admin_name) {
		req.session.admin_name = "liufan";
	};
  	res.redirect("/admin/index");
}

exports.authenticateMerchant = function (req, res, next) {
	var session = req.session;
	if (session.merchant_id) {
		next();
	} else {
		res.sendfile("./views/html/MerchantArea/login.html");
	};
}

exports.authenticateUser = function (req, res, next) {
	var session = req.session;
	if (session.user_id) {
		next();
	} else {
		res.redirect("/user/login/page");
	};
}

exports.authenticateAdmin = function (req, res, next) {
	var session = req.session;
	if (session.admin_name) {
		next();
	} else {
		res.sendfile("./views/html/AdminArea/adminLogin.html");
	};
}