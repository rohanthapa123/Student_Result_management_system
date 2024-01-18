const tokenBlacklist = new Set();

const blacklistToken = (token) =>{
    tokenBlacklist.add(token);
}


module.exports = blacklistToken;