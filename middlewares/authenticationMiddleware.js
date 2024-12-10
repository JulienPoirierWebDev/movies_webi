import jwt from 'jsonwebtoken';

const authenticationMiddleware = (request, response, next) => {
	try {
		const autorizationHeader = request.headers.authorization;
		const token = autorizationHeader.split(' ')[1];

		const payload = jwt.verify(token, process.env.SECRET_JWT);

		request.role = payload.role;

		next();
	} catch (error) {
		response.json({ error: true, message: "Prob d'auth", error });
	}
};

export default authenticationMiddleware;
