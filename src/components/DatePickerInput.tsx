import { SyntheticEvent, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { format, setHours, setMinutes } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  isStart: boolean;
  value: string;
  onChange: (isStart: boolean, dateStr: string) => void;
};

function DatePickerInput(props: Props) {
  const handleDatePickerChange = (date: Date) => {
    props.onChange(props.isStart, format(date, 'yyyy-MM-dd HH:mm'));
  };

  const handleMouseEnter = (e: SyntheticEvent<HTMLElement>) => {
    e.currentTarget.style.color = 'cornflowerblue';
  };

  const handleMouseLeave = (e: SyntheticEvent<HTMLElement>) => {
    e.currentTarget.style.color = 'currentColor';
  };

  // eslint-disable-next-line react/prop-types
  const ExampleCustomInput = forwardRef<HTMLButtonElement, any>(({ value, onClick }, ref) => (
    <button className="example-custom-input" onClick={onClick} ref={ref}>
      <input
        className="text-black text-2xl font-semibold inline rounded-lg text-center"
        size={11}
        type="text"
        value={value}
        readOnly={true}
      />
      <i
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="bi bi-calendar-fill text-3xl ml-2"
      />
    </button>
  ));
  ExampleCustomInput.displayName = 'whatever';

  return (
    <div className="inline-block w-fit">
      <DatePicker
        dateFormat="MM-dd HH:mm"
        className="text-black"
        showTimeSelect
        selected={new Date(props.value)}
        onChange={handleDatePickerChange}
        showMonthDropdown
        minTime={setHours(setMinutes(new Date(), 0), 7)}
        maxTime={setHours(setMinutes(new Date(), 0), 22)}
        customInput={<ExampleCustomInput />}
      />
    </div>
  );
}

export default DatePickerInput;
