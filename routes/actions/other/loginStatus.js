module.exports = async (req, res) => {
	if (req.session && req.session.userInfo) {
		if (req.session.userInfo.role == 'admin') {
			const s = `var isLogin = true; var userId=\"${req.session.userInfo._id}"\;`
			return res.send(s);
		}
		if (req.session.userInfo.role == 'normal') {
			const s = `var login = true; var userId=\"${req.session.userInfo._id}"\;`
			return res.send(s);
		}
		
	}  else{
		return res.send('var isLogin = false;var login=false');
	}
};
