function main() {
    //document.querySelector('#result ul#list-notas').innerHTML = ''
    //document.querySelector('#result ul#list-coins').innerHTML = ''

    const total = document.querySelector('#total').value.replace(',', '.')
    const pago = document.querySelector('#pago').value.replace(',', '.')

    const listNotas = document.querySelector('#result ul#list-notas')
    const listCoins = document.querySelector('#result ul#list-coins')

    listNotas.removeChild('li')
    listCoins.removeChild('li')

    const subtitleNotas = document.querySelector('#result #subtitle-notas')
    const subtitleCoins = document.querySelector('#result #subtitle-coins')
    const subtitleResult = document.querySelector('#result #subtitle-result')
    const subtitleActiveClass= 'subtitle-active'

    subtitleNotas.classList.remove(subtitleActiveClass)
    subtitleCoins.classList.remove(subtitleActiveClass)
    subtitleResult.classList.remove(subtitleActiveClass)
    subtitleResult.style.opacity = 1

    let real = Number(pago) - Number(total)

    if (Number.isNaN(real) || total == '' || pago == '' || real == null || total <= 0 || pago <= 0) {
        subtitleResult.innerHTML = "Valor Inválido!"
        subtitleResult.className = subtitleActiveClass
        
        return
    } else if (real < 0) {
        subtitleResult.innerHTML = `Falta R$${(real * -1).toFixed(2).replace('.', ',')}`
        subtitleResult.className = subtitleActiveClass

        return
    } else if (real == 0) {
        subtitleResult.innerHTML = "Não há troco"
        subtitleResult.className = subtitleActiveClass

        return
        
    } else {
        real = real.toFixed(2)
    }

    subtitleResult.innerHTML = `Troco: R$${real.replace('.', ',')}`
    
    let notas = retornarCedulas(real)
    
    for (nota in notas) {

        if (notas[nota].qtd != 0) {

            let listItem = document.createElement('li')

            if (notas[nota].valor > 1) {
                if (notas[nota].qtd > 1) listItem.innerHTML = `${notas[nota].qtd} notas de ${notas[nota].valor} reais`
                else listItem.innerHTML = `${notas[nota].qtd} nota de ${notas[nota].valor} reais`

                subtitleNotas.className = subtitleActiveClass
                listNotas.appendChild(listItem)
            } else {
                if (notas[nota].valor == 1) {
                    if (notas[nota].qtd > 1) listItem.innerHTML = `${notas[nota].qtd} moedas de 1 real`
                    else listItem.innerHTML = `${notas[nota].qtd} moeda de 1 real`
                } else if (notas[nota].valor == 0.01) {
                    if (notas[nota].qtd > 1) listItem.innerHTML = `${notas[nota].qtd} moedas de 1 centavo`
                    else listItem.innerHTML = `${notas[nota].qtd} moeda de 1 centavo`
                } else {
                    if (notas[nota].qtd > 1) listItem.innerHTML = `${notas[nota].qtd} moedas de ${notas[nota].valor * 100} centavos`
                    else listItem.innerHTML = `${notas[nota].qtd} moeda de ${notas[nota].valor * 100} centavos`
                }  

                subtitleCoins.className = subtitleActiveClass
                listCoins.appendChild(listItem)
            }

            
        }
    }
    

}

function retornarCedulas(real) {
    let notas = {
        "1": {
            "valor": 100,
            "qtd": 0
        },
        "2": {
            "valor": 50,
            "qtd": 0
        },
        "3": {
            "valor": 20,
            "qtd": 0
        },
        "4": {
            "valor": 10,
            "qtd": 0
        },
        "5":{
            "valor": 5,
            "qtd": 0
        },
        "6": {
            "valor": 2,
            "qtd": 0
        },
        "7": {
            "valor": 1,
            "qtd": 0
        },
        "8": {
            "valor": 0.5,
            "qtd": 0
        },
        "9": {
            "valor": 0.25,
            "qtd": 0
        },
        "10": {
            "valor": 0.1,
            "qtd": 0
        },
        "11": {
            "valor": 0.05,
            "qtd": 0
        },
        "12": {
            "valor": 0.01,
            "qtd": 0
        }
    }

    for (nota in notas) {
        
        while (real >= notas[nota].valor) {
            real -= notas[nota].valor
            real = Number(real).toFixed(2)
            notas[nota].qtd++
        }
    }

    return notas
}
