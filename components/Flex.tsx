import { Flex as Base } from 'rebass'
import styled from 'styled-components'

interface FlexProps {
    boxShadow?: string
    height?: string
    center?: boolean
    border?: string
}

const Flex = styled(Base)<FlexProps>`
    ${props => (props.boxShadow ? `box-shadow: ${props.boxShadow};` : null)}
    ${props => (props.height ? `height: ${props.height};` : null)}
    ${props => (props.center ? `justify-content: center; align-items: center;` : null)}
    ${props => (props.border ? `border: ${props.border};` : null)}
`

export default (props:any) => (
    <Flex {...props}>
        {props.children}
    </Flex>
)
