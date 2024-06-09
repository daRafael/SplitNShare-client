import axios from 'axios'

class ExpensesService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL || 'http://localhost:5005'
    });

    this.api.interceptors.request.use(config => {
      
      const storedToken =  localStorage.getItem('authToken');

      if(storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  //POST /api/expenses
  createExpense = requestBody => {
    return this.api.post('/api/expenses', requestBody);
  }

  //POST expense in group
  createGroupExpense = (id, requestBody) => {
    return this.api.post(`/api/expenses/group/${id}`, requestBody)
  }

  //GET /api/expenses (getting expenses where user is involved)
  getAllExpenses = () => {
    return this.api.get('/api/expenses');
  }

  //GET /api/expenses/paid (getting expenses where user paid)
  getAllPaidExpenses = () => {
    return this.api.get('/api/expenses/paid');
  }

  //GET /api/expenses/split (getting expenses where user didn't pay)
  getAllSplitExpenses = () => {
    return this.api.get('/api/expenses/split');
  }

  //GET expense by id
  getExpense = id => {
    return this.api.get(`/api/expenses/${id}`);
  }

  //PUT expense by id
  updateExpense = (id, requestBody) => {
    return this.api.put(`/api/expenses/${id}`, requestBody);
  }

  //DELETE expense by id
  deleteExpense = id => {
    return this.api.delete(`/api/expenses/${id}`)
  }
}

const expensesService = new ExpensesService();

export default expensesService;