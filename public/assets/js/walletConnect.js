window.addEventListener('load', async () => {
  // Modern dapp browsers
  if (window.ethereum) {
    const connectButton = document.getElementById('connectWallet');
    connectButton.addEventListener('click', async (event) => {
      event.preventDefault(); // Prevent form submission
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('MetaMask connected successfully!');
        // Redirect to dashboard.html
        window.location.href = 'dashboard.html';
      } catch (error) {
        console.log('Error connecting to MetaMask:', error);
      }
    });
  } else {
    console.log('Non-Ethereum browser detected. Please install MetaMask.');
  }
});