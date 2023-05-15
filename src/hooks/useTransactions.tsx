import { ReactNode, createContext, useContext, useEffect, useState} from 'react'
import { api } from '../services/api';



interface ITransaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}


type TransactionInput = Omit<ITransaction, 'id' | 'createdAt'>

interface ITransctionsProviderProps {
    children: ReactNode
}
interface ITransactionsContextData {
    transactions: ITransaction[];
    createTransaction: (transaction: TransactionInput) => Promise<ITransaction>;
}

const TransactionsContext = createContext<ITransactionsContextData>(
    {} as ITransactionsContextData
    );

export function TransactionsProvider({children}: ITransctionsProviderProps) {
    
    const [transactions, setTransactions] = useState<ITransaction[]>([])

    useEffect(()=>{
        api.get('/transactions')
            .then(response => setTransactions(response.data.transactions))
    },[])

    async function createTransaction(transactionInput: TransactionInput): Promise<ITransaction>{
        const response = await api.post('/transactions', {...transactionInput, createdAt: new Date()})
        const {transaction} = response.data

        setTransactions([
            ...transactions,
            transaction
        ])

        return transaction
    }


    return(
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions(){
    const context = useContext(TransactionsContext);

    return context;
}