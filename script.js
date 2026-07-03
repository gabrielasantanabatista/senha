// Seleção de Elementos Principais
const campoSenha = document.getElementById("campo-senha");
const tamanhoTexto = document.getElementById("tamanho-texto");
const barraForca = document.getElementById("barra-forca");
const nivelTexto = document.getElementById("nivel-texto");
const checkboxes = document.querySelectorAll(".opcao-check");

// Elementos de Criptografia
const textoMensagem = document.getElementById("texto-mensagem");
const chaveSecreta = document.getElementById("chave-secreta");
const campoResultado = document.getElementById("campo-resultado");

// Conjuntos de Caracteres
const maiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const minusculas = "abcdefghijklmnopqrstuvwxyz";
const numeros = "0123456789";
const simbolos = "!@#$%&*()-_=+?";

let tamanhoSenha = 12;

// --- SISTEMA DE ABAS ---
document.querySelectorAll(".tab-button").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-button").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
        
        btn.classList.add("active");
        document.getElementById(`tab-${btn.dataset.tab}`).classList.add("active");
    });
});

// --- GERADOR DE SENHAS ---
function gerarSenha() {
    let caracteres = "";
    if (checkboxes[0].checked) caracteres += maiusculas;
    if (checkboxes[1].checked) caracteres += minusculas;
    if (checkboxes[2].checked) caracteres += numeros;
    if (checkboxes[3].checked) caracteres += simbolos;

    if (!caracteres) {
        campoSenha.value = "";
        atualizarIndicadorForca(0);
        return;
    }

    let senha = "";
    for (let i = 0; i < tamanhoSenha; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        senha += caracteres[indice];
    }

    campoSenha.value = senha;
    verificarForca();
}

function verificarForca() {
    let pontos = 0;
    if (tamanhoSenha >= 8) pontos++;
    if (tamanhoSenha >= 12) pontos++;
    
    checkboxes.forEach(c => { if (c.checked) pontos++; });
    atualizarIndicadorForca(pontos);
}

function atualizarIndicadorForca(pontos) {
    if (pontos <= 3) {
        barraForca.style.width = "35%";
        barraForca.style.background = "#EF4444";
        nivelTexto.textContent = "Fraca";
        nivelTexto.style.color = "#EF4444";
    } else if (pontos <= 5) {
        barraForca.style.width = "65%";
        barraForca.style.background = "#F59E0B";
        nivelTexto.textContent = "Média";
        nivelTexto.style.color = "#F59E0B";
    } else {
        barraForca.style.width = "100%";
        barraForca.style.background = "#10B981";
        nivelTexto.textContent = "Forte";
        nivelTexto.style.color = "#10B981";
    }
}

// Ouvintes dos Botões Contadores
document.getElementById("btn-menos").addEventListener("click", () => {
    if (tamanhoSenha > 4) {
        tamanhoSenha--;
        tamanhoTexto.textContent = tamanhoSenha;
        gerarSenha();
    }
});

document.getElementById("btn-mais").addEventListener("click", () => {
    if (tamanhoSenha < 40) {
        tamanhoSenha++;
        tamanhoTexto.textContent = tamanhoSenha;
        gerarSenha();
    }
});

checkboxes.forEach(c => c.addEventListener("change", gerarSenha));

// --- MOTOR DE CRIPTOGRAFIA ---
document.getElementById("btn-criptografar").addEventListener("click", () => {
    const msg = textoMensagem.value;
    const chave = chaveSecreta.value;
    
    if(!msg || !chave) return mostrarToast("Preencha a mensagem e a chave secreta.");
    
    const criptografado = CryptoJS.AES.encrypt(msg, chave).toString();
    campoResultado.value = criptografado;
});

document.getElementById("btn-descriptografar").addEventListener("click", () => {
    const msgCripto = textoMensagem.value;
    const chave = chaveSecreta.value;
    
    if(!msgCripto || !chave) return mostrarToast("Preencha a mensagem e a chave secreta.");
    
    try {
        const bytes = CryptoJS.AES.decrypt(msgCripto, chave);
        const original = bytes.toString(CryptoJS.enc.Utf8);
        if(!original) throw new Error();
        campoResultado.value = original;
    } catch (e) {
        mostrarToast("Falha ao descriptografar. Chave incorreta.");
        campoResultado.value = "";
    }
});

// --- SISTEMA DE CÓPIA (TOAST) ---
function configurarCopia(idBotao, idCampo) {
    document.getElementById(idBotao).addEventListener("click", () => {
        const input = document.getElementById(idCampo);
        if(!input.value) return;
        
        navigator.clipboard.writeText(input.value);
        mostrarToast("Copiado para a área de transferência.");
    });
}

function mostrarToast(mensagem) {
    const toast = document.getElementById("toast-notificacao");
    toast.textContent = mensagem;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
}

configurarCopia("btn-copiar-senha", "campo-senha");
configurarCopia("btn-copiar-resultado", "campo-resultado");

// Inicialização
gerarSenha();