import React from 'react';
import ReactDOM from 'react-dom/client';
import {Model, createServer} from 'miragejs'
import { App } from './App';

createServer({
  models: {
    transaction: Model
  },
  seeds(server){
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelancer de website',
          type: 'deposit',
          amount: 12000,
          category: 'Desenvolvimento',
          createdAt: new Date('2023-05-11 20:38:00')
        },
        {
          id: 2,
          title: 'Internet',
          type: 'withdraw',
          amount: 500,
          category: 'Contas',
          createdAt: new Date('2023-05-11 20:38:00')
        }
      ]
    })
  },
  routes() {
    this.namespace = 'api';
    this.get('/transactions', () => {

      return this.schema.all('transaction')
    })
    
    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data)
    })
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
