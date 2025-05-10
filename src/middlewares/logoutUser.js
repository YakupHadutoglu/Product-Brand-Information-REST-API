const logOutUser = async (req, res , next) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
        res.redirect('/login');
        next();
            console.log(req.cookies)
            console.log("kişi başaraıyla çıkış yaptı");

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

module.exports = { logOutUser };
