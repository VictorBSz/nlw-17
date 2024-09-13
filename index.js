const { select, input, checkbox } = require('@inquirer/prompts')
/* Aqui criamos a var select, e que ele deve trazer o modulo da biblioteca inquirer */
const fs = require("fs").promises

let mensagem = 'Bem vindo ao App de Metas'

// FUNCTIONS
const carregarMetas = async () => {
    try {
        const dados = await fs.readFile('metas.json', "utf-8")
        metas = JSON.parse(dados)
    }
    catch(erro) {
        metas = []
    }
}

const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}

const cadastrarMeta = async () => {
    const meta = await input ({ message: "Digite a meta:"})
    if(meta.length <= 1) {
        mensagem= "A meta não pode ser vazia"
        return
    }

    metas.push(
        {value: meta, checked: false}
    )
    mensagem="Meta '" + meta + "' cadastrada com sucesso!"
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "↑↓←→: Selecionar meta | Espaço: Marcar/Desmarcar | Enter: Finalizar essa etapa",
        choices: [...metas], // A reticencias indica para o app jogar tudo do array "metas" dentro do choices
        instructions: false
    })
    
    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0) {
        mensagem="Nenhuma meta selecionada!"
        return
    }

    respostas.forEach((resposta) => {   // forEach para passar a function por cada resposta em respostas
        const meta = metas.find((m) => {    // find para encontrar a meta em metas, testando uma a uma
            return m.value == resposta
        })  

        meta.checked = true 

    })

   mensagem="Meta(s) marcada(s) como concluída(s)"
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked == false
    })

    if (abertas.length == 0) {
        mensagem="Você não tem metas em aberto! :D"
        return
    }

    await select({
        message: "Metas em aberto: " + abertas.length,
        choices: [...abertas]
    })
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if (realizadas.length == 0) {
    mensagem="Não existem metas realizadas! :("
    return
    }

    await select({
        message: "Metas realizadas: " + realizadas.length,
        choices: [...realizadas]
    })
}

const deletarMetas = async () => {
    const metasDesmarcadas = metas.map((meta) => {
        return { value: meta.value, checked: false }
    })
    const paraDeletar = await checkbox({
        message: "↑↓←→: Selecionar meta | Espaço: Marcar/Desmarcar | Enter: Excluir metas selecionadas",
        choices: [...metasDesmarcadas], // A reticencias indica para o app jogar tudo do array "metas" dentro do choices
        instructions: false
    })

    if(paraDeletar.length == 0) {
        mensagem="Nenhum item para deletar!"
        return
    }

    paraDeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    mensagem="Meta(s) deletada(s) com sucesso"
}

const mostrarMensagens = () =>{
    console.clear();

    if(mensagem != "")
        console.log(mensagem)
        console.log("")
        mensagem = ""
}
// MENU E SUAS OPÇÕES
const start = async () => {
    await carregarMetas()
    
    while(true) {
        mostrarMensagens()
        await salvarMetas()
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
                    name: "Metas em aberto",
                    value: "abertas"
                },
                {
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Excluir metas",
                    value: "deletar"
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
            case "abertas":
                await metasAbertas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "deletar":
                await deletarMetas()
                break
            case "mensagens":
                await mostrarMensagens()
                break
            case "sair":
                console.log("Até a proxima!")
                return
        }
    }
}

start()  