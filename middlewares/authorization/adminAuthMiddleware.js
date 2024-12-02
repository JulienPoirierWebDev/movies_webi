const adminAuthorizationMiddleware = (request, response, next) => {
	try {
		if (request.role === 'admin') {
			next();
		} else {
			response.json({ error: true, message: "Prob d'auth" });
		}
	} catch (error) {
		response.json({ error: true, message: "Prob d'auth", error });
	}
};

export default adminAuthorizationMiddleware;
