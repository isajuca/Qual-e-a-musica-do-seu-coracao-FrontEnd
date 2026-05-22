const textarea = document.getElementById('feelings');
const counter = document.getElementById('current');

textarea.addEventListener('input', () => {
    counter.innerText = textarea.value.length;
});

async function gerarMusica() {
    const texto = textarea.value;
    const btn = document.getElementById('btn-gerar');
    const resultsContainer = document.getElementById('results');

    if (texto.trim().length < 5) {
        alert("Escreva um pouco mais sobre seus sentimentos...");
        return;
    }

    // Estado de carregamento
    btn.innerText = "Consultando seus sentimentos...✨";
    btn.disabled = true;
    resultsContainer.classList.add('hidden');

    try {
        const response = await fetch("http://127.0.0.1:5000/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sentimento: texto })
        });

        const data = await response.json();

        if (data.status === "success") {
            const info = data.dados_musica;
            
            // Preenche os campos com os nomes exatos do Schema
            document.getElementById('song-name').innerText = info.nome_da_musica;
            document.getElementById('artist-name').innerText = info.artista;
            document.getElementById('lyrics-text').innerText = info.letra;

            // Mostra o resultado
            resultsContainer.classList.remove('hidden');
            resultsContainer.scrollIntoView({ behavior: 'smooth' });
        } else {
            alert("Erro: " + data.message);
        }
    } catch (error) {
        console.error("Erro:", error);
        alert("Não foi possível conectar ao servidor.");
    } finally {
        btn.innerText = "Descobrir Música do Coração ❤";
        btn.disabled = false;
    }
}