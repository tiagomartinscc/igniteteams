import { Container, Logo } from './styles'
import logoImg from '@assets/logo.png'
import { CaretLeft } from 'phosphor-react-native'

export function Header() {
  
  return (
    <Container>
      <CaretLeft color='#fff' size={32} />
      <Logo source={logoImg} />
    </Container>
  )
}