import { Button as Base } from 'rebass'
import styled from 'styled-components'

interface ButtonProps {
    color?: string
}

const Button = styled(Base)<ButtonProps>`
    ${props => (props.color ? `color: ${props.color};` : null)}
`

export default (props:any) => (
    <Button {...props}>
        {props.children}
    </Button>
)