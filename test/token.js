const {expect} = require('chai');
const { ethers } = require('hardhat');

describe ("Token contract",function (){

    let Token;
    let hardhatToken;
    let owner;
    let addr1;
    let addr2;
    let addrs;
    
    beforeEach(async ()=>{
        Token = await ethers.getContractFactory("Token");
        [owner ,addr1 ,addr2, ...adrs] = await ethers.getSigners();
        hardhatToken = await Token.deploy();
    });
    describe("deployment",async ()=>{
        it("should set the right owner",async ()=>{
            expect(await hardhatToken.owner()).to.equal(owner.address);
        });
        it("should asign the total suply of tokens to the owner",async ()=>{
            const ownerBalance = await hardhatToken.balanceOf(owner.address);
            expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
        });
    });
    describe("transactions",()=>{
        it("should transfer tokens between accounts", async ()=>{
            //owner account to addr1
            await hardhatToken.transfer(addr1.address , 5);
            const addr1Balance =await hardhatToken.balanceOf(addr1.address);
            expect (addr1Balance).to.equal(5);

            await hardhatToken.connect(addr1).transfer(addr2.address , 5);
            const addr2Balance = await hardhatToken.balanceOf(addr2.address);
            expect (addr2Balance).to.equal(5);
        });
        it("should fail if sender does not have enough toknes", async ()=>{
            const initialOwnerBalance =await hardhatToken.balanceOf(owner.address);
            await expect(hardhatToken.connect(addr1).transfer(addr1.address , 1)).to.be.revertedWith("Not enough funds to transfer"); 
            expect (await hardhatToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
        });
        it ("should update balances after transaction ",async () => {
            const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

            hardhatToken.transfer(addr1.address,5);
            
            hardhatToken.transfer(addr2.address,10);

            const finalOwnerBalance=await hardhatToken.balanceOf(owner.address);
            expect(finalOwnerBalance).to.equal(initialOwnerBalance-15);

            const add1Balance =await hardhatToken.balanceOf(addr1.address);
            expect(add1Balance).to.equal(5);

            const add2Balance =await hardhatToken.balanceOf(addr2.address);
            expect(add2Balance).to.equal(10);
        });
    });
})
