import { Container } from "./styles";
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { TransactionsContext } from "../../TransactionsContext";
import { useContext } from "react";



export function Summary() {
    const transactions = useContext(TransactionsContext)

    console.log(transactions)

    return(
        <Container>
            <div>
                <p>Entradas</p>
                <img src={incomeImg} alt="" />
                <strong>R$1000,00</strong>
            </div>
            <div>
                <p>Saidas</p>
                <img src={outcomeImg} alt="" />
                <strong>- R$500,00</strong>
            </div>
            <div className="highlight-background">
                <p>Total</p>
                <img src={totalImg} alt="" />
                <strong>R$500,00</strong>
            </div>
        
        </Container>
        
    )
}