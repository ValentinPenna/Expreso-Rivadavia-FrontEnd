export function generateRandomPassword() {
  const length = Math.floor(Math.random() * (14 - 8 + 1)) + 8;
  const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  const specialChars = "!@#$%^&*";

  let password = [
    lowerCaseChars[Math.floor(Math.random() * lowerCaseChars.length)],
    upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)],
    digits[Math.floor(Math.random() * digits.length)],
    specialChars[Math.floor(Math.random() * specialChars.length)],
  ];

  const allChars = lowerCaseChars + upperCaseChars + digits + specialChars;
  for (let i = password.length; i < length; i++) {
    password.push(allChars[Math.floor(Math.random() * allChars.length)]);
  }

  password = password.sort(() => Math.random() - 0.5);

  return password.join("");
}

const randomPassword = generateRandomPassword();
// console.log(randomPassword); // Output: a random password between 8 and 14 characters
