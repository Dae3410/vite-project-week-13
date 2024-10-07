import "bootstrap/dist/css/bootstrap.min.css";

import "./style.css";

type User = {
  id: string;
  location: string;
  pic: string;
  pricePerDay: number;
  isVerified: boolean;
};

let url = 'http://localhost:3000/users';


class AirDnd {
  users: User[] = []; // Corrected to define users as an array of User
  url: string = 'http://localhost:3000/users'; // Directly set the URL here

  constructor() {
      this.fetchUsers();
  }

  async fetchUsers() {
    try {
      const res = await fetch('/db.json'); // Fetching from the public directory
      if (!res.ok) throw new Error('Failed to fetch users');
  
      const data = await res.json();
      this.users = data.users;
      this.renderUserCards();
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  

  async deleteUser(userId: string) {
      try {
          const res = await fetch(`${this.url}/${userId}`, {
              method: 'DELETE'
          });
          if (res.ok) {
              // Remove the user
              this.users = this.users.filter(user => user.id !== userId);
              this.renderUserCards();
          } else {
              console.error('Error deleting user:', res.statusText);
          }
      } catch (error) {
          console.error('Error:', error);
      }
  }

  renderUserCards() {
      const container = document.getElementById('users');
      if (container) {
          container.innerHTML = '';

          for (const user of this.users) {
              // Creating user cards
              const card = document.createElement('div');
              const pic = document.createElement('img');
              const info = document.createElement('h3');
              const deleteButton = document.createElement('button'); // Delete button

              // Modifying 
              const verified = user.isVerified ? '✅' : '';
              pic.src = user.pic;
              
              info.innerText = `${user.location} - $${user.pricePerDay}/day ${verified}`;
              pic.setAttribute('class', 'userPic');
              card.setAttribute('class', 'card');

              // Setting up the delete button
              deleteButton.innerText = 'Delete';
              deleteButton.onclick = () => this.deleteUser(user.id);

              // Append elements to the card
              card.append(pic, info, deleteButton);
              container.append(card);
          }
      }
  }
}

// Instantiate AirDnd to see all options
const airDnd = new AirDnd();