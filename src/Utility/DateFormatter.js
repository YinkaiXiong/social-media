const dateFormatter = (postDate) => {
  const date = new Date(postDate);
  const currentYear = new Date().getFullYear();
  const months = [
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
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  if (year === currentYear) {
    return `${months[month]} ${day}`;
  } else {
    return `${months[month]} ${day}, ${year}`;
  }
};

export default dateFormatter;
