// goals.js
document.addEventListener('DOMContentLoaded', () => {
    const addGoalBtn = document.getElementById('addGoalBtn');
    const goalsList = document.getElementById('goalsList');
    const goalNameInput = document.getElementById('goalName');
    const goalAmountInput = document.getElementById('goalAmount');
  
    // Array to store user's goals
    let goals = [];
  
    // Function to add a goal to the goals array
    function addGoal() {
      const goalName = goalNameInput.value.trim();
      const goalAmount = parseFloat(goalAmountInput.value.trim());
  
      if (goalName === '' || isNaN(goalAmount) || goalAmount <= 0) {
        return;
      }
  
      // Add the goal to the goals array
      goals.push({ name: goalName, amount: goalAmount });
  
      // Update the goalsList
      updateGoalsList();
  
      // Clear input fields
      goalNameInput.value = '';
      goalAmountInput.value = '';
    }
  
    // Function to update the goalsList
    async function updateGoalsList() {
      // Clear previous goals
      goalsList.innerHTML = '';
  
      // Update the goalsList with the updated goals array
      for (const goal of goals) {
        const goalCard = document.createElement('div');
        goalCard.classList.add('goal-card');
  
        // Fetch the user's balance
        const balance = await getBalance();
        const progress = goal.amount > 0 ? (balance / goal.amount) * 100 : 0;
  
        const progressBar = document.createElement('div');
        progressBar.classList.add('progress');
        progressBar.innerHTML = `
          <div class="progress-bar" role="progressbar" style="width: ${progress}%;" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100">${progress.toFixed(2)}%</div>
        `;
  
        const goalTitle = document.createElement('h4');
        goalTitle.textContent = goal.name;
  
        goalCard.appendChild(goalTitle);
        goalCard.appendChild(progressBar);
  
        goalsList.appendChild(goalCard);
      }
    }
  
    // Function to get the user's current wallet balance
    async function getBalance() {
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
        return web3.utils.fromWei(balance, 'ether');
      } else {
        console.log('Please install MetaMask or use a web3-enabled browser.');
        return '0';
      }
    }
  
    // Event listener to add a goal when the "Add Goal" button is clicked
    addGoalBtn.addEventListener('click', addGoal);
  });
  