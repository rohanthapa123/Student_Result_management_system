exports.isAuthenticated = (req, res) =>{
    try {
        if(req.session){
            res.status(200).json({authenticated: true,message: "Authenticated"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server Error"})
    }
}