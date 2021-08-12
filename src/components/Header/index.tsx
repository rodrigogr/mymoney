import logoImg from '../../assets/logo.svg'
import { Container, Content } from './styles'

interface HeaderProps{
    onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }: HeaderProps){ //props
    return (
         <Container>
             <Content>
                <img src={logoImg} alt="my money"></img>
                <button type="button" onClick={onOpenNewTransactionModal}>
                    Nova Transação
                </button>
             </Content>
         </Container>
    )
}