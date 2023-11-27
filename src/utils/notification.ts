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
    }, reminderTime);
  }
}

export function sendNotification(email, message) {
  // Implement your notification logic here, e.g., sending an email
  console.log(`Sending notification to ${email}: ${message}`);
}

// Example usage:
const leaveStartDate = new Date("2023-12-01"); // Set the leave start date
const supervisorEmail = "supervisor@example.com"; // Set the supervisor's email
notifySupervisor(leaveStartDate, supervisorEmail);
