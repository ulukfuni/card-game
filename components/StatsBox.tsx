import Image from './Image'

interface StatsBoxProps {
    remaining: string
    lastDrawn: string
    score: number
    mistakes: number
    remainingRed: number
    remainingBlack: number
    lastDrawnImage: string
}
export default (props:StatsBoxProps) => (
    <>
        <div>in deck: {props.remaining}</div>
        <div>last drawn: {props.lastDrawn} {props.lastDrawnImage && <Image src={props.lastDrawnImage} />}</div>
        <div>score: {props.score}</div>
        <div>mistakes: {props.mistakes}</div>
        <div>red: {Math.round(props.remainingRed / Number(props.remaining) * 100)}%</div>
        <div>black: {Math.round(props.remainingBlack / Number(props.remaining) * 100)}%</div>
    </>
)