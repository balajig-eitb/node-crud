export const generateRefId = (prefix = 'EITb') => {
  const now = new Date();

  const pad = (n) => n.toString().padStart(2, '0');

  return (
    prefix +
    now.getFullYear() +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    pad(now.getHours()) +
    pad(now.getMinutes())+
    pad(now.getSeconds())
  );
};
