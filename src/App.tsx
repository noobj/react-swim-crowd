import { useEffect, useReducer, useState } from 'react';
import { format, subDays } from 'date-fns';
import ControlPanel from './components/ControlPanel';
import { MainContent } from './components/MainContent';

const initialState = {
  start: format(subDays(new Date(), 3), 'yyyy-MM-dd HH:mm'),
  end: format(new Date(), 'yyyy-MM-dd HH:mm')
};

function reducer(state: {start: string, end: string}, action: {isStart: boolean, value: string}) {
  switch (action.isStart) {
    case true:
      return {...state, start: action.value};
    case false:
      return {...state, end: action.value};
    default:
      return state;
  }
}

export function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [start, setStart] = useState(format(subDays(new Date(), 3), 'yyyy-MM-dd HH:mm'));
  // const [end, setEnd] = useState(format(new Date(), 'yyyy-MM-dd HH:mm'));
  const [response, setResponse] = useState([]);

  useEffect(() => {
    async function fetchEntries() {
      const params = new URLSearchParams();
      params.set('start', state.start);
      params.set('end', state.end);
      const backendUrl = 'https://04xkzdmmq6.execute-api.ap-southeast-1.amazonaws.com/crowd/daily';

      const res = await fetch(`${backendUrl}?${params.toString()}`);
      if (res.status === 401) {
        return null;
      }
      const data = await res.json();
      return { data };
    }

    async function fetchContent() {
      const result = await fetchEntries();
      if (result === null) return;

      const { data } = result;
      setResponse(data);
    }

    fetchContent();
  }, [state]);

  const changeHandler = async (isStart: boolean, dateStr: string) => {
    dispatch({ isStart, value: dateStr})
  };

  return (
    <>
      <ControlPanel start={state.start} end={state.end} changeHandler={changeHandler} />
      <MainContent data={response}/>
    </>
  );
}
