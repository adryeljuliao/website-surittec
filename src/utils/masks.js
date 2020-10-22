export const MaskCellPhone = function (phone) {
  let phoneMask = phone
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por espaço
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    // .replace(/(\d{3})(\d{1,2})/, '$1-$2');
    .replace(/(-\d{4})\d+?$/, '$1');
  return phoneMask;
};

export const MaskPhone = function (phone) {
  let phoneMask = phone
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por espaço
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    // .replace(/(\d{3})(\d{1,2})/, '$1-$2');
    .replace(/(-\d{4})\d+?$/, '$1');
  return phoneMask;
};

export const MaskCpf = function (cpf) {
  let cpfmask = cpf
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por espaço
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
  return cpfmask;
};

export const MaskCep = function (cep) {
  let cepmask = cep
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por espaço
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{3})\d+?$/, '$1');
  return cepmask;
};
