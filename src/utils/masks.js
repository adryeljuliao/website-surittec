export const MaskPhone = function(phone) {
  let phoneMask = phone
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por espaço
    .replace(/(\d{2})(\d)/, '($1) $2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{5})(\d)/, '$1-$2')
    // .replace(/(\d{3})(\d{1,2})/, '$1-$2');
    .replace(/(-\d{4})\d+?$/, '$1');
  return phoneMask;
};

export const MaskCpf = function(cpf) {
  let cpfmask = cpf
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por espaço
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
  return cpfmask;
};
