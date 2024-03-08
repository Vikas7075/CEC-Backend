import jwt from 'jsonwebtoken'

export const setCookie = (user, res, message, statusCode = 200) => {
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);
    // set cookie with the jwt token
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        sameSite: process.env.Node_env === "development" ? "lax" : "none",
        secure: process.env.Node_env === "development" ? false : true
    })

    // set status code and send response
    res.status(statusCode).json({
        user, message, token
    })
}