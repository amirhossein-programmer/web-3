const {expect} = require('chai');
const { ethers } = require('hardhat');

describe ("Token contract",function (){

    let Token;
    let hardhatToken;
    let owner;
    let addr1;
    let addr2;
    let addrs;
    
    beforeEach(async function(){
        Token = await ethers.getContractFactory("Token");
        [owner ,addr1 ,addr2, ...adrs] = await ethers.getSigners();
        hardhatToken = await Token.deploy();
    });
    describe("deployment",async function(){
        it("should set the right owner",async function(){
            expect(await hardhatToken.owner()).to.equal(owner.address);
        });
        it("should asign the total suply of tokens to the owner",async function(){
            const ownerBalance = await hardhatToken.balanceOf(owner.address);
            expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
        });
    });
    describe("transactions", function(){
        it("should transfer tokens between accounts", async function(){
            //owner account to addr1
            await hardhatToken.transfer(addr1.address , 5);
            const addr1Balance =await hardhatToken.balanceOf(addr1.address);
            expect (addr1Balance).to.equal(5);

            await hardhatToken.connect(addr1).transfer(addr2.address , 5);
            const addr2Balance = await hardhatToken.balanceOf(addr2.address);
            expect (addr2Balance).to.equal(5);
        });
        it("should fail if sender does not have enough toknes", async function(){
            const initialOwnerBalance =await hardhatToken.balanceOf(owner.address);
            await expect(hardhatToken.connect(addr1).transfer(addr1.address , 1)).to.be.revertedWith("Not enough funds to transfer"); 
            expect (await hardhatToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
        });
    });
})





























// const {expect} = require("chai");

// describe ("Token contract", function () {
//     it ("deploument should assign the totla supply of  tokens to the owner", async () => {
//         const [owner] = await ethers.getSigners();
//         console.log("signers object", owner);
//         const Token = await ethers.getContractFactory("Token");

//         const hardHatTokens = await Token.deploy();

//         const ownerBalance = await hardHatTokens.balanceOf(owner.address);
//         console.log("owner address", owner.address);
//         expect (await hardHatTokens.totalSupply()).to.equal(ownerBalance);
//     });
//      it ("should trasfer token between account", async () => {
//         const [owner, addr1,addr2] = await ethers.getSigners();
//         const Token = await ethers.getContractFactory("Token");
//         const hardhatTokens = await Token.deploy();
//         await hardhatTokens.transfer(addr1.address,10);
//         expect(await hardhatTokens.balanceOf(addr1.address)).to.equal(10);

//         await hardhatTokens.connect(addr1).transfer(addr2.address,5);
//         expect (await hardhatTokens.balanceOf(addr2.address)).to.equal(5);

//     });
// });
