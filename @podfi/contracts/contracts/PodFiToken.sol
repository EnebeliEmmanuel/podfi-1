//SPDX-License-Identifier:MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import {PodcastStorage} from "./PodcastStorage.sol";
import {UserStorage} from "./UserStorage.sol";

contract PodFiToken is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _pollIdCounter;

    IERC20 public usdcToken;
    PodcastStorage public podcastStorage;
    UserStorage public userStorage;

    uint256 public rewardRatePerHour = 1 * 10**18; // 1 POD per hour of listening
    uint256 public likeReward = 0.1 * 10**18; // 0.1 POD per like
    uint256 public commentReward = 0.5 * 10**18; // 0.5 POD per comment
    uint256 public shareReward = 2 * 10**18; // 2 POD per share

    struct Poll {
        string question;
        string[] options;
        mapping(uint256 => uint256) votes;
        mapping(address => bool) hasVoted;
    }

    mapping(uint256 => Poll) public polls;

    event TokensSwapped(address indexed user, uint256 podAmount, uint256 usdcAmount);
    event PollCreated(uint256 pollId, string question);
    event VoteCast(address indexed voter, uint256 pollId, uint256 option, uint256 weight);
    event AdvertisementSetup(address indexed brand, string podcastId, uint256 reward);

    constructor(address _usdcToken, address _podcastStorage, address _userStorage) {
        usdcToken = IERC20(_usdcToken);
        podcastStorage = PodcastStorage(_podcastStorage);
        userStorage = UserStorage(_userStorage);
    }

    function rewardListener(
        string memory podcastId,
        address listener,
        uint256 hoursListened,
        uint256 likes,
        uint256 comments,
        uint256 shares
    ) external onlyOwner {
        uint256 totalReward = (hoursListened * rewardRatePerHour) + 
                              (likes * likeReward) + 
                              (comments * commentReward) + 
                              (shares * shareReward);
        PodcastStorage.Podcast memory podcast = podcastStorage.getById(podcastId);
        ERC20Token(podcast.podToken).mint(listener, totalReward);
    }

    function swapTokens(string memory podcastId, uint256 podAmount) external {
        PodcastStorage.Podcast memory podcast = podcastStorage.getById(podcastId);
        ERC20Token podToken = ERC20Token(podcast.podToken);
        require(podToken.balanceOf(msg.sender) >= podAmount, "Insufficient PodToken balance");
        uint256 usdcAmount = getUSDCAmount(podAmount);
        podToken.burn(msg.sender, podAmount);
        require(usdcToken.transfer(msg.sender, usdcAmount), "USDC transfer failed");
        emit TokensSwapped(msg.sender, podAmount, usdcAmount);
    }

    function getUSDCAmount(uint256 podAmount) public pure returns (uint256) {
        // Implement your exchange rate logic here
        return podAmount; // Placeholder
    }

    function createPoll(string memory question, string[] memory options) external onlyOwner {
        uint256 pollId = _pollIdCounter.current();
        Poll storage newPoll = polls[pollId];
        newPoll.question = question;
        for (uint256 i = 0; i < options.length; i++) {
            newPoll.options.push(options[i]);
        }
        _pollIdCounter.increment();
        emit PollCreated(pollId, question);
    }

    function vote(string memory podcastId, uint256 pollId, uint256 option) external {
        require(option < polls[pollId].options.length, "Invalid option");
        require(!polls[pollId].hasVoted[msg.sender], "Already voted");
        PodcastStorage.Podcast memory podcast = podcastStorage.getById(podcastId);
        ERC20Token podToken = ERC20Token(podcast.podToken);
        uint256 voterBalance = podToken.balanceOf(msg.sender);
        require(voterBalance > 0, "No voting power");

        polls[pollId].votes[option] += voterBalance;
        polls[pollId].hasVoted[msg.sender] = true;
        emit VoteCast(msg.sender, pollId, option, voterBalance);
    }

    function getPollResults(uint256 pollId) external view returns (uint256[] memory results) {
        results = new uint256[](polls[pollId].options.length);
        for (uint256 i = 0; i < polls[pollId].options.length; i++) {
            results[i] = polls[pollId].votes[i];
        }
    }

    function setupAdvertisement(
        address brand,
        string memory podcastId,
        uint256 reward
    ) external onlyOwner {
        PodcastStorage.Podcast memory podcast = podcastStorage.getById(podcastId);
        ERC20Token(podcast.podToken).mint(brand, reward);
        emit AdvertisementSetup(brand, podcastId, reward);
    }

    function rewardAdEngagement(
        address user,
        uint256 reward
    ) external onlyOwner {
        // Logic to reward users for engaging with advertised products
        // Placeholder implementation
        // ERC20Token(podcast.podToken).mint(user, reward);
    }
}

contract ERC20Token is ERC20, Ownable {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
    }
}
