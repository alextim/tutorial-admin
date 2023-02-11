export const acceptedHours = [1, 2, 3, 4, 6, 12];
export const acceptedMinutes = [1, 2, 3, 4, 5, 10, 15, 20, 30];

export const acceptedHoursOptions = Object.values(acceptedHours).map(
  (value) => ({
    label: value,
    value,
  }),
);

export const acceptedMinutesOptions = Object.values(acceptedMinutes).map(
  (value) => ({
    label: value,
    value,
  }),
);
