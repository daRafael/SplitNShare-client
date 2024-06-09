import axios from 'axios';
 
class GroupsService {
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

  //POST group
  createGroup = requestBody => {
    return this.api.post('/api/groups', requestBody);
  };

  //GET all groups where user is a member or owner
  getAllGroups = () => {
    return this.api.get('/api/groups');
  };

  //GET all groups where user is an owner
  getOwnerAllGroups = () => {
    return this.api.get('/api/groups/owner');
  };

  //GET all groups where user is member
  getMemberAllGroups = () => {
    return this.api.get('/api/groups/member');
  };

  //GET group by id
  getGroup = id => {
    return this.api.get(`api/groups/${id}`)
  };

  //PUT group by id
  updateGroup = (id, requestBody) => {
    return this.api.put(`/api/groups/${id}`, requestBody);
  };

  //DELETE group by id
  deleteGroup = id => {
    return this.api.delete(`/api/groups/${id}`);
  };

}

const groupsService = new GroupsService();

export default groupsService;