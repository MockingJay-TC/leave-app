import { Leave } from "../interface/interface";
import { updateUser } from "../services/database";

export function notifySupervisor(
  leaveStartDate: number,
  supervisorEmail: string
) {
  // Calculate the time difference between now and the leave start date
  const timeUntilLeave = leaveStartDate - Date.now();

  // Set a reminder interval (e.g., 24 hours)
  const reminderInterval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  // Calculate the number of reminders needed
  const remindersNeeded = Math.ceil(timeUntilLeave / reminderInterval);

  // Notify supervisor immediately
  sendNotification(supervisorEmail, "Leave Application Notification");

  // Set up reminders
  for (let i = 1; i < remindersNeeded; i++) {
    const reminderTime = Date.now() + i * reminderInterval;
    setTimeout(() => {
      sendNotification(supervisorEmail, `Leave Reminder - ${i} day(s) before`);
      notification({
        to: [supervisorEmail],
        subject: "Leave Request",
        text: `Leave Request Notification`,
      });
    }, reminderTime);
  }
}

export const notification = async (data: {
  to: string[];
  subject: string;
  text: string;
}) => {
  const url = "http://localhost:3000/send-email";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Fetch Error:", error);
    });
};

export function sendNotification(email: string, message: string) {
  // Implement your notification logic here, e.g., sending an email
  console.log(`Sending notification to ${email}: ${message}`);
}

export const scheduleAutomaticApproval = (leave: Leave, email: string) => {
  const { startDate } = leave;
  const threeDaysBeforeStartDate = new Date(startDate);
  threeDaysBeforeStartDate.setDate(threeDaysBeforeStartDate.getDate() - 3);

  const now = new Date();

  // If the current date is less than three days before the leave start date
  if (now < threeDaysBeforeStartDate) {
    const timeUntilApproval =
      threeDaysBeforeStartDate.getTime() - now.getTime();

    // Schedule the automatic approval
    setTimeout(() => {
      approveLeave(leave, email);
    }, timeUntilApproval);
  }
};

export const approveLeave = (leave: Leave, email: string) => {
  const { id } = leave;
  const data = {
    status: "approved",
    startDate: new Date(leave.startDate).toDateString(),
    leaveDays: leave?.leaveDays - leave?.requestedDays,
    requestedDays: 0,
  };

  updateUser(id, data).then(() => {});

  notification({
    to: [leave.email, email],
    subject: "Leave Request",
    text: `Leave Request Approved for ${leave.email}`,
  });
};
