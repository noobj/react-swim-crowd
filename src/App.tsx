import { useEffect, useState } from 'react';
import { format, subDays } from 'date-fns';
import ControlPanel from './components/ControlPanel';
import { MainContent } from './components/MainContent';

export function App() {
  const [start, setStart] = useState(format(subDays(new Date(), 3), 'yyyy-MM-dd HH:mm'));
  const [end, setEnd] = useState(format(new Date(), 'yyyy-MM-dd HH:mm'));
  const [response, setResponse] = useState([]);

  useEffect(() => {
    async function fetchEntries() {
      const params = new URLSearchParams();
      params.set('start', start);
      params.set('end', end);
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
  }, [start, end]);

  const changeHandler = async (isStart: boolean, dateStr: string) => {
    if (isStart) setStart(dateStr);
    else setEnd(dateStr);
  };

  return (
    <>
      <ControlPanel start={start} end={end} changeHandler={changeHandler} />
      <MainContent data={response}/>
    </>
  );
}
