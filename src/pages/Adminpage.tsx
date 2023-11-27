import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Leave } from "../interface/interface";
import { getUser, updateUser } from "../services/database";
import { approveLeave, notification } from "../utils/notification";

const AdminPage = () => {
  const email = JSON.parse(localStorage.getItem("user") as string)?.user.email;

  const [loading, setLoading] = useState(false);
  const [leaves, setLeaves] = useState<DocumentData>([]);
  useEffect(() => {
    getUser("status", "pending").then(
      (response: QuerySnapshot<DocumentData>) => {
        const leaves: DocumentData[] = [];
        response.forEach((u) => leaves.push({ ...u.data(), id: u.id }));
        localStorage.setItem("leaves", JSON.stringify(leaves));
        setLeaves(leaves);
      }
    );
  }, []);

  const rejectLeave = (leave: Leave) => {
    setLoading(true);
    const { id } = leave;
    const data = {
      status: "reject",
      startDate: new Date(leave.startDate).toDateString(),
      leaveDays: leave?.leaveDays,
      requestedDays: 0,
    };

    updateUser(id, data).then(() => {
      setLoading(false);
    });
    notification({
      to: [leave.email, email],
      subject: "Leave Request",
      text: `Leave Request Rejected for ${leave.email}`,
    });
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-ten inset-0 bg-no-repeat bg-cover relative flex">
      <div className="py-24  my-20 rounded-lg w-full mx-32 px-24 text-green-800">
        <div className="bg-white my-8 shadow-2xl ">
          <table className="w-full text-sm divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                  <div className="flex items-center">Email</div>
                </th>

                <th className="p-4 font-medium text-center text-gray-900">
                  <div className="flex items-center">Requested Leave</div>
                </th>
                <th className="p-4 font-medium text-center text-gray-900">
                  <div className="flex items-center">Status</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 space-y-2 ">
              {leaves.map((leave: Leave, index: number) => (
                <tr
                  key={index}
                  className="group cursor-pointer hover:bg-corn/30 hover:!text-white transition duration-500 ease-in-out "
                >
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    {leave.email}
                  </td>
                  <td className="p-4 text-black whitespace-nowrap">
                    <button className="group-hover:text-sunshine cursor-pointer group-hover:font-semibold group-hover:underline transition duration-500 truncate">
                      {leave.requestedDays}
                    </button>
                  </td>
                  <td className="p-4 text-black whitespace-nowrap">
                    <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                      {leave.status}
                    </span>
                  </td>

                  <td
                    onClick={() => approveLeave(leave, email)}
                    className="hover:shadow-lg py-2 px-4 rounded-md inline-block my-2 text-green-900 font-extrabold bg-green-100 whitespace-nowrap"
                  >
                    {loading ? "loading..." : "Approve"}
                  </td>
                  <td
                    onClick={() => rejectLeave(leave)}
                    className="mx-8 hover:shadow-lg py-2 px-4 rounded-md inline-block my-2 text-red-900 font-extrabold bg-red-100 whitespace-nowrap"
                  >
                    Reject
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
