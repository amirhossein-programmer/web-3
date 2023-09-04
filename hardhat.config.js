/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle")

const ALCHEMY_API_KEY="rdH0fY1b6pFZbI2FVX70e9DQ-dIy9aT6";
const SEPOLIA_PRIVATE_KEY="6a3d2379ee1860510b2c15d345c7ee053d1299ba28e442cadae950ee2c9811fc";
module.exports = {
  solidity: "0.8.19",
  defaultNetwork: "sepolia",
  networks: {
    sepolia:{
      url:`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts:[`${SEPOLIA_PRIVATE_KEY}`],
    },
  },
};