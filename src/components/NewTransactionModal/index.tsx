import Modal from 'react-modal'
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { useState } from 'react';

Modal.setAppElement('#root')

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps) {

    const [type, setType] = useState('withdraw') ;

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

                <Container> 
                    <h2>Cadastrar Transação</h2>

                    <input  placeholder='Titulo' />
                    <input type="number" placeholder='Valor' />
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
                    <input  placeholder='Categoria' />
                    <button type="submit"> Cadastrar</button>
                </Container>
            </Modal>
    )
}