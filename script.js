function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.querySelector('.main-content');
  const menuButton = document.querySelector('.menu-btn');

  if (sidebar.style.left === '0px') {
    // Collapse sidebar
    sidebar.style.left = '-250px';
    mainContent.style.marginLeft = '0';
    mainContent.style.width = '100%'; // Expand content to fill screen
    menuButton.style.color = '#000'; // Set menu button color to black
  } else {
    // Expand sidebar
    sidebar.style.left = '0';
    mainContent.style.marginLeft = '250px';
    mainContent.style.width = 'calc(100% - 250px)'; // Adjust content for sidebar width
    menuButton.style.color = '#fff'; // Set menu button color to white
  }
}


// Expand the sidebar and set menu-btn color by default
window.addEventListener('load', () => {
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.querySelector('.main-content');
  const menuButton = document.querySelector('.menu-btn');

  sidebar.style.left = '0'; // Sidebar expanded
  mainContent.style.marginLeft = '250px'; // Adjust main content
  menuButton.style.color = '#fff'; // Set menu button color to white

  // Show Profile page by default
  showPage('profile');
});



  
  //Section Styling
  function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
      page.style.display = 'none'; // Hide all pages
    });
    document.getElementById(pageId).style.display = 'block'; // Show the selected page
  }

  //Expense Styling
  // Update the addExpense() function (lines 23-46)
// Modify addExpense() function to include a checkbox and remove button
function addExpense() {
  const title = document.getElementById('expense-title').value;
  const amount = document.getElementById('expense-amount').value;

  if (title === '' || amount === '') {
    alert('Please fill in both fields.');
    return;
  }

  // Create a new expense item with checkbox and remove button
  const expenseItem = document.createElement('div');
  expenseItem.classList.add('expense-item');
  expenseItem.innerHTML = `
    <input type="checkbox" class="expense-checkbox">
    <span>${title}</span>
    <span class="amount">₹${parseFloat(amount).toFixed(2)}</span>
    <div class="expense-actions">
      <button class="split-expense-btn" onclick="prepareSplitExpense('${title}', ${amount})">Split Expense</button>
      <button class="remove-expense-btn" onclick="removeExpense(this)">Remove</button>
    </div>
  `;

  // Add the expense item to the list
  const expenseList = document.getElementById('expense-list');
  expenseList.appendChild(expenseItem);

  // Hide empty message
  const emptyMessage = document.getElementById('empty-message');
  emptyMessage.style.display = 'none';

  // Clear the form fields
  document.getElementById('expense-title').value = '';
  document.getElementById('expense-amount').value = '';

  // Update selection buttons
  updateSelectionButtons();
}

function prepareSplitExpense(expenseTitle, expenseAmount) {
  // Switch to Split Expenses page
  showPage('splitexpenses');
  
  // Set the total amount in the split expenses section
  document.getElementById('total-amount').value = expenseAmount;
  
  // Optional: Add expense title as a description
  const expenseTitleDisplay = document.createElement('div');
  expenseTitleDisplay.innerHTML = `<strong>Expense: ${expenseTitle}</strong>`;
  expenseTitleDisplay.style.marginBottom = '10px';
  
  // Insert the expense title description before the total amount input
  const totalAmountInput = document.getElementById('total-amount');
  totalAmountInput.parentNode.insertBefore(expenseTitleDisplay, totalAmountInput);
}

// Function to remove a single expense
function removeExpense(button) {
  const expenseItem = button.closest('.expense-item');
  expenseItem.remove();

  // Check if list is empty
  const expenseList = document.getElementById('expense-list');
  if (expenseList.children.length === 0) {
    const emptyMessage = document.getElementById('empty-message');
    emptyMessage.style.display = 'block';
  }

  updateSelectionButtons();
}

