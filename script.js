const form = document.getElementById('form');
form.addEventListener('submit', handleSubmit)

const inputValue = document.getElementById('value-real');
const selectedCurrency = document.getElementById ('currency');
const result = document.getElementById('result');
let valueConverted = 0;

function handleSubmit(e) {
    e.preventDefault();

    if(!inputValue.value || inputValue.value < 0){
        alert('Informe um valor correto');
        return;
    } else if (!selectedCurrency.value){
        alert('Escolha uma moeda');
        return;
    }

    converter();
};

async function converter() {
    if (selectedCurrency.value === 'eur') {
        try {
          const cotacaoEuro = await obterCotacao('EUR');
          const valueConverted = inputValue.value / cotacaoEuro;
          result.innerHTML = valueFormatter(valueConverted, 'pt-BR', 'EUR');
          animateResult();
        } catch (error) {
          console.log('Erro ao obter cotação:', error);
        }
    } else if (selectedCurrency.value === 'dol') {
      try {
        const cotacaoUsd = await obterCotacao('USD');
        const valueConverted = inputValue.value / cotacaoUsd;
        result.innerHTML = valueFormatter(valueConverted, 'en-US', 'USD');
        animateResult();
      } catch (error) {
        console.log('Erro ao obter cotação:', error);
      }
    }
  
    inputValue.value = '';
    selectedCurrency.value = '';
  }
  
  function valueFormatter(value, locale, currency) {
    const formattedValue = value.toLocaleString(locale, { style: 'currency', currency: currency });
    return `<span>💸</span> ${formattedValue} <span>💸</span>`;
  }
  
  function animateResult() {
    return result.animate(
      [
        { transform: 'translateY(-150px)' },
        { transform: 'translateY(0px)' },
      ],
      { duration: 500 }
    );
  }
  
  function obterCotacao(moeda) {
    return fetch(`https://economia.awesomeapi.com.br/last/${moeda}-BRL`)
      .then(response => response.json())
      .then(data => {
        const cotacao = data[Object.keys(data)[0]].bid;
        console.log(cotacao)
        return cotacao;
      });
  }
  
  
  

 
  
  
  