export const countWeekends = (startDate: Date, endDate: Date): number => {
  let count = 0;
  const currentDate = new Date(startDate);

  // Iterate through each day between start and end dates
  while (currentDate <= endDate) {
    // Check if the current day is a Saturday or Sunday
    if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
      count++;
    }

    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return count;
};
