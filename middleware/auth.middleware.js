import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    // Extract token from request headers
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Token missing' });
    }

    try {
        // Verify token and attach user data to request object
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        next(error)
    }
};

