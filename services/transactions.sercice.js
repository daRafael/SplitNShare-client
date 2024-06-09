import axios from 'axios';
 
class TransactionsService {
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

  //GET all transactions for a given payer
  getAllPayerTransactions = () => {
    return this.api.get('/api/transactions/payer');
  };

  //GET all transactions for payee
  getAllPayeeTransactions = () => {
    return this.api.get('/api/transactions/payee');
  };

  //GET transaction by id
  getTransaction = id => {
    return this.api.get(`/api/transactions/${id}`);
  };

  //PUT transaction by id
  updateTransaction = (id, requestBody) => {
    return this.api.put(`/api/transactions/${id}`, requestBody);
  };
}

const transactionsService = new TransactionsService();

export default transactionsService;