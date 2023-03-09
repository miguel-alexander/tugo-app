const parseTime = (datetime) => {
  if (!datetime) return [1, 2];
  let convertedDateTime = new Date(datetime * 1000).toLocaleString();
  let date = convertedDateTime.split(", ")[0];
  let time = convertedDateTime.split(", ")[1];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  temp_date = date.split("/");
  let parsed_date = months[temp_date[0] - 1] + " " + temp_date[1];

  let parsed_time =
    time.slice(0, time.lastIndexOf(":")) + " " + time.slice(time.length - 2);

  return [parsed_date, parsed_time];
};

export default parseTime;
