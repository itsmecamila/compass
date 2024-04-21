//---------------------------------------------------------------------------------------------------------

//Pegando elementos form e armazenando em variáveis
let contact_form = document.querySelector('#contact-form') 
let newsletter_form = document.querySelector('#newsletter-form')

//---------------------------------------------------------------------------------------------------------

//Quando um form é enviado, aciona funções de validação
contact_form.addEventListener('submit', ValidarFormContato);
newsletter_form.addEventListener('submit', ValidarFormNewsLetter);

//---------------------------------------------------------------------------------------------------------

//Função de validação formulário de contato
function ValidarFormContato(event){
  //Função que impede o recarregamento automático da página para realizar as validações & mostrar mensagens de feedback sobre form ao usuário
  event.preventDefault();

  //Variáveis auxiliares para lógica
  let todosDadosValidos = true; //Variável usada para verificar inputs válidos e assim no final apresentar mensagem de form VÁLIDO ou NÃO
  let temNumeros = /\d+/; //Variável de expressão regular usada para verificar se há algum número na string
  let formDataKeys = ['firstName','lastName','email','message'] //Array que criei para ser mais fácil a referência aos índexes do objeto formData
  let formData = { 
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  }

  //Laço de repetição para ler inputs do form e armazenar no formData objeto
  for(let i = 0; i < 4; i ++){
    let input = contact_form.querySelectorAll("[name]")[i] //Localiza todos elementos que possuem atributo name
    formData[formDataKeys[i]] = input //Armazena em cada key do objeto o input correspondente, já que ambos têm a mesma estrutura
  }


//---------------------------------------------------------------------------------------------------------

  //Variável para armazenar o valor do primeiro input: First Name
  let primeiroNome = formData.firstName.value 


  //Validação do valor do primeiro input
  if(primeiroNome.length > 0 && primeiroNome.length <= 20 && !primeiroNome.match(temNumeros)){ //Se respeitar o limite de tamanho mínimo de 1 caractere e não possuir números na string, ela é válida
    formData.firstName.classList.remove('preenchimentoInvalido'); //Caso preencha novamente, e agora está válida, primeiramente, remova estilização de input inválido
    formData.firstName.classList.add('preenchimentoValido') //Troca por estilização de input válido
  }

  //Caso valor seja inválido
  else{
    formData.firstName.classList.remove('preenchimentoValido') //Caso preencha novamente, e agora está inválido, primeiramente, remova estilização de  input válido
    formData.firstName.classList.add('preenchimentoInvalido') //Troque por estilização de input inválido
    todosDadosValidos = false; //Quando encontra um input inválido, inverte valor da variável 
  }

//---------------------------------------------------------------------------------------------------------

  //Variável para armazenar valor do segundo input: Last Name
  let sobreNome = formData.lastName.value 


  //Validação do valor do segundo input
  //Sobrenome maior que 0 e menor que 20 & não contém números
  if(sobreNome.length > 0 && sobreNome.length <= 20 && !sobreNome.match(temNumeros)){ 
    formData.lastName.classList.remove('preenchimentoInvalido'); //Remove estilização anterior
    formData.lastName.classList.add('preenchimentoValido')//Troca por estilização de input válido
  }

  //Caso valor seja inválido 
  else{
    formData.lastName.classList.remove('preenchimentoValido') //Remove estilização anterior
    formData.lastName.classList.add('preenchimentoInvalido') //Troca por estilização de input inválido
    todosDadosValidos = false; //Quando encontra um input inválido, inverte o valor da varíavel
  }

//---------------------------------------------------------------------------------------------------------

  //Variável para armazenar valor do terceiro input: Email
  let email = formData.email.value

  const regex = /^[^@]+@[^@]+\.[^@]+$/; //Variável de expressão regular para validar email 
  let isValid = regex.test(email) //Variável que guarda validação do email segundo a expressão regular acima

  //Verificação da validação feita
  if(isValid){ //Se é válida
    formData.email.classList.remove('preenchimentoInvalido'); //Remove estilização anterior
    formData.email.classList.add('preenchimentoValido') //Troca por estilização válida
  }

  //Caso valor seja inválido
  else{
    formData.email.classList.remove('preenchimentoValido'); //Remove estilização anterior
    formData.email.classList.add('preenchimentoInvalido'); //Troca por estilização inválida
    todosDadosValidos = false; //Quando encontra um input inválido, inverte o valor da varíavel
  }

  //---------------------------------------------------------------------------------------------------------
  
  //Variável para armazenar valor do quarto input: Message
  let mensagem = formData.message.value

  //Se for maior que 0 e menor ou igual 150 caracteres
  if(mensagem.length > 0 && mensagem.length <= 150){
    formData.message.classList.remove('preenchimentoInvalido'); //Remove estilização anterior
    formData.message.classList.add('preenchimentoValido'); //Troca por estilização válida
  }

  //Caso valor seja inválido
  else{
    formData.message.classList.remove('preenchimentoValido'); //Remove estilização anterior
    formData.message.classList.add('preenchimentoInvalido'); //Troca por estilização inválida
    todosDadosValidos = false; //Quando encontra um input inválido, inverte o valor da varíavel
  }


  //---------------------------------------------------------------------------------------------------------

  //Validação de todos inputs

  //Se true, ou seja, se a varável chegou como verdadeira até aqui, significa que todos valores informados são válidos
  //Logo, permito armazenamento no localstorage
  if(todosDadosValidos){
    GuardarLocalStorageContato(primeiroNome,sobreNome,email,mensagem) //Chamo a função que armazena no LocalStorage
    let aviso = contact_form.querySelector(".aviso-form") //Localizando e armazenando elemento criado para exibir mensagem ao usuário na variável "aviso"
    aviso.textContent = "Dados válidos - Formulário enviado com sucesso!" //Mensagem caso dados sejam válidos
    aviso.classList.remove('aviso-form-invalido')//Removendo estilização anterior  
    aviso.classList.add('aviso-form-valido')//Aplicando estilização de mensagem válida
    setTimeout(() =>{ //Função para resetar dados e estilização do formulário caso seja válido
      aviso.classList.remove('aviso-form-valido')//Remove estilização da mensagem
      aviso.textContent = "" //Limpa string da mensagem
      contact_form.reset() //Reseta formulário
      
      //Nas linhas abaixo, a estilização de inputs válidos é removida e agora os inputs têm estilização original
      formData.firstName.classList.remove('preenchimentoValido')
      formData.lastName.classList.remove('preenchimentoValido')
      formData.email.classList.remove('preenchimentoValido')
      formData.message.classList.remove('preenchimentoValido')
      //Na linha abaixo, no segundo parâmetro, é o tempo limite para a função ser executada (form válido resetado em 3 segundos após ser enviado)
    },3000)
  }

  //Caso seja inválido, varíavel "todosDadosValidos" terá valor de "false"
  else{
    let aviso = contact_form.querySelector(".aviso-form") //Localizando e armazenando elemento criado para exibir mensagem ao usuário na variável "aviso"
    aviso.textContent = "Dados inválidos - Verifique os campos em vermelho e tente novamente!"//Mensagem caso dados sejam inválidos
    aviso.classList.remove('aviso-form-valido')//Remove estilização anterior
    aviso.classList.add('aviso-form-invalido')//Troca por estilização de mensagem inválida
  }
}


