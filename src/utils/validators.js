export const emailValidator = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const phonePattern = /^[0-9\-\+]{12,15}$/;

export const checkRussianPhones = /^((\+7|7|8)+([0-9]){10})$/;

// export const numbersPattern = /^[0-9]*$/;

export const numbersPattern = "^-?[0-9]\\d*\\.?\\d*$";         //"^-?[0-9]\d*\.?\d*$"

export const onlyDigits = /^\d+$/;


export const isIOS = /iPad|iPhone|iPod/.test(navigator.platform)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);