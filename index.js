const start = () => {
    while(true) {
        let option = 'cadastrar'
        switch(option) {
            case "cadastrar":
                console.log('vamos cadastrar')
                break
            case "listar":
                console.log('vamos listar')
                break
            case "sair":
                return
        }
    }
}

start()
// Arrays, objetos

let meta = {
    value: 'Ler um livro por mês',
    checked: true,
}

let metas = [
    meta,
    {
        value: "Caminhar por 20 minutos todos os dias dmi3b47",
        checked: false
    }
]

console.log(metas[0].value)