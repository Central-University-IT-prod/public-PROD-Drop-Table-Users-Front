export default function calculateAge(birthDate: number) {
  const date = new Date(birthDate);
  const currentDate = new Date();

  const diff = currentDate.getTime() - date.getTime();

  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}
