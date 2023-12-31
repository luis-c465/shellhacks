// export function getDatesInRange(weeksAhead, weeksInPast) {
//   const dates = [];
//   const today = new Date();
//   today.setDate(today.getDate() + weeksAhead * 7);

import dayjs from "dayjs";
import { format } from "./Chart3";

//   for (let i = 0; i <= weeksInPast; i++) {
//     const date = new Date(today);
//     date.setDate(today.getDate() - i * 7);
//     const formattedDate = date.toISOString().split("T")[0]; // Convert to YYYY-MM-DD format
//     dates.push(formattedDate);
//   }

//   return dates;
// }

// export function getDatesInRange(weeksAhead, weeksInPast) {
//   if (weeksInPast < 0) {
//     throw new Error("weeksInPast must be non-negative");
//   }

//   const formattedDates = [];
//   const currentDate = new Date();

//   for (let i = 0; i <= weeksInPast; i++) {
//     const date = new Date(currentDate);
//     date.setDate(date.getDate() + i * 7);
//     const formattedDate = date.toISOString().split("T")[0]; // Convert to YYYY-MM-DD format
//     formattedDates.push(formattedDate);
//   }

//   return formattedDates;
// }
//

export function padStartArray(arr, desiredLength, padValue) {
  if (arr.length >= desiredLength) {
    return arr; // No need to pad if the array is already long enough
  }

  const paddingLength = desiredLength - arr.length;
  const paddingArray = Array(paddingLength).fill(padValue);

  return paddingArray.concat(arr);
}

export function splitChargesDaily(charges, endDate, startDate) {
  // Initialize variables
  const result = [];
  let currentDate = dayjs(charges[0].date, format);
  let currentWeek = [];
  let i = 0;

  // Sort charges by date
  charges.sort((a, b) => dayjs(a.date, format) - dayjs(b.date, format));

  // Iterate through charges
  while (i < charges.length) {
    const chargeDate = dayjs(charges[i].date, format);

    // Check if the charge date is within the current week
    if (chargeDate <= currentDate) {
      currentWeek.push(charges[i]);
      i++;
    } else {
      // Move to the next week
      currentDate = currentDate.add(1, "day");

      // Add the current week to the result
      result.push(currentWeek);
      currentWeek = [];
    }

    // Check if we have reached the specified endDate
    if (chargeDate > endDate) {
      break;
    }
  }

  // Add any remaining charges to the result
  if (currentWeek.length > 0) {
    result.push(currentWeek);
  }

  return result;
}

// export function splitChargesDaily(inputArray, minDate) {
//   if (inputArray.length === 0) {
//     return [];
//   }

//   // Find the minimum date in the inputArray
//   let minDateInArray = dayjs(inputArray[0].date);
//   for (const obj of inputArray) {
//     const currentDate = dayjs(obj.date, format);
//     if (currentDate.isBefore(minDateInArray)) {
//       minDateInArray = currentDate;
//     }
//   }

//   // Create an array of empty sublists for each day from minDateInArray to minDate
//   const dayOfWeekSublists = [];
//   let currentDate = minDateInArray;
//   while (currentDate.isSameOrBefore(minDate, "day")) {
//     dayOfWeekSublists.push([]);
//     currentDate = currentDate.add(1, "day");
//   }

//   // Create an object to group objects by date
//   const groupedByDate = {};

//   // Group objects by date
//   inputArray.forEach((obj) => {
//     const date = dayjs(obj.date, format).format("YYYY-MM-DD");
//     if (!groupedByDate[date]) {
//       groupedByDate[date] = [];
//     }
//     groupedByDate[date].push(obj);
//   });

//   // Fill the dayOfWeekSublists with objects from groupedByDate
//   currentDate = minDateInArray;
//   while (currentDate.isSameOrBefore(minDate, "day")) {
//     const dateKey = currentDate.format("YYYY-MM-DD");
//     if (groupedByDate[dateKey]) {
//       dayOfWeekSublists.push(groupedByDate[dateKey]);
//     } else {
//       dayOfWeekSublists.push([]);
//     }
//     currentDate = currentDate.add(1, "day");
//   }

//   return dayOfWeekSublists;
// }

export function getDatesBetween(startDate, endDate) {
  const dates = [];
  let currentDate = dayjs(startDate);

  while (currentDate <= endDate) {
    dates.push(dayjs(currentDate));
    currentDate = currentDate.add(1, "day");
  }

  return dates;
}

// export function splitChargesWeekly(charges, endDate) {
//   if (!Array.isArray(charges)) {
//     throw new Error("Charges must be an array");
//   }

//   if (!charges.length) {
//     return [];
//   }

//   // Ensure charges are sorted by date
//   charges.sort((a, b) => new Date(a.date) - new Date(b.date));

//   const result = [];
//   let currentDate = new Date(charges[0].date);
//   let currentWeek = [];
//   let i = 0;

//   while (i < charges.length) {
//     const chargeDate = new Date(charges[i].date);

//     // Check if the charge date is within the current week
//     if (chargeDate <= currentDate) {
//       currentWeek.push(charges[i]);
//       i++;
//     } else {
//       // Move to the next week
//       currentDate = new Date(currentDate);
//       currentDate.setDate(currentDate.getDate() + 7);

//       // Add the current week to the result
//       result.push(currentWeek);
//       currentWeek = [];
//     }

//     // Check if we have reached the specified endDate
//     if (chargeDate > endDate) {
//       break;
//     }
//   }

//   // Add any remaining charges to the result
//   if (currentWeek.length > 0) {
//     result.push(currentWeek);
//   }

//   return result;
// }
// //
