export const validateEmail = function(email) {
  let emailFormater = email.match(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi,
  );
  return emailFormater;
};

export const validateCpf = function(cpf) {
  if (cpf.length < 14) {
    return false;
  }
  const splitCPF = cpf.split('-');
  const cpfFormat = cpf.replace(/\./g, '').replace('-', '');

  let numberCPF = splitCPF[0].replace(/\./g, '');
  const digitsCPF = splitCPF[1];
  let multNumberCPF = 10;
  let sumToFirstDigit = 0;
  let sumToSecondDigit = 0;
  let sumEqualsNumbers = 0;

  for (let i = 0; i < cpfFormat.length - 1; i++) {
    if (cpfFormat.charAt(i) == cpfFormat.charAt(i + 1)) {
      sumEqualsNumbers++;
    }
  }

  if (sumEqualsNumbers == 10) {
    return false;
  }

  for (let i = 0; i < numberCPF.length; i++) {
    sumToFirstDigit += (multNumberCPF - i) * parseInt(numberCPF.charAt(i));
  }

  let rest1 = (sumToFirstDigit * 10) % 11;
  rest1 = rest1 == 10 ? 0 : rest1;

  numberCPF = `${numberCPF}${digitsCPF.charAt(0)}`;
  multNumberCPF = 11;
  for (let i = 0; i < numberCPF.length; i++) {
    sumToSecondDigit += (multNumberCPF - i) * parseInt(numberCPF.charAt(i));
  }
  let rest2 = (sumToSecondDigit * 10) % 11;
  rest2 = rest2 == 10 ? 0 : rest2;

  return rest1 == digitsCPF[0] && rest2 == digitsCPF[1];
};
