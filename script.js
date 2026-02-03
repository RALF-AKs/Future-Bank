/*************************
 * FASE 1 – Estrutura de Dados
 *************************/

// Objeto do usuário
const usuario = {
    nome: "DANIEL ANDRE KNUTH",
    saldoInicial: 11000
};

// Histórico de transações
let transacoes = [];

// Exibir dados iniciais ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("nome-usuario").innerText = usuario.nome;
    document.getElementById("saldo").innerText = usuario.saldoInicial.toFixed(2);
});


/*************************
 * FASE 2 – Funções e Operações
 *************************/

// Recalcula o saldo com base nas transações
function atualizarSaldo() {
    let saldo = usuario.saldoInicial;

    for (const t of transacoes) {
        saldo += t.tipo === "entrada" ? t.valor : -t.valor;
    }

    document.getElementById("saldo").innerText = saldo.toFixed(2);
    return saldo;
}

// Criar nova transação
function novaTransacao(tipoOperacao) {
    try {
        const valor = Number(prompt("INFORME O VALOR DA TRANSAÇÃO:"));
        const descricao = prompt("INFORME A DESCRIÇÃO:");

        // Validações
        if (isNaN(valor) || valor <= 0) {
            throw new Error("VALOR INVÁLIDO.");
        }

        if (!descricao || descricao.trim() === "") {
            throw new Error("DESCRIÇÃO INVÁLIDA.");
        }

        const tipo = tipoOperacao === "deposito" ? "entrada" : "saida";
        const saldoAtual = atualizarSaldo();

        if (tipo === "saida" && valor > saldoAtual) {
            throw new Error("SALDO INSUFICIENTE.");
        }

        // Cria o objeto da transação
        transacoes.push({
            data: new Date().toLocaleDateString("pt-BR"),
            descricao,
            valor,
            tipo
        });

        atualizarSaldo();
        renderizarExtrato();

    } catch (erro) {
        alert(erro.message);
    }
}


/*************************
 * FASE 3 – Renderização e Laços
 *************************/

function renderizarExtrato(lista = transacoes) {
    const tbody = document.getElementById("lista-transacoes");
    tbody.innerHTML = "";

    for (const t of lista) {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${t.data}</td>
            <td>${t.descricao}</td>
            <td class="${t.tipo}">
                R$ ${t.valor.toFixed(2)}
            </td>
        `;

        tbody.appendChild(tr);
    }
}


/*************************
 * FASE 4 – Proteção e Filtros
 *************************/

// Filtro do extrato
function filtrarExtrato() {
    const filtro = document.getElementById("filtro-tipo").value;

    if (filtro === "todos") {
        renderizarExtrato(transacoes);
        return;
    }

    const filtradas = transacoes.filter(t => t.tipo === filtro);
    renderizarExtrato(filtradas);
}
