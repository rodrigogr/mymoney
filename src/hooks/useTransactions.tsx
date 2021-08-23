import { createContext, ReactNode, useEffect, useState, useContext } from "react";
import { api } from "../services/api";

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}
//Outras formas ao invés de interface 
//*********Omitindo valores*************
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;
//*********Selecionando valores*********
// type TransactionInput = Pick<Transaction, 'title' | 'amount' |  'type' | 'category'>;

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput)=> Promise<void>;
}

// Para permitir que esse componente receba conteúdo dentro (children), 
// precisamos declarar uma interface e passar pra dentro do provider.
interface TransactionsProviderProps {
    children: ReactNode; //ReactNode aceita qualquer conteúdo válido do React.
}

const TransactionsContext = createContext<TransactionsContextData>(
    //Fazendo essa conversão, enganamos o typeScript falando que ele é de um 
    // tipo, nesse caso TransactionContextData
    {} as TransactionsContextData
);

export function TransactionProvider({children} : TransactionsProviderProps){
    const [transactions, setTrasactions] = useState<Transaction[]>([])
    useEffect(() => {
        api.get('http://localhost:3000/api/transactions')
            .then(response => setTrasactions(response.data.transactions))
    }, []);

//Tranformando em função assíncrona que retorna uma promise
async function createTransaction(transactionInput: TransactionInput){
    const response = await api.post('/transactions', {
        ...transactionInput,
        createdAt: new Date()
    });
    const { transaction } = response.data;
    await api.post('/transactions', transaction)   
    
    setTrasactions([
        ...transactions,
        transaction,
    ]);
}
return (
// Quando o retorno é mais de um valor, é necessário que seja válido como uma 
// variável javascript, nesse caso um objeto {}. 
    <TransactionsContext.Provider value={{transactions, createTransaction}}>
        {children}
    </TransactionsContext.Provider>
);
}

export function useTransactions(){
    const context = useContext(TransactionsContext);
    return context;
}