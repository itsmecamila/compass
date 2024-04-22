// ------------------------------------------------------------------------------------------------
//Localizando elemento e executa função de validação quando form é enviado
let form = document.querySelector('form')
form.addEventListener('submit', ValidarEmail); 


// ------------------------------------------------------------------------------------------------
function ValidarEmail(event){
  //Bloqueio de recarregamento automático
  event.preventDefault();

  //Variáveis auxiliares
  let input = document.getElementsByTagName("input")[0] //Localiza elemento
  let email = input.value //Armazena conteúdo do input
  const regex = /^[^@]+@[^@]+\.[^@]+$/; //Expressão regular para validar email
  let isValid = regex.test(email) //Variável que guarda resultado da validação
  
  //Se for válido
  if(isValid){
    input.classList.remove('preenchimentoInvalido'); //Remove estilização anterior
    input.classList.add('preenchimentoValido') //Aplica estilização de campo válido
    GuardarLocalStorage(email)//Executa função para armazenar email no localstorage
    setTimeout(() =>{
        input.classList.remove('preenchimentoValido') //Remove estilização
        form.reset()//Reseta form
      },3000)//Após 3 segundos  
  }

  //Caso seja inválido
  else{
    input.classList.remove('preenchimentoValido'); //Remove estilização anterior
    input.classList.add('preenchimentoInvalido'); //Aplica estilização campo inválido
  }
}

// ------------------------------------------------------------------------------------------------

//Função para guardar email no localstorage
function GuardarLocalStorage(email){
  localStorage.setItem('emailHome',email)
}
