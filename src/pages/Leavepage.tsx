import { BookOpenIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import DatePicker from "../components/DatePicker";
import { updateUser } from "../services/database";
import { calculateDays } from "../utils/calculateDays";
import { countWeekends } from "../utils/calculateLeave";
import { notifySupervisor } from "../utils/notification";

const Leavepage = () => {
  const [noOfDays, setNoOfDays] = useState<number>(0);
  const [fromDate, setFromDate] = useState<number>(0);
  const [toDate, setToDate] = useState<number>(0);

  const leaveDays = JSON.parse(localStorage.getItem("user") as string)?.user
    ?.leaveDays;
  const id = JSON.parse(localStorage.getItem("user") as string)?.user.id;
  const supervisor = JSON.parse(localStorage.getItem("user") as string)?.user
    .supervisor;

  const handleFromChange = (value: string) => {
    setFromDate(new Date(value).getTime());
  };
  const handleToChange = (value: string) => {
    setToDate(new Date(value).getTime());
  };

  const handleLeave = async () => {
    const data = {
      status: "pending",
      startDate: new Date(fromDate).toDateString(),
      endDate: new Date(toDate).toDateString(),
      requestedDays: noOfDays,
      leaveDays: leaveDays,
    };
    updateUser(id, data);

    notifySupervisor(fromDate, supervisor);
  };

  const handleDisable = (): boolean => {
    return noOfDays ? noOfDays <= leaveDays : false;
  };

  useEffect(() => {
    if (toDate && fromDate) {
      const weekend = countWeekends(new Date(fromDate), new Date(toDate));
      setNoOfDays(calculateDays(toDate - fromDate) + 1 - weekend);
    }
  }, [fromDate, toDate]);

  return (
    <div className="w-full h-screen overflow-hidden bg-ten inset-0 bg-no-repeat bg-cover relative flex">
      <div className="py-24  my-20 rounded-lg w-full mx-32 px-24 text-green-800">
        <div className="bg-green-100 font-bold rounded-xl grid grid-cols-3 text-center py-8 text-lg divide-x-2 divide-green-900">
          <div className="gap-4 flex items-center justify-center">
            <span className="text-green-900 font-extrabold shadow-md py-1 px-2 rounded-md bg-white ">
              {leaveDays}
            </span>
            <span>Leaves Available</span>
          </div>
          <div className="gap-4 flex items-center justify-center">
            <span className=" text-green-900 font-extrabold shadow-md py-1 px-2 rounded-md bg-white ">
              {20 - leaveDays}
            </span>
            <span>Leaves Taken</span>
          </div>
          <div className="gap-4 flex items-center justify-center">
            <span className="text-green-900 font-extrabold shadow-md py-1 px-2 rounded-md bg-white ">
              {leaveDays}
            </span>
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
            <div className="flex flex-col space-y-4 items-center justify-center">
              <button
                disabled={!handleDisable()}
                onClick={() => handleLeave()}
                className={`${
                  !handleDisable()
                    ? "bg-black/10 text-black/50"
                    : "bg-green-100"
                } py-2 px-4  text-green-900 rounded-lg`}
              >
                BOOK LEAVE
              </button>
              {noOfDays > 20 && (
                <p className="text-[tomato] italic block">
                  You have exceeded available days
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leavepage;
