const leadForm = document.querySelector('.lead-form');
const andreWhatsappNumber = '000000000000';

const emailProviders = [
  'gmail.com',
  'hotmail.com',
  'outlook.com',
  'live.com',
  'icloud.com',
  'yahoo.com',
  'yahoo.com.br',
];

const phoneRules = {
  BR: { lengths: [10, 11], message: 'Digite um telefone brasileiro válido com DDD.' },
  US: { lengths: [10], message: 'Digite um telefone dos EUA válido com 10 números.' },
  CA: { lengths: [10], message: 'Digite um telefone do Canadá válido com 10 números.' },
  MX: { lengths: [10], message: 'Digite um telefone do México válido com 10 números.' },
  PT: { lengths: [9], message: 'Digite um telefone de Portugal válido com 9 números.' },
  ES: { lengths: [9], message: 'Digite um telefone da Espanha válido com 9 números.' },
  FR: { lengths: [9], message: 'Digite um telefone da França válido com 9 números.' },
  DE: { lengths: [10, 11], message: 'Digite um telefone da Alemanha válido.' },
  IT: { lengths: [9, 10], message: 'Digite um telefone da Itália válido.' },
  GB: { lengths: [10], message: 'Digite um telefone do Reino Unido válido com 10 números.' },
  IE: { lengths: [9], message: 'Digite um telefone da Irlanda válido com 9 números.' },
  AR: { lengths: [10], message: 'Digite um telefone da Argentina válido com 10 números.' },
  CL: { lengths: [9], message: 'Digite um telefone do Chile válido com 9 números.' },
  UY: { lengths: [8, 9], message: 'Digite um telefone do Uruguai válido.' },
  PY: { lengths: [9], message: 'Digite um telefone do Paraguai válido com 9 números.' },
  BO: { lengths: [8], message: 'Digite um telefone da Bolívia válido com 8 números.' },
  PE: { lengths: [9], message: 'Digite um telefone do Peru válido com 9 números.' },
  CO: { lengths: [10], message: 'Digite um telefone da Colômbia válido com 10 números.' },
  VE: { lengths: [10], message: 'Digite um telefone da Venezuela válido com 10 números.' },
  EC: { lengths: [9], message: 'Digite um telefone do Equador válido com 9 números.' },
  AU: { lengths: [9], message: 'Digite um telefone da Austrália válido com 9 números.' },
  NZ: { lengths: [8, 9], message: 'Digite um telefone da Nova Zelândia válido.' },
  JP: { lengths: [10, 11], message: 'Digite um telefone do Japão válido.' },
  CN: { lengths: [11], message: 'Digite um telefone da China válido com 11 números.' },
  IN: { lengths: [10], message: 'Digite um telefone da Índia válido com 10 números.' },
  ZA: { lengths: [9], message: 'Digite um telefone da África do Sul válido com 9 números.' },
};

const validators = {
  nome(value) {
    const words = value.trim().split(/\s+/).filter(Boolean);
    return words.length >= 2 ? '' : 'Digite seu nome completo.';
  },

  telefone(value) {
    const digits = value.replace(/\D/g, '');
    const countryField = leadForm.querySelector('select[name="paisTelefone"]');
    const country = countryField ? countryField.value : 'BR';
    const rule = phoneRules[country] || phoneRules.BR;

    return rule.lengths.includes(digits.length) ? '' : rule.message;
  },

  email(value) {
    const email = value.trim().toLowerCase();

    if (!email) {
      return '';
    }

    const emailPattern = /^[^\s@]+@([^\s@]+\.[^\s@]+)$/;
    const match = email.match(emailPattern);

    if (!match || !emailProviders.includes(match[1])) {
      return 'Use um e-mail Gmail, Hotmail, Outlook, Live, iCloud ou Yahoo.';
    }

    return '';
  },
};

function validateField(field) {
  const validate = validators[field.name];

  if (!validate) {
    return true;
  }

  const message = validate(field.value);
  field.setCustomValidity(message);
  return !message;
}

function keepOnlyDigits(field) {
  field.value = field.value.replace(/\D/g, '');
}

function getPhoneCountry() {
  const countryField = leadForm.querySelector('select[name="paisTelefone"]');
  return countryField ? countryField.value : 'BR';
}

