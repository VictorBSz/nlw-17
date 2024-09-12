const { select, input } = require('@inquirer/prompts')
/* Aqui criamos a var select, e que ele deve trazer o modulo da biblioteca inquirer */
let meta = {
    value: "Tomar 3L de agua",
    checked: false
}

let metas = [ meta ]

const cadastrarMeta = async () => {
    const meta = await input ({ message: "Digite a meta:"})
    if(meta.length <= 1) {
        console.log("A meta não pode ser vazia")
        return
    }

    metas.push(
        {value: meta, checked: false}
    )
}

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
                await cadastrarMeta()
                console.log(metas)
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