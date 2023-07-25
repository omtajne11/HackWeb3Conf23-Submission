// dashboard.js
// Function to fetch the user's balance using MetaMask and web3.js
async function fetchBalanceWithMetaMask() {
  try {
    // Check if web3 is available
    if (typeof window.ethereum !== 'undefined') {
      // Create a web3 instance using the MetaMask provider
      const web3 = new Web3(window.ethereum);

      // Request access to the user's Ethereum accounts using MetaMask
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Get the user's Ethereum address
      const userAddress = accounts[0];

      // Fetch the user's balance from the Ethereum blockchain
      const balance = await web3.eth.getBalance(userAddress);

      // Convert the balance from Wei to Ether
      const balanceInEther = web3.utils.fromWei(balance, 'ether');

      // Update the balance display paragraph
      const balanceDisplay = document.getElementById('balanceDisplay');
      balanceDisplay.textContent = `Your balance: ${balanceInEther} ETH`;
    } else {
      // MetaMask or web3 not available
      console.log('Please install MetaMask or use a web3-enabled browser.');
    }
  } catch (error) {
    console.log('Error:', error);
  }
}

// Event listener to call the function when the page loads
document.addEventListener('DOMContentLoaded', fetchBalanceWithMetaMask);


async function fetchTransactionsWithMetaMask() {
  try {
    // Check if web3 is available
    if (typeof window.ethereum !== 'undefined') {
      // Create a web3 instance using the MetaMask provider
      const web3 = new Web3(window.ethereum);

      // Request access to the user's Ethereum accounts using MetaMask
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Get the user's Ethereum address
      const userAddress = accounts[0];

      // Get the block number of the latest block on the Ethereum blockchain
      const latestBlockNumber = await web3.eth.getBlockNumber();

      // Set the number of blocks to go back to fetch transactions (e.g., 10 blocks)
      const blocksToGoBack = 10;

      // Calculate the starting block number for fetching transactions
      const startingBlockNumber = Math.max(0, latestBlockNumber - blocksToGoBack);

      // Fetch the transactions using the getPastEvents method
      const transactions = await web3.eth.getPastLogs({
        fromBlock: startingBlockNumber,
        toBlock: 'latest',
        address: userAddress,
      });

      // Display the transactions in the transactionList div
      const transactionList = document.getElementById('transactionList');
      transactionList.innerHTML = ''; // Clear previous transactions

      transactions.forEach((tx) => {
        const transactionElement = document.createElement('p');
        transactionElement.textContent = `Transaction Hash: ${tx.transactionHash}`;
        transactionList.appendChild(transactionElement);
      });
    } else {
      // MetaMask or web3 not available
      console.log('Please install MetaMask or use a web3-enabled browser.');
    }
  } catch (error) {
    console.log('Error:', error);
  }
}

// Event listener to call the function when the page loads
document.addEventListener('DOMContentLoaded', fetchTransactionsWithMetaMask);
