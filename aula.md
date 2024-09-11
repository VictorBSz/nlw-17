JS

console.log = print

##Variaveis
    Let = Variavel modificavel chamando o nome da variavel
    const = Variavel não modificavel, causando erro
    
    Tudo que é escrito dentro de chaves, tem um escopo diferente, e n se trata mais de escopo global
    O escopo não global é executado primeiro, ex:

    const mensagem = "olá eu"

        {
            const mensagem = "olá darkão"
            console.log(mensagem)
        }

    console.log(mensagem)

    - Aqui, o olá darkão é mostrado primeiro