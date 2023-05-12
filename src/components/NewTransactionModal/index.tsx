import Modal from 'react-modal'
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { FormEvent, useState, useContext } from 'react';
import { api } from '../../services/api';
import { TransactionsContext } from '../../TransactionsContext';


Modal.setAppElement('#root')

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps) {

    const [title, setTitle] = useState('') ;
    const [amount, setAmount] = useState(0) ;
    const [category, setCategory] = useState('') ;
    const [type, setType] = useState('withdraw') ;

    const {createTransaction} = useContext(TransactionsContext)

    function handleCreateNewTransaction(event: FormEvent){
        event.preventDefault();
        
        createTransaction({
            title, 
            amount, 
            category, 
            type
        })
    }

    return (
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                overlayClassName="react-modal-overlay"
                className="react-modal-content"
            >
                <button 
                    type='button'
                    onClick={onRequestClose} 
                    className='react-modal-close'
                >
                    <img src={closeImg} alt="close" />
                </button>

                <Container onSubmit={handleCreateNewTransaction}> 
                    <h2>Cadastrar Transação</h2>

                    <input  
                        placeholder='Titulo'
                        value={title} 
                        onChange={event => setTitle(event.target.value)}
                    />
                    <input 
                        type="number" 
                        placeholder='Valor' 
                        value={amount}
                        onChange={event => setAmount(Number(event.target.value))}
                    />
                    <TransactionTypeContainer>
                        <RadioBox 
                            type='button' 
                            isActive={type === 'deposit'}
                            onClick={() => {setType('deposit'); }}
                            activeColor="green"                            
                        >
                            <img src={incomeImg} alt="" />
                            <span>Entrada</span>
                        </RadioBox>
                        <RadioBox 
                            type='button' 
                            isActive={type === 'withdraw'}
                            onClick={() => {setType('withdraw'); }}
                            activeColor="red"
                        >
                            <img src={outcomeImg} alt="" />
                            <span>Saida</span>
                        </RadioBox>
                    </TransactionTypeContainer>
                    <input  
                        placeholder='Categoria'
                        value={category} 
                        onChange={event => setCategory(event.target.value)}
                        />
                    <button type="submit"> Cadastrar</button>
                </Container>
            </Modal>
    )
}