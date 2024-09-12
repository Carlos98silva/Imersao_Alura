function pesquisar() {

// Faz uma requisição à API do YGOPRODeck para obter informações sobre todas as cartas
fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php')
    .then(response => response.json())
    .then(data => {
        // Extrai os dados relevantes (nome, descrição, URL, imagem) de cada carta da resposta
        const cardsData = data.data.map(card => ({
            name : card.name,
            desc: card.desc,
            ygoprodeck_url: card.ygoprodeck_url,
            ft : card.type,
            image_url: card.image_url
        }));

        // Seleciona a seção HTML onde os resultados serão exibidos
        let section = document.getElementById("resultados-pesquisa");

        let campoPesquisa = document.getElementById("campo-pesquisa").value;
        if(!campoPesquisa) {
            section.innerHTML = "<p>Nada foi encontrado</p>"
            return
        }

        // Inicializa uma string vazia para armazenar o HTML dos resultados
        let result = "";

        // Itera sobre cada carta e constrói o HTML para exibição
        for (let info of cardsData) {
            if (info.name.includes(campoPesquisa)) {
                result += `
                <div class="item-resultado">
                    <h2>
                        <a href="${info.image_url}" target="_blank">${info.name}</a> ${info.ft}
                    </h2>
                    <p class="descricao-meta">${info.desc}</p><a href="${info.ygoprodeck_url}" target="_blank">Mais detalhes</a>
                </div>
            `
            }
        }
    // Atualiza o conteúdo da seção HTML com os resultados gerados
    section.innerHTML = result;
    
    })
    .catch(error => {
        // Caso ocorra algum erro durante a requisição ou o processamento, exibe uma mensagem de erro no console
        console.error('Erro ao buscar os dados:', error);
    
    });
};

document.getElementById("anoatual").textContent = new Date().getFullYear();
