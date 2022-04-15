import { useEffect, useState } from 'react';
import { format, endOfMonth, startOfDay } from 'date-fns';
import ControlPanel from './ControlPanel';
import { MainContent } from './MainContent';

export function App() {
  const [start, setStart] = useState(format(startOfDay(new Date()), 'yyyy-MM-dd HH:mm'));
  const [end, setEnd] = useState(format(endOfMonth(new Date()), 'yyyy-MM-dd HH:mm'));
  const [response, setResponse] = useState([]);

  async function fetchEntries() {
    const params = new URLSearchParams();
    params.set('start', start);
    params.set('end', end);
    const backendUrl = 'https://04xkzdmmq6.execute-api.ap-southeast-1.amazonaws.com/crowd';

    const res = await fetch(`${backendUrl}?${params.toString()}`);
    if (res.status === 401) {
      return null;
    }
    const data = await res.json();
    return { data };
  }

  useEffect(() => {
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