function formatPhoneNumber(value, country) {
  const digits = value.replace(/\D/g, '');

  if (country === 'BR') {
    const limitedDigits = digits.slice(0, 11);
    const areaCode = limitedDigits.slice(0, 2);
    const firstDigit = limitedDigits.slice(2, 3);
    const firstBlock = limitedDigits.slice(3, 7);
    const secondBlock = limitedDigits.slice(7, 11);

    if (limitedDigits.length <= 2) {
      return areaCode ? `(${areaCode}` : '';
    }

    if (limitedDigits.length <= 3) {
      return `(${areaCode}) ${firstDigit}`;
    }

    if (limitedDigits.length <= 7) {
      return `(${areaCode}) ${firstDigit} ${firstBlock}`;
    }

    return `(${areaCode}) ${firstDigit} ${firstBlock}-${secondBlock}`;
  }

  if (country === 'US' || country === 'CA') {
    const limitedDigits = digits.slice(0, 10);
    const areaCode = limitedDigits.slice(0, 3);
    const firstBlock = limitedDigits.slice(3, 6);
    const secondBlock = limitedDigits.slice(6, 10);

    if (limitedDigits.length <= 3) {
      return areaCode ? `(${areaCode}` : '';
    }

    if (limitedDigits.length <= 6) {
      return `(${areaCode}) ${firstBlock}`;
    }

    return `(${areaCode}) ${firstBlock}-${secondBlock}`;
  }

  const rule = phoneRules[country] || phoneRules.BR;
  const maxLength = Math.max(...rule.lengths);
  return digits.slice(0, maxLength).replace(/(\d{3})(?=\d)/g, '$1 ');
}

function formatPhoneField(field) {
  field.value = formatPhoneNumber(field.value, getPhoneCountry());
}

function getFieldValue(name) {
  const field = leadForm.querySelector(`[name="${name}"]`);
  return field ? field.value.trim() : '';
}

function buildWhatsappMessage() {
  const name = getFieldValue('nome');
  const phoneCountry = getFieldValue('paisTelefone');
  const phone = getFieldValue('telefone');
  const email = getFieldValue('email') || 'Não informado';
  const model = getFieldValue('modelo') || 'Não informado';
  const description = getFieldValue('descricao') || 'Não informado';

  return [
    'Olá, André! Tenho interesse em realizar meu sonho com uma Honda!',
    '',
    'DADOS DO CLIENTE',
    `Nome completo: ${name}`,
    `Telefone: ${phoneCountry} ${phone}`,
    `E-mail: ${email}`,
    '',
    'INTERESSE',
    `Modelo desejado: ${model}`,
    '',
    'OBSERVAÇÃO',
    description,
  ].join('\n');
}

function openWhatsappWithLead() {
  if (!/^\d{10,15}$/.test(andreWhatsappNumber)) {
    alert('Configure o número do WhatsApp do André no arquivo script.js.');
    return;
  }

  const message = encodeURIComponent(buildWhatsappMessage());
  window.open(`https://wa.me/${andreWhatsappNumber}?text=${message}`, '_blank', 'noopener');
}

if (leadForm) {
  const fields = leadForm.querySelectorAll('input, select, textarea');
  const phoneField = leadForm.querySelector('input[name="telefone"]');
  const phoneCountryField = leadForm.querySelector('select[name="paisTelefone"]');

  if (phoneField) {
    phoneField.addEventListener('input', () => {
      formatPhoneField(phoneField);
      validateField(phoneField);
    });
    phoneField.addEventListener('blur', () => validateField(phoneField));
  }

  if (phoneCountryField && phoneField) {
    phoneCountryField.addEventListener('change', () => {
      formatPhoneField(phoneField);
      validateField(phoneField);
    });
  }

  fields.forEach((field) => {
    if (field === phoneField) {
      return;
    }

    field.addEventListener('input', () => validateField(field));
    field.addEventListener('blur', () => validateField(field));
  });

  leadForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const isValid = [...fields].every(validateField);

    if (!isValid) {
      leadForm.reportValidity();
      return;
    }

    openWhatsappWithLead();
  });
}
