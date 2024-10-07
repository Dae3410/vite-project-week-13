

export async function fetchUsers() {
    try {
      const res = await fetch('/db.json');
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();
      return data.users;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }
  