// Function to update selection buttons
function updateSelectionButtons() {
  const expenseList = document.getElementById('expense-list');
  let selectionButtonsContainer = document.getElementById('expense-selection-buttons');

  // Check if buttons container already exists; if not, create it
  if (!selectionButtonsContainer) {
    selectionButtonsContainer = document.createElement('div');
    selectionButtonsContainer.id = 'expense-selection-buttons';
    selectionButtonsContainer.innerHTML = `
      <button id="add-selected-btn">Add Selected Expenses</button>
      <button id="delete-selected-btn">Delete Selected Expenses</button>
    `;
    expenseList.parentNode.appendChild(selectionButtonsContainer);

    // Attach event listeners
    document.getElementById('add-selected-btn').addEventListener('click', addSelectedExpenses);
    document.getElementById('delete-selected-btn').addEventListener('click', deleteSelectedExpenses);
  }

  const addedExpensesSection = document.getElementById('added-expenses-section');
  const clearSelectionBtn = document.getElementById('clear-selection-btn');
  if (clearSelectionBtn) {
    clearSelectionBtn.onclick = clearSelection;
  }
  

  const selectedExpenses = document.querySelectorAll('.expense-item input:checked').length;
  const addSelectedBtn = document.getElementById('add-selected-btn');
  const deleteSelectedBtn = document.getElementById('delete-selected-btn');

  // Enable or disable buttons based on selection
  addSelectedBtn.disabled = selectedExpenses === 0;
  deleteSelectedBtn.disabled = selectedExpenses === 0;

  // Hide "Selected Expenses" section if no items are added
  if (addedExpensesSection) {
    const addedExpensesList = document.getElementById('added-expenses-list');
    if (addedExpensesList && addedExpensesList.children.length === 0) {
      addedExpensesSection.style.display = 'none';
    }
  }
}




// Function to add selected expenses to a new section
function addSelectedExpenses() {
  const selectedExpenses = document.querySelectorAll('.expense-item input:checked');
  if (selectedExpenses.length === 0) return;

  let totalAmount = 0;
  let expenseTitles = [];

  const addedExpensesSection = document.getElementById('added-expenses-section');
  const addedExpensesList = document.getElementById('added-expenses-list');
  const selectedExpensesTotal = document.getElementById('selected-expenses-total');

  addedExpensesList.innerHTML = ''; // Clear existing items

  selectedExpenses.forEach((checkbox) => {
    const expenseItem = checkbox.closest('.expense-item');
    const titleSpan = expenseItem.querySelector('span:nth-child(2)');
    const amountSpan = expenseItem.querySelector('.amount');

    const amount = parseFloat(amountSpan.textContent.replace('₹', ''));
    totalAmount += amount;
    expenseTitles.push(titleSpan.textContent);

    const addedItem = document.createElement('div');
    addedItem.classList.add('added-expense-item');
    addedItem.innerHTML = `
      <span>${titleSpan.textContent}</span>
      <span class="amount">₹${amount.toFixed(2)}</span>
    `;
    addedExpensesList.appendChild(addedItem);
  });

  // Display total amount in the "Selected Expenses" div
  selectedExpensesTotal.textContent = `Total: ₹${totalAmount.toFixed(2)}`;
  addedExpensesSection.style.display = 'block';

  const splitButton = document.getElementById('split-added-expenses-btn');
  splitButton.onclick = () => splitSelectedExpenses(totalAmount, expenseTitles);
}




function splitSelectedExpenses(totalAmount, expenseTitles) {
  showPage('splitexpenses');
  document.getElementById('total-amount').value = totalAmount.toFixed(2);

  const expenseTitleDisplay = document.createElement('div');
  expenseTitleDisplay.innerHTML = `<strong>Expenses: ${expenseTitles.join(', ')}</strong>`;
  expenseTitleDisplay.style.marginBottom = '10px';

  const totalAmountInput = document.getElementById('total-amount');
  totalAmountInput.parentNode.insertBefore(expenseTitleDisplay, totalAmountInput);
}


function clearSelection() {
  const selectedCheckboxes = document.querySelectorAll('.expense-item input:checked');
  selectedCheckboxes.forEach((checkbox) => {
    checkbox.checked = false; // Uncheck all selected checkboxes
  });

  // Clear the "Selected Expenses" section
  const addedExpensesList = document.getElementById('added-expenses-list');
  const selectedExpensesTotal = document.getElementById('selected-expenses-total');

  if (addedExpensesList) {
    addedExpensesList.innerHTML = ''; // Clear the list
  }

  if (selectedExpensesTotal) {
    selectedExpensesTotal.textContent = ''; // Clear the total amount
  }

  const addedExpensesSection = document.getElementById('added-expenses-section');
  if (addedExpensesSection) {
    addedExpensesSection.style.display = 'none'; // Hide the section
  }

  // Update button states
  updateSelectionButtons();
}




// Function to delete selected expenses
function deleteSelectedExpenses() {
  const selectedExpenses = document.querySelectorAll('.expense-item input:checked');
  selectedExpenses.forEach((checkbox) => checkbox.closest('.expense-item').remove());

  updateSelectionButtons();

  // Hide empty message if the list is empty
  const expenseList = document.getElementById('expense-list');
  if (expenseList.children.length === 0) {
    const emptyMessage = document.getElementById('empty-message');
    emptyMessage.style.display = 'block';
  }
}



