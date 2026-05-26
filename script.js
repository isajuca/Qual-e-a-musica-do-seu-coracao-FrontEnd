const textarea = document.getElementById('feelings');
const counter = document.getElementById('current');

/* =========================
   CONTADOR DE CARACTERES
========================= */

textarea.addEventListener('input', () => {
    counter.innerText = textarea.value.length;
});

/* =========================
   GERAR MÚSICA
========================= */

async function gerarMusica() {

    const texto = textarea.value;

    const btn = document.getElementById('btn-gerar');

    const resultsContainer = document.getElementById('results');

    if (texto.trim().length < 5) {

        alert("Escreva um pouco mais sobre seus sentimentos... 💗");

        return;
    }

    /* LOADING */

    btn.innerText = "Consultando seus sentimentos... ✨";

    btn.disabled = true;

    resultsContainer.classList.add('hidden');

    try {

        const response = await fetch("http://127.0.0.1:5000/generate", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                sentimento: texto
            })
        });

        const data = await response.json();

        if (data.status === "success") {

            const info = data.dados_musica;

            /* PREENCHE RESULTADOS */

            document.getElementById('song-name').innerText =
                info.nome_da_musica;

            document.getElementById('artist-name').innerText =
                info.artista;

            document.getElementById('lyrics-text').innerText =
                info.letra;

            /* BOTÃO YOUTUBE MUSIC */

            const musicBtn =
                document.getElementById("music-link");

            musicBtn.href =
                `https://music.youtube.com/search?q=${encodeURIComponent(
                    info.nome_da_musica + " " + info.artista
                )}`;

            /* MOSTRA RESULTADO */

            resultsContainer.classList.remove('hidden');

            resultsContainer.scrollIntoView({
                behavior: 'smooth'
            });

        } else {

            alert("Erro: " + data.message);
        }

    } catch (error) {

        console.error("Erro:", error);

        alert("Não foi possível conectar ao servidor.");

    } finally {

        btn.innerText =
            "Descubra a música do seu coração ❤";

        btn.disabled = false;
    }
}

/* =========================
   IMPRIMIR CARTINHA
========================= */

function imprimirLetra(){

    window.print();
}