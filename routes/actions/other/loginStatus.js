module.exports = async (req, res) => {
	if (req.session && req.session.userInfo && req.session.userInfo.role == 'admin'&&req.session.userInfo.status==1) {
		const s = `var isLogin = true; var userId=\"${req.session.userInfo._id}"\;`

		res.send(s)
	}else {
		res.send('var isLogin = false')
	}
};
