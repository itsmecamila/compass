document.querySelector('form').addEventListener('submit', ValidarEmail); 

function ValidarEmail(event){
  event.preventDefault();

  let input = document.getElementsByTagName("input")[0]
  let email = input.value
  console.log(email)

  const regex = /^[^@]+@[^@]+\.[^@]+$/;
  let isValid = regex.test(email)
  
console.log(isValid)

  if(isValid){
    input.classList.remove('preenchimentoInvalido');
    input.classList.add('preenchimentoValido')
    GuardarLocalStorage(email)
  }

  else{
    input.classList.remove('preenchimentoValido');
    input.classList.add('preenchimentoInvalido');
  }
}

function GuardarLocalStorage(email){
  localStorage.setItem('emailHome',email)
}
