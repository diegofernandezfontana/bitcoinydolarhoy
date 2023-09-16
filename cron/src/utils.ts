export const getDateDDMMYYYY_HHMM = () => {
  const fecha = new Date();

  const day = String(fecha.getDate()).padStart(2, "0");
  const month = String(fecha.getMonth() + 1).padStart(2, "0"); // Los meses en JS comienzan en 0 para enero, 1 para febrero, etc.
  const year = fecha.getFullYear();

  const hour = String(fecha.getHours()).padStart(2, "0");
  const min = String(fecha.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hour}:${min}`;
};
