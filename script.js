function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    if (sidebar.style.left === '0px') {
      sidebar.style.left = '-250px';
      mainContent.style.marginLeft = '0';
    } else {
      sidebar.style.left = '0';
      mainContent.style.marginLeft = '250px';
    }
  }
  
  //Section Styling
  function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
      page.style.display = 'none'; // Hide all pages
    });
    document.getElementById(pageId).style.display = 'block'; // Show the selected page
  }

  //Expense Styling
  function addExpense() {
    const title = document.getElementById('expense-title').value;
    const amount = document.getElementById('expense-amount').value;
  
    if (title === '' || amount === '') {
      alert('Please fill in both fields.');
      return;
    }
  
    // Create a new expense item
    const expenseItem = document.createElement('div');
    expenseItem.classList.add('expense-item');
    expenseItem.innerHTML = `
      <span>${title}</span>
      <span class="amount">₹${parseFloat(amount).toFixed(2)}</span>
    `;
  
    // Add the expense item to the list
    const expenseList = document.getElementById('expense-list');
    expenseList.appendChild(expenseItem);
  
    // Show the empty message if there are no expenses
    const emptyMessage = document.getElementById('empty-message');
    if (expenseList.children.length > 0) {
      emptyMessage.style.display = 'none';
    }
  
    // Clear the form fields
    document.getElementById('expense-title').value = '';
    document.getElementById('expense-amount').value = '';
  }
  
  // Display a message if the list is empty when the page loads
  window.addEventListener('load', () => {
    const expenseList = document.getElementById('expense-list');
    if (expenseList.children.length === 0) {
      const emptyMessage = document.getElementById('empty-message');
      emptyMessage.style.display = 'block';
    }
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
  const friends = []; // Array to store friend info

  // Add friend event
  document.getElementById('add-friend-button').addEventListener('click', () => {
    const friendName = document.getElementById('friend-name').value.trim();
    const friendInfo = document.getElementById('friend-info').value.trim();
  
    if (!friendName || !friendInfo) {
      alert('Please enter both name and contact information.');
      return;
    }
  
    // Add friend as an object
    friends.push({ name: friendName, contact: friendInfo });
    updateFriendList();
    document.getElementById('friend-name').value = ''; // Clear inputs
    document.getElementById('friend-info').value = '';
  });
  
  // Update the friend list in the UI
  function updateFriendList() {
    const friendList = document.getElementById('friend-list');
    friendList.innerHTML = '<h2>👥 Friends List</h2>';
    friends.forEach((friend, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <div class="friend-details">
          <strong>${friend.name}</strong>
          <span>${friend.contact}</span>
        </div>
        <button onclick="removeFriend(${index})">Remove</button>
      `;
      friendList.appendChild(listItem);
    });
    friendList.classList.remove('hidden');
  }
  
  // Remove a friend from the list
  function removeFriend(index) {
    friends.splice(index, 1);
    updateFriendList();
  }
  
  // Split expense event
  document.getElementById('split-button').addEventListener('click', () => {
    const totalAmount = parseFloat(document.getElementById('total-amount').value);
  
    if (!totalAmount || friends.length === 0) {
      alert('Please enter a valid amount and add at least one friend.');
      return;
    }
  
    const amountPerPerson = (totalAmount / friends.length).toFixed(2);
    document.getElementById('amount-per-person').textContent = `₹${amountPerPerson}`;
    document.getElementById('result').classList.remove('hidden');
  });
  