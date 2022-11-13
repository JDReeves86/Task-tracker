module.exports = {
    formatDate(date) {
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            seconds: "numeric",
          };
          const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
            date
          );
          return formattedDate;
    }
}