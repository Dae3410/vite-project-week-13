
type User = {
    id: string;
    location: string;
    pic: string;
    pricePerDay: number;
    isVerified: boolean;
  };
  
  export function UserCard(user: User, deleteUser: (id: string) => void) {
    const verified = user.isVerified ? '✅' : '';
    return `
      <div class="card">
        <img src="${user.pic}" class="userPic" />
        <h3>${user.location} - $${user.pricePerDay}/day ${verified}</h3>
        <button onclick="(${deleteUser})(\'${user.id}\')">Delete</button>
      </div>
    `;
  }
  