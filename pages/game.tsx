import { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'

import Flex from '../components/Flex'
import Button from '../components/Button'
import StatsBox from '../components/StatsBox'

interface GameProps {
    remaining: string
    deckId: string
}

interface DrawnCardModel {
    image: string
    value: string
    suit: string
    code: string
}

const Game = (props:GameProps) => {
    const [ remaining, setRemaining ] = useState(props.remaining)
    const [ deckId, setDeckId ] = useState(props.deckId)
    const [ drawnCard, setDrawnCard ] = useState<DrawnCardModel>({
        image: '',
        value: '',
        suit: '',
        code: ''
    })
    const [ score, setScore ] = useState(0)
    const [ mistakes, setMistakes ] = useState(0)
    const [ mode, setMode ] = useState('color')
    const [ remainingRed, setRemainingRed ] = useState(26)
    const [ remainingBlack, setRemainingBlack ] = useState(26)

    useEffect(() => {
        // console.log('mounted')

    }, [])

    //TODO: add a return TYPE to this
    const drawCard = async ():Promise<any> => {
        const res:any = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        const data:any = await res.json()

        return data
    }

    const sendCardToDiscard = async (drawnCard:string, pileName:string):Promise<object> => {
        const res:any = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/pile/${pileName}/add/?cards=${drawnCard}`)
        const data:object = await res.json()
        return data
    }

    const displayPile = async (pileName:string):Promise<object> => {
        const res:any = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/pile/${pileName}/list`)
        const data:object = await res.json()
        return data
    }

    const calculateScore = ():void => setScore(score + 1)

    const calculateMistake = ():void => setMistakes(mistakes + 1)

    const resetGame = () => {}

    const chooseColorAndDetermineResult = (suit:string, color:string):boolean => {
        // get color of drawn card
        let colorOfDrawnCard:string = 'red'
        if (suit === 'HEARTS' || suit === 'DIAMONDS') {
            colorOfDrawnCard = 'red'
            setRemainingRed(remainingRed - 1)
        }
        if (suit === 'SPADES' || suit === 'CLUBS') {
            colorOfDrawnCard = 'black'
            setRemainingBlack(remainingBlack - 1)
        }

        return color === colorOfDrawnCard
    }

    const play = async (color:string):Promise<void> => {
        // check remaining cards, if => 26 change to high/low
        if (Number(remaining) <= 26) {
            setMode('number')
        }
        // draw card
        const cardDraw = await drawCard()
        // check if color is right or right
        const answer:boolean = chooseColorAndDetermineResult(cardDraw.cards[0].suit, color)
        setRemaining(cardDraw.remaining)
        setDrawnCard(cardDraw.cards[0])
        // add to score and mistakes
        answer ? calculateScore() : calculateMistake()
        // add drawn card to discard pile
        await sendCardToDiscard(drawnCard.code, 'discard')
    }

    return (
        <Flex
            height="100vh"
            bg="primary"
            flexDirection="column"
            center
        >
            <>
                <StatsBox
                    remaining={remaining}
                    lastDrawn={drawnCard.code}
                    lastDrawnImage={drawnCard.image}
                    score={score}
                    mistakes={mistakes}
                    remainingBlack={remainingBlack}
                    remainingRed={remainingRed}
                />
                <div>
                    <Button onClick={():Promise<void> => play('red')}>Red</Button>
                    <Button onClick={():Promise<void> => play('black')}>Black</Button>
                </div>
            </> 
        </Flex>
    )
}

Game.getInitialProps = async ():Promise<{remaining: string, deckId: string}> => {
    const res:any = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    const data = await res.json()
    console.log(data)
    // TODO: have to check for success flag
    return { remaining: data.remaining, deckId: data.deck_id }
}

export default Game