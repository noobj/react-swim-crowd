import { DatePickerInput } from './DatePickerInput';
import { WeekButton } from './WeekButton';

export function ControlPanel() {
  return (
    <div className="border-b border-slate-900/10 dark:border-slate-300/10">
      <div className="m-2 relative flex items-center">
        <input
          type="image"
          alt="logo"
          src="./favicon.jpg"
          onClick={() => window.location.reload()}
          className="w-10 align-bottom mr-2"
        />
        <DatePickerInput isStart={true}/>
        <i className="bi bi-arrow-right text-xl ml-3 mr-3" />
        <DatePickerInput isStart={false}/>
        <WeekButton isLast={true}/>
        <WeekButton isLast={false}/>
      </div>
    </div>
  );
}