// Helper function to create added expenses list
function createAddedExpensesList() {
  const container = document.getElementById('expenses-container');
  const addedExpensesList = document.createElement('div');
  addedExpensesList.id = 'added-expenses-list';
  addedExpensesList.classList.add('added-expenses-list');
  container.appendChild(addedExpensesList);
  return addedExpensesList;
}

// Helper function to create split button for added expenses
function createAddedExpensesSplitButton(totalAmount, expenseTitles) {
  const container = document.getElementById('expenses-container');
  const splitButton = document.createElement('button');
  splitButton.id = 'added-expenses-split-btn';
  splitButton.textContent = 'Split Added Expenses';
  splitButton.addEventListener('click', () => {
    showPage('splitexpenses');
    document.getElementById('total-amount').value = totalAmount.toFixed(2);
    
    // Optional: Add combined expense titles
    const expenseTitleDisplay = document.createElement('div');
    expenseTitleDisplay.innerHTML = `<strong>Expenses: ${expenseTitles.join(', ')}</strong>`;
    expenseTitleDisplay.style.marginBottom = '10px';
    
    const totalAmountInput = document.getElementById('total-amount');
    totalAmountInput.parentNode.insertBefore(expenseTitleDisplay, totalAmountInput);
  });
  
  container.appendChild(splitButton);
  return splitButton;
}

