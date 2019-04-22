import { Image as Base } from 'rebass'
import styled from 'styled-components'

interface ImageProps {
    src: string
    boxShadow?: string
}

const Image = styled(Base)<ImageProps>`
    ${props => (props.boxShadow ? `box-shadow: ${props.boxShadow};` : null)}
`

export default (props:any) => (
    <Image {...props} />
)