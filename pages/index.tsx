import Link from 'next/link'
import Flex from '../components/Flex'
import Button from '../components/Button'

export default () => (
    <Flex
        center
        height="100vh"
        bg="primary"
    >
        <Flex
            p={2}
            color="primary"
            flexDirection="column"
        >
            <h1 style={{ color: 'black' }}>Card Game</h1>
            <Link href="/game">
                <Button my={1}>Start</Button>
            </Link>
            <Button>How to Play</Button>
        </Flex>
    </Flex>
)
