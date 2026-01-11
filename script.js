const DB_NAME = "GPS_V23_FINAL";

const db = {
    "🛠️ FAZER": { cor: "#2979ff", tasks: ["Caminhar 10–30 min", "Alongar o corpo", "Arrumar cama / casa", "Organizar arquivo/gaveta", "Produzir algo manual", "Cuidar do jardim", "Preparar refeição", "Registrar foto do dia", "Resolver pendência", "Fazer algo adiado"] },
    "🌱 QUERER": { cor: "#9c27b0", tasks: ["Querer empreender/criar", "Aprender algo novo/tocar", "Socializar mais / Amigos", "Ir à missa / culto", "Querer planejar viagem", "Querer menos celular", "Querer dormir bem", "Ser afetuoso / solidário", "Cuidar saúde / Peso", "Ser menos rabugento"] },
    "🎈 CURTIR": { cor: "#ff9800", tasks: ["Curtir filme/música", "Curtir um livro", "Curtir pôr do sol", "Curtir comida gostosa", "Curtir lazer simples", "Curtir ficar quieto", "Curtir memória boa", "Curtir companhia", "Curtir um banho", "Curtir natureza"] },
    "❤️ CUIDAR": { cor: "#e91e63", tasks: ["Cuidar de plantas", "Cuidar de animais/pets", "Beber água adequadamente", "Tomar remédios no horário", "Colorir a refeição", "3 min de respiração", "Limpeza da alma", "Escrever autobiografia", "Respeitar limites", "Cuidar de si / alguém"] },
    "📚 CONHECER": { cor: "#00bfa5", tasks: ["Ler 2 páginas", "Vídeo educativo", "Aprender algo novo", "Pesquisar curiosidade", "Ouvir com atenção", "Reconhecer porteiros/etc", "Descobrir história", "Mudar de opinião", "Estudar um tema", "Ver lugar virtual"] },
    "💬 CONVERSAR": { cor: "#1565c0", tasks: ["Mandar mensagem carinhosa", "Telefonar para alguém", "Conversar com vizinho", "Pedir ajuda", "Ouvir sem interromper", "Visitar alguém", "Falar sentimentos", "Rir com alguém", "Encontro para café", "Participar de grupo"] },
    "🤝 COMPARTILHAR": { cor: "#00c853", tasks: ["Ajudar com presença", "Doar o que não usa", "Partilhar história", "Solidariedade concreta", "Partilhar refeição", "Dar um abraço", "Dar palavra de apoio", "Partilhar silêncio", "Dividir conhecimento", "Partilhar fé/esperança"] },
    "➕ OUTROS": { cor: "#607d8b", tasks: ["Resolver imprevisto", "Organizar finanças", "Compras necessárias", "Cuidar de documentos", "Pequeno reparo/conserto", "Necessidade familiar", "Organizar compromissos", "Trâmite bancário/digital", "Planejar dia seguinte", "Prática livre ou extra"] }
};

const manifestoData = [
    {v: "🛠️ FAZER", t: "O antídoto contra a inércia. Pequenas ações geram autoeficácia e lembram que somos agentes da nossa história."},
    {v: "🌱 QUERER", t: "O combustível do propósito. Desejar, evoluir e empreender em si mesmo para manter o fogo interior aceso."},
    {v: "🎈 CURTIR", t: "O prazer como imperativo de saúde mental. Curtir a vida sem culpa regula o bem-estar."},
    {v: "📚 CONHECER", t: "A juventude da mente. A curiosidade e o aprendizado contínuo mantêm o cérebro plástico e jovem."},
    {v: "💬 CONVERSAR", t: "Terapia do vínculo. O diálogo multiplica alegrias e ajuda a partilhar os pesos da vida."},
    {v: "❤️ CUIDAR", t: "Manutenção do templo. Cuidar do corpo, dos pets, das plantas e da própria memória."},
    {v: "🤝 COMPARTILHAR", t: "Transcendência. Sair de si para oferecer afeto transforma experiência em sabedoria coletiva."},
    {v: "➕ OUTROS", t: "Gestão da vida prática. A organização que garante a paz necessária para o autocuidado."}
];

function render() {
    const data = document.getElementById('dataSel').value;
    const container = document.getElementById('lista-corpo');
    let html = '';
    for (let v in db) {
        html += `<div class="verbo-header" style="background:${db[v].cor}">${v}</div>`;
        db[v].tasks.forEach((t, i) => {
            const id = `${DB_NAME}_${data}_${v.substring(0,2)}_${i}`;
            const val = localStorage.getItem(id) || 'n';
            html += `<div class="task-card"><span class="task-title">${t}</span><div class="btn-group">
                <button class="btn-opt f ${val==='f'?'active':''}" onclick="set('${id}','f')">Fiz</button>
                <button class="btn-opt p ${val==='p'?'active':''}" onclick="set('${id}','p')">Parte</button>
                <button class="btn-opt n ${val==='n'?'active':''}" onclick="set('${id}','n')">Não</button>
            </div></div>`;
        });
        const noteId = `note_${data}_${v.substring(0,2)}`;
        const noteVal = localStorage.getItem(noteId) || '';
        html += `<textarea class="notes-box" id="${noteId}" oninput="save('${noteId}')" placeholder="Notas sobre ${v}...">${noteVal}</textarea>`;
    }
    container.innerHTML = html;
    calc();
}

function set(id, val) { localStorage.setItem(id, val); render(); }
function save(id) { localStorage.setItem(id, document.getElementById(id).value); }

function calc() {
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(DB_NAME)) {
            const v = localStorage.getItem(k);
            total += (v === 'f' ? 10 : v === 'p' ? 5 : 0);
        }
    }
    document.getElementById('total-pts').innerText = total;
}

function renderManifesto() {
    const cont = document.getElementById('manifesto-content');
    if (cont) {
        cont.innerHTML = manifestoData.map(m => `
            <div class="manifesto-card">
                <strong>${m.v}</strong>
                <p>${m.t}</p>
            </div>
        `).join('') + `<div style="text-align:center; padding:30px;"><strong>Ricardo de Faria Barros</strong><br>ricardodefariabarros@gmail.com</div>`;
    }
}

function changeTab(t) {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById('view-' + t).classList.remove('hidden');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-' + t).classList.add('active');
    
    // CHAMAR O MANIFESTO QUANDO CLICAR NA ABA SISTEMA
    if (t === 'info') {
        renderManifesto();
    }
}

window.onload = () => {
    document.getElementById('dataSel').value = new Date().toISOString().split('T')[0];
    document.getElementById('dataSel').addEventListener('change', render);
    render();
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');
};