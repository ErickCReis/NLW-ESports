export const convertHourStringToMinutes = (hourString: string) => {
  const [hour, minutes] = hourString.split(":");

  return Number(hour) * 60 + Number(minutes);
};

export const convertMinutesToHourString = (minutes: number) => {
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;

  if (minute == 0) {
    return `${String(hour).padStart(2, "0")}h}`;
  }

  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
};
