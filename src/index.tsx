import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { createServer, Model } from 'miragejs';

createServer({
    //Banco de dados interno do Mirage
    //Nesse caso declaramos uma proriedade models, poderia ser outro nome
    //O tipo Model é a tabela(entidade do mirage)
    //Nesse caso demos o nome de transaction
    models: {
      transaction: Model,
    },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelancer Website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2021-10-10 10:10:00')
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 1100,
          createdAt: new Date('2021-10-10 10:10:00')
        }
      ],
    })
},

    routes(){
      this.namespace = 'api';
      this.get('/transactions', () => {
        //retorna todas as transaction que tem no banco de dados
        return this.schema.all('transaction')
      })
      this.post('/transactions', (schema, request)=>{
        const data = JSON.parse(request.requestBody)
        //schema é o banco de dados
        //create é o método que persiste no banco
        //1º parâmetro: model que está inserindo
        //2º parâmetro: dados que quero passar
        return schema.create('transaction', data) 
      })
    }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);