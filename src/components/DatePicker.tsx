import { useState } from "react";
import { getCurrentDate } from "../utils/getCurrentDate";

const DatePicker = ({
  text,
  onEmitValue,
}: {
  text: string;
  onEmitValue: (val: string) => void;
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    onEmitValue(val);
  };

  const [today] = useState(getCurrentDate());

  return (
    <div className="flex gap-4 items-center justify-between">
      <label htmlFor="from">{text}</label>
      <div className="border rounded-lg py-1 px-2">
        <input
          min={today}
          type="date"
          className="bg-transparent w-full outline-none"
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default DatePicker;
