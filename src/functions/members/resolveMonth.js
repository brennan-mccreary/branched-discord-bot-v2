const chalk = require("chalk");

module.exports = async (client) => {
  client.resolveMonth = async (month) => {
    try {
      switch (month.toLowerCase()) {
        case "january":
        case "1":
          return { month: 0, max: 31, monthName: "January" };
        case "february":
        case "2":
          return { month: 1, max: 29, monthName: "February" };
        case "march":
        case "3":
          return { month: 2, max: 31, monthName: "March" };
        case "april":
        case "4":
          return { month: 3, max: 30, monthName: "April" };
        case "may":
        case "5":
          return { month: 4, max: 31, monthName: "May" };
        case "june":
        case "6":
          return { month: 5, max: 30, monthName: "June" };
        case "july":
        case "7":
          return { month: 6, max: 31, monthName: "July" };
        case "august":
        case "8":
          return { month: 7, max: 31, monthName: "August" };
        case "september":
        case "9":
          return { month: 8, max: 30, monthName: "September" };
        case "october":
        case "10":
          return { month: 9, max: 31, monthName: "October" };
        case "november":
        case "11":
          return { month: 10, max: 30, monthName: "November" };
        case "december":
        case "12":
          return { month: 11, max: 31, monthName: "December" };
        default:
          return { month: null, max: null, monthName: null };
      }
    } catch (err) {
      console.error(err);
    }
  };
};
