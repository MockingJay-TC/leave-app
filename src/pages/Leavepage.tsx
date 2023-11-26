import { BookOpenIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import DatePicker from "../components/DatePicker";
import { calculateDays } from "../utils/calculateDays";
import { countWeekends } from "../utils/calculateLeave";

const Leavepage = () => {
  const [noOfDays, setNoOfDays] = useState<number>(0);
  const [fromDate, setFromDate] = useState<number>(0);
  const [toDate, setToDate] = useState<number>(0);

  const handleFromChange = (value: string) => {
    setFromDate(new Date(value).getTime());
  };
  const handleToChange = (value: string) => {
    setToDate(new Date(value).getTime());
  };

  useEffect(() => {
    if (toDate && fromDate) {
      const weekend = countWeekends(new Date(fromDate), new Date(toDate));
      setNoOfDays(calculateDays(toDate - fromDate) + 1 - weekend);
    }
  }, [fromDate, toDate]);

  return (
    <div className="w-full h-screen overflow-hidden bg-ten inset-0 bg-no-repeat bg-cover relative flex">
      <div className="w-[20%] h-full bg-green-100 left-0 shadow-xl z-50 py-24"></div>
      <div className="py-24  my-20 rounded-lg w-full mx-32 px-24 text-green-800">
        <div className="bg-green-100 font-bold rounded-xl grid grid-cols-3 text-center py-8 text-lg divide-x-2 divide-green-900">
          <div>
            <span className="text-green-900 font-extrabold shadow-md py-1 px-2 rounded-md bg-white ">
              20
            </span>{" "}
            <span>Leaves Available</span>
          </div>
          <div>
            <span className="text-green-900 font-extrabold shadow-md py-1 px-2 rounded-md bg-white ">
              5
            </span>{" "}
            <span>Leaves Taken</span>
          </div>
          <div>
            <span className="text-green-900 font-extrabold shadow-md py-1 px-2 rounded-md bg-white ">
              20
            </span>{" "}
            <span>This Month</span>
          </div>
        </div>
        <div className="bg-white w-full  rounded-xl my-4 text-green-800 p-10 shadow-xl text-lg font-bold">
          <div className="flex -tems-center gap-4">
            <BookOpenIcon className="w-6 h-6" />
            <h1>Leave Application</h1>
          </div>
          <div className=" my-8 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              {/* from */}
              <DatePicker text="From" onEmitValue={handleFromChange} />
              {/* To */}
              <DatePicker text="To" onEmitValue={handleToChange} />
              {/* No of days */}
              <div className="flex justify-between">
                <label htmlFor="numberOfDays">No of Days</label>
                <div className="border bg-black/5 rounded-lg py-1 px-2 w-1/4">
                  <input
                    type="text"
                    disabled
                    value={noOfDays}
                    className="bg-transparent outline-none w-full"
                  />
                </div>
              </div>
            </div>
            <div>1</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leavepage;