// ------------------------------------------------------------------------------------------------

//Função para armazenar dados no localstorage
//Recebe como parâmetro os dados do formulário e armazena em cada key 
function GuardarLocalStorageContato(nome,sobrenome,email,mensagem){ 
  localStorage.setItem('firstName',nome)
  localStorage.setItem('lastName',sobrenome)
  localStorage.setItem('email',email)
  localStorage.setItem('message',mensagem)
}

// ------------------------------------------------------------------------------------------------

//Função para validar formulário de newsletter
function ValidarFormNewsLetter(event){
  event.preventDefault();

  //Variáveis auxiliares
  let input = newsletter_form.getElementsByTagName("input")[0] //Guarda input
  let email = input.value //Guarda valor do input
  const regex = /^[^@]+@[^@]+\.[^@]+$/; //Expressão regular para validar email
  let isValid = regex.test(email) //Varíavel que guarda resultado da validação

  //Se for válido
  if(isValid){
    input.classList.remove('preenchimentoInvalido'); //Remove estilização anterior
    input.classList.add('preenchimentoValido')//Troca por estilização de input válido
    GuardarLocalStorageNewsLetter(email)//Executa função para guardar email no localstorage
    //Função para mudar estilização do input e resetar form válido após limite de tempo
    setTimeout(() =>{
      input.classList.remove('preenchimentoValido') //Remove estilização
      newsletter_form.reset()//Reseta form
    },3000)//Após 3 segundos
  }

  //Caso seja inválido
  else{
    input.classList.remove('preenchimentoValido'); //Remove estilização anterior
    input.classList.add('preenchimentoInvalido'); //Aplica estilização input inválido
  }
  }

  // ------------------------------------------------------------------------------------------------
  //Função para armazenar no localstorage  
  function GuardarLocalStorageNewsLetter(email){
    localStorage.setItem('emailHome',email)
  }