// Update existing event listeners to include checkbox change listener
window.addEventListener('load', () => {
  const expenseList = document.getElementById('expense-list');
  expenseList.addEventListener('change', function(e) {
    if (e.target.matches('.expense-checkbox')) {
      updateSelectionButtons();
    }
  });
});
  

  // Change Profile Picture
  function updateProfilePicture() {
    const fileInput = document.getElementById('profile-picture-input');
    const profilePicture = document.getElementById('profile-picture');
  
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profilePicture.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  
  function saveProfile() {
    const nameInput = document.getElementById('name-input').value.trim();
    const emailInput = document.getElementById('email-input').value.trim();
    const phoneInput = document.getElementById('phone-input').value.trim();
  
    if (!nameInput || !emailInput || !phoneInput) {
      alert('Please fill in all the fields.');
      return;
    }
  
    document.getElementById('profile-name-display').innerText = nameInput;
    document.getElementById('profile-email-display').innerText = emailInput;
  
    alert('Profile updated successfully!');
  }


  //Split_expense JS
  const friends = []; // Existing array, keep this

  // Modify the existing event listener for adding friends
  document.getElementById('add-friend-button').addEventListener('click', () => {
    const friendName = document.getElementById('friend-name').value.trim();
    const friendInfo = document.getElementById('friend-info').value.trim();
    const splitMethod = document.querySelector('input[name="splitMethod"]:checked').value;
    
    let friendBudget = null;
    if (splitMethod === 'budget-based') {
      friendBudget = parseFloat(document.getElementById('friend-budget').value) || 0;
      if (friendBudget <= 0) {
        alert('Please enter a valid budget.');
        return;
      }
    }
  
    if (!friendName || !friendInfo) {
      alert('Please enter both name and contact information.');
      return;
    }
  
    // Add friend as an object with optional budget
    friends.push({ 
      name: friendName, 
      contact: friendInfo, 
      budget: friendBudget 
    });
    
    updateFriendList(splitMethod);
    
    // Clear input fields
    document.getElementById('friend-name').value = '';
    document.getElementById('friend-info').value = '';
    if (splitMethod === 'budget-based') {
      document.getElementById('friend-budget').value = '';
    }
  });
  
  // Updated friend list rendering
  function updateFriendList(splitMethod) {
    const friendList = document.getElementById('friend-list');
    friendList.innerHTML = '';
    
    friends.forEach((friend, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <div class="friend-details">
          <strong>${friend.name}</strong>
          <span>${friend.contact}</span>
          ${splitMethod === 'budget-based' && friend.budget 
            ? `<span class="budget-display">Budget: ₹${friend.budget.toFixed(2)}</span>` 
            : ''}
        </div>
        <button onclick="removeFriend(${index})">Remove</button>
      `;
      friendList.appendChild(listItem);
    });
  }
    // Remove a friend from the list
    function removeFriend(index) {
      friends.splice(index, 1);
      updateFriendList();
    }

    function clearSplitResult() {
      const splitBreakdown = document.getElementById('split-breakdown');
      const result = document.getElementById('result');
    
      splitBreakdown.innerHTML = ''; // Clear split details
      result.classList.add('hidden'); // Hide the result section
    }
    
    
    const resultSection = document.getElementById('result');
let clearResultButton = document.getElementById('clear-split-result-btn');

if (!clearResultButton) {
  clearResultButton = document.createElement('button');
  clearResultButton.id = 'clear-split-result-btn';
  clearResultButton.textContent = 'Clear Split Result';
  clearResultButton.style.marginTop = '10px';
  clearResultButton.onclick = clearSplitResult;

  resultSection.appendChild(clearResultButton);
}



  
  // Modify split button event listener
  document.getElementById('split-button').addEventListener('click', () => {
    const totalAmount = parseFloat(document.getElementById('total-amount').value);
    const splitMethod = document.querySelector('input[name="splitMethod"]:checked').value;
    const splitBreakdown = document.getElementById('split-breakdown');
    const result = document.getElementById('result');
  
    if (!totalAmount || friends.length === 0) {
      alert('Please enter a valid amount and add at least one friend.');
      return;
    }
  
    result.classList.remove('hidden');
    splitBreakdown.innerHTML = ''; // Clear previous results
  
    const amountPerPerson = (totalAmount / friends.length).toFixed(2);
  
    friends.forEach((friend, index) => {
      const breakdownItem = document.createElement('div');
      breakdownItem.classList.add('split-breakdown-item');
  
      breakdownItem.innerHTML = `
        <div>
          <strong>${friend.name}</strong><br>
          ${splitMethod === 'budget-based' && friend.budget !== null 
            ? `<small>Budget: ₹${friend.budget.toFixed(2)}</small><br>` 
            : ''}
          <small>Owes: ₹${amountPerPerson}</small>
        </div>
        <div class="friend-actions">
          <button onclick="sendWhatsAppMessage('${friend.name}', '${amountPerPerson}', '${friend.contact}')">WhatsApp</button>
          <button onclick="sendSMSMessage('${friend.name}', '${amountPerPerson}', '${friend.contact}')">SMS</button>
          <button>Pay</button>
        </div>
      `;
      splitBreakdown.appendChild(breakdownItem);
    });
  
    const saveSection = document.createElement('div');
    saveSection.classList.add('save-section');
    saveSection.innerHTML = `
      <input type="text" id="split-name" placeholder="Enter a name for this split" />
      <button onclick="saveSplitResult()">Save Split</button>
    `;
    splitBreakdown.appendChild(saveSection);
  });
  
  
  
  
  // Add event listener for split method radio buttons
  document.querySelectorAll('input[name="splitMethod"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      const budgetInput = document.querySelector('.budget-input');
      if (e.target.value === 'budget-based') {
        budgetInput.style.display = 'block';
      } else {
        budgetInput.style.display = 'none';
      }
      // Reset friend list display
      updateFriendList(e.target.value);
    });
  });
  

  
  // Theme toggle functionality
const themeSelect = document.getElementById('theme-select');

// Apply saved theme on page load
window.addEventListener('load', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.classList.toggle('dark-theme', savedTheme === 'dark');
  themeSelect.value = savedTheme;
});

// Change theme dynamically
themeSelect.addEventListener('change', () => {
  const selectedTheme = themeSelect.value;
  document.body.classList.toggle('dark-theme', selectedTheme === 'dark');
  localStorage.setItem('theme', selectedTheme); // Save preference
});

const splitMethodSelect = document.getElementById('split-method-select');

// Ensure the Split Expenses page reflects the default split method
window.addEventListener('load', () => {
  const savedSplitMethod = localStorage.getItem('defaultSplitMethod') || 'standard';
  document.querySelector(`input[name="splitMethod"][value="${savedSplitMethod}"]`).checked = true;
});


// Save the default split method when the user selects it
splitMethodSelect.addEventListener('change', () => {
  const selectedMethod = splitMethodSelect.value;
  localStorage.setItem('defaultSplitMethod', selectedMethod);
  alert(`Default split method changed to: ${selectedMethod === 'standard' ? 'Standard Split' : 'Budget-Based Split'}`);
});

//Payment Javascript
// Function to format card number with spaces
function formatCardNumber(input) {
  let value = input.value.replace(/\D/g, ''); // Remove non-numeric characters
  if (value.length <= 16) {
      value = value.replace(/(\d{4})(?=\d)/g, '$1 '); // Insert spaces after every 4 digits
  }
  input.value = value;
}

function formatExpiryMonth(input) {
  let value = input.value.replace(/\D/g, ''); // Remove non-numeric characters
  if (value.length > 4) {
      value = value.slice(0, 4); // Limit input to 4 digits
  }
  if (value.length > 2) {
      value = value.replace(/(\d{2})(\d{1,2})/, '$1 / $2'); // Insert " / " after the first 2 digits
  }
  input.value = value;
}

document.querySelector('.menu-btn').addEventListener('click', function() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('active');
});

function sendWhatsAppMessage(name, amount, phoneNumber) {
  const message = `Hi ${name}, you have a pending payment of ₹${amount}. Please settle it soon.`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
}

function sendSMSMessage(name, amount, phoneNumber) {
  const message = `Hi ${name}, you have a pending payment of ₹${amount}. Please settle it soon.`;
  const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
  window.location.href = smsUrl;
}

function markAsPaid(friendIndex) {
  const friendDetails = document.querySelectorAll('.split-breakdown-item')[friendIndex];
  const paidStatus = friendDetails.querySelector('.paid-status');
  
  if (!paidStatus) {
    const paidMessage = document.createElement('span');
    paidMessage.classList.add('paid-status');
    paidMessage.textContent = 'Paid ✅';
    friendDetails.appendChild(paidMessage);
  }
}

function saveSplitResult() {
  const splitName = document.getElementById('split-name').value.trim();
  if (!splitName) {
    alert('Please provide a name for the split.');
    return;
  }

  const splitBreakdown = document.getElementById('split-breakdown').innerHTML;
  const savedSplits = JSON.parse(localStorage.getItem('savedSplits') || '[]');

  savedSplits.push({ name: splitName, details: splitBreakdown });
  localStorage.setItem('savedSplits', JSON.stringify(savedSplits));

  alert('Split result saved successfully!');
  document.getElementById('split-name').value = '';
}

function viewSavedSplits() {
  const savedSplitsContainer = document.getElementById('saved-splits-container');
  const savedSplitsList = document.getElementById('saved-splits-list');
  savedSplitsList.innerHTML = ''; // Clear previous content

  if (savedSplits.length === 0) {
    savedSplitsList.innerHTML = '<p>No saved splits available.</p>';
  } else {
    savedSplits.forEach((split, index) => {
      const splitDiv = document.createElement('div');
      splitDiv.classList.add('split-detail-item');
      splitDiv.innerHTML = `
        <h3>${split.name || `Split #${index + 1}`}</h3>
        <div>${split.details}</div>
      `;
      savedSplitsList.appendChild(splitDiv);
    });
  }

  savedSplitsContainer.style.display = 'block';
}

function closeSavedSplits() {
  document.getElementById('saved-splits-container').style.display = 'none';
}


// Show Split History in Settings
function viewSplitHistory() {
  const splitHistoryContainer = document.getElementById('split-history-container');
  const splitHistoryList = document.getElementById('split-history-list');
  splitHistoryList.innerHTML = ''; // Clear previous content

  if (splitHistory.length === 0) {
    splitHistoryList.innerHTML = '<p>No split history available.</p>';
  } else {
    splitHistory.forEach((history, index) => {
      const historyDiv = document.createElement('div');
      historyDiv.classList.add('split-detail-item');
      historyDiv.innerHTML = `
        <h3>Split #${index + 1}</h3>
        <div>${history.details}</div>
      `;
      splitHistoryList.appendChild(historyDiv);
    });
  }

  splitHistoryContainer.style.display = 'block';
}

function closeSplitHistory() {
  document.getElementById('split-history-container').style.display = 'none';
}


// Update Split Button Listener to Save Split History
document.getElementById('split-button').addEventListener('click', () => {
  const splitBreakdown = document.getElementById('split-breakdown').innerHTML;
  const splitHistory = JSON.parse(localStorage.getItem('splitHistory') || '[]');
  
  splitHistory.push(splitBreakdown);
  localStorage.setItem('splitHistory', JSON.stringify(splitHistory));
});

function pay(){
      alert("Payment Successful! Thank you for using Smart Split.");
}


//ChatBox Script
function sendMessage() {
  const messageInput = document.getElementById("message");
  const message = messageInput.value.trim();
  if (message) {
      const messagesDiv = document.getElementById("messages");
      const newMessage = document.createElement("div");
      newMessage.className = "message self";
      newMessage.textContent = message;
      messagesDiv.appendChild(newMessage);
      messageInput.value = "";
      messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to the latest message
  }
}

// function redirectToExpenseSplitter() {
//     window.location.href = "expense-splitter.html"; // Replace with your actual expense splitter page URL
// }
