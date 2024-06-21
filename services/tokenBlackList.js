// blacklistService.js

const blacklistedTokens = new Set();

const addToBlacklist = (token) => {
  blacklistedTokens.add(token);
  console.log(blacklistedTokens)
};

const isTokenBlacklisted = (token) => {
  return blacklistedTokens.has(token);
};

module.exports = {
  addToBlacklist,
  isTokenBlacklisted,
};
