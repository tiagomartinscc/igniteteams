import { Container, ButtonIconTypeStyleProps, Icon } from "./styles";
import { TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
  type?: ButtonIconTypeStyleProps
}

export function ButtonIcon ({type = 'PRIMARY'}: Props) {
  return (
    <Container>
      <Icon name="home" type={type}  />
    </Container>
  )
}