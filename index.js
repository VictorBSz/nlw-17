const { select, input, checkbox } = require('@inquirer/prompts')
/* Aqui criamos a var select, e que ele deve trazer o modulo da biblioteca inquirer */
let meta = {
    value: "Tomar 3L de agua",
    checked: false
}

let metas = [ meta ]

// FUNCTIONS
const cadastrarMeta = async () => {
    const meta = await input ({ message: "Digite a meta:"})
    if(meta.length <= 1) {
        console.log("A meta não pode ser vazia")
        return
    }

    metas.push(
        {value: meta, checked: false}
    )
    console.log("Meta cadastrada com sucesso!")
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "↑↓←→: Selecionar meta | Espaço: Marcar/Desmarcar | Enter: Finalizar essa etapa",
        choices: [...metas], // A reticencias indica para o app jogar tudo do array "metas" dentro do choices
        instructions: false
    })

    if(respostas.length == 0) {
        console.log("Nenhuma meta selecionada!")
        return
    }

    metas.forEach((m) => {
        m.checked = false
    })

    respostas.forEach((resposta) => {   // forEach para passar a function por cada resposta em respostas
        const meta = metas.find((m) => {    // find para encontrar a meta em metas, testando uma a uma
            return m.value == resposta
        })  

        meta.checked = true 

    })

    console.log("Meta(s) marcada(s) como concluída(s)")
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if (realizadas.length == 0) {
    console.log("Não existem metas realizadas! :(")
    return
    }

    await select({
        message: "Metas realizadas",
        choices: [...realizadas]
    })
}
// MENU E SUAS OPÇÕES
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
                    name: "Metas realizadas",
                    value: "realizadas"
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
                break
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "sair":
                console.log("Até a proxima!")
                return
        }
    }
}

start()  