import jwt from 'jsonwebtoken'

export const setCookie = (user, res, message, statusCode = 200) => {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });

    // set cookie with the jwt token
    res.cookie('token', token, {
        httpOnly: true
    })

    // set status code and send response
    res.status(statusCode).json({
        user, message, token
    })
}