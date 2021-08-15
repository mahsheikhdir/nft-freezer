// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.6;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTFreezer is Ownable {
    
    using Counters for Counters.Counter;
    Counters.Counter private count;
    
    struct Entry {
        uint timestamp;
        string cid;
        string uri;
    }
    
    struct NFT {
        bool exists;
        uint network;
        mapping(uint => Entry) tokenToEntry;
    }
    
    struct NContract {
        uint network;
        address contracts;
    }
    
    NContract[] contracts;
    mapping(uint => NFT) contractsInfo;
    
    event NewEntry(address indexed NFTcontract, uint indexed network, address indexed logger, uint token);
    
    function addToken(address caddr, uint token, string memory uri, uint network) public {
        
        uint addr = uint(keccak256(abi.encodePacked(caddr, network)));
        
        if (contractsInfo[addr].exists == false) {
            contracts.push(NContract(network, caddr));
        }
        
        if (contractsInfo[addr].tokenToEntry[token].timestamp == 0){
            // new token
            count.increment();
        }
        
        contractsInfo[addr].exists = true;
        contractsInfo[addr].network = network;
        contractsInfo[addr].tokenToEntry[token] = Entry(block.timestamp, '', uri);
        
        
        emit NewEntry(caddr, network, msg.sender, token);
    }
    
    function setTokenURI(address addr, uint network, uint token, string memory newURI) public onlyOwner() {
        uint hash = uint(keccak256(abi.encodePacked(addr, network)));
        contractsInfo[hash].tokenToEntry[token].cid = newURI;
    }
    
    function currentEntry(address addr, uint network, uint token) public view returns (uint, string memory, string memory) {
        
        uint hash = uint(keccak256(abi.encodePacked(addr, network)));
        Entry memory tmp = contractsInfo[hash].tokenToEntry[token];
        
        return (tmp.timestamp, tmp.cid, tmp.uri);
    }
    
    function tokenCount() public view returns (uint) {
        return count.current();
    }
}