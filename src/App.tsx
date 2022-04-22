import { createContext, useEffect, useReducer, useState } from 'react';
import { format, subDays } from 'date-fns';
import { ControlPanel } from './components/controlPanel/ControlPanel';
import { MainContent } from './components/content/MainContent';

type InitialStateType = {
  start: string;
  end: string;
}

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

export const DateContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null
});

export function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
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

  return (
    <>
      <DateContext.Provider value={{state, dispatch}}>
        <ControlPanel/>
      </DateContext.Provider>
      <MainContent data={response}/>
    </>
  );
}
