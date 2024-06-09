import axios from 'axios';
 
class UsersService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL || 'http://localhost:5005'
    });
 
    
    this.api.interceptors.request.use(config => {

      const storedToken = localStorage.getItem('authToken');
 
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
 
      return config;
    });
  };

  //POST add friends to user friends array & mutual friendship
  addFriend = requestBody => {
    return this.api.post(`/api/users/friends`, requestBody);
  };

  //GET all users
  getAllUsers = () => {
    return this.api.get('/api/users');
  };

  //GET user by id
  getUser = id => {
    return this.api.get(`/api/users/${id}`);
  };

  //GET all friends of user by id
  getAllFriends = () => {
    return this.api.get(`/api/users/friends`);
  };

  //GET all groups in common between all users involved in expense
  getCommonGroups = requestBody => {
    return this.api.post('/api/users/groups/common', requestBody);
  };

  //PUT user by id
  updateUser = (id, requestBody) => {
    return this.api.put(`/api/users/${id}`, requestBody);
  };

  //DELETE friend from friends
  deleteFriend = id => {
    return this.api.delete(`/api/users/friends/${id}`)
  }

  //DELETE user by id
  deleteUser = id => {
    return this.api.delete(`/api/users/${id}`);
  };
}

const usersService = new UsersService();

export default usersService;