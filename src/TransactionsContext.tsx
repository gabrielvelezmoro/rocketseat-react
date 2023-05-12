import { ReactNode, createContext, useEffect, useState} from 'react'
import { api } from './services/api';


export const TransactionsContext = createContext<ITransaction[]>([]);

interface ITransaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

interface ITransctionsProviderProps {
    children: ReactNode
}

export function TransactionsProvider({children}: ITransctionsProviderProps) {
    
    const [transactions, setTransactions] = useState<ITransaction[]>([])

    useEffect(()=>{
        api.get('/transactions')
            .then(response => setTransactions(response.data.transactions))
    },[])

    return(
        <TransactionsContext.Provider value={transactions}>
            {children}
        </TransactionsContext.Provider>
    )
}