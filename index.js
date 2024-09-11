const { select } = require('@inquirer/prompts')
/* Aqui criamos a var select, e que ele deve trazer o modulo da biblioteca inquirer */

const start = async () => {
    while(true) {
        
        const option = await select({
            message: "Menu >",  /* O select aguarda um obj com exatamente esses props */
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        }) /* await = aguardar, sempre q usarmos await, temos q ter async no const da função */
        /* Aqui usamos o await para que o programa espere o usuario escolher uma opção, inves de ficar rodando igual louco */

        switch(option) {
            case "cadastrar":
                console.log('vamos cadastrar')
                break
            case "listar":
                console.log('vamos listar')
                break
            case "sair":
                console.log("Até a proxima!")
                return
        }
    }
}

start()  