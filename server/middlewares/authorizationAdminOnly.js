const authorization = (req, res, next) => {
    try {
        if (req.user.role === "Admin") {
            next();
        } else {
            throw {name: "Forbidden error di authorization"};
        }
    } catch (error) {
        next(error);
    }
}

module.exports = { authorization };