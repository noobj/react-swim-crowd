import { SyntheticEvent, useContext } from "react";
import { format, startOfWeek, endOfWeek, sub, add } from 'date-fns';
import { DateContext } from '../../App';

export function WeekButton(props: {isLast: boolean}) {
  const color = props.isLast ? 'lime' : 'indigo';
  const dateContext = useContext(DateContext);

  const handleClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    const baseDate = props.isLast ? sub(new Date(dateContext.state.start), {days: 7}) : add(new Date(dateContext.state.start), {days: 7});

    const start = format(startOfWeek(baseDate, {weekStartsOn: 1}), 'yyyy-MM-dd');
    const end = format(endOfWeek(baseDate, {weekStartsOn: 1}), 'yyyy-MM-dd');

    dateContext.dispatch({isStart: true, value: start});
    dateContext.dispatch({isStart: false, value: end});
  };

  return (
    <>
      <button onClick={handleClick} className={`rounded-lg font-semibold text-l ml-3 p-1 bg-${color}-500 hover:bg-${color}-600`}>
        {props.isLast ? 'Last Week' : 'Next Week'}
      </button>
    </>
  )
}
