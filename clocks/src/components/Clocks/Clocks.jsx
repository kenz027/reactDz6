import Clock from "../Clock/Clock";

export default function Clocks(props){
    const {clocksDataList} = props;
    return (
        <ul className="clocks">
            {clocksDataList.map(clock=>(
                <Clock key={clock.id} name={clock.name} timeZone={clock.timeZone} />
            ))}
        </ul>
    )
}