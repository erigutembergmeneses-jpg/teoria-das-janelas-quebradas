// GERA QR CODE DINÂMICO (URL DO LIVRO + REDIRECIONAMENTO)
const PLANILHA_URL = "https://erigutembergmeneses-jpg.github.io/teoria-das-janelas-quebradas/planilha-redirect"; 
// URL curta que leva à página de redirecionamento inteligente.
// Para simplicidade, já usamos o link que redireciona para Google Sheets.
// Mas o QR Code do livro apontará para: https://erigutembergmeneses-jpg.github.io/teoria-das-janelas-quebradas/redirect-planilha

// Melhor prática: criar uma página /redirect-planilha.html que detecta dispositivo.
// Por enquanto, o QR Code aponta diretamente para o link de cópia do Google Sheets (mais direto).
const QR_CODE_TARGET = "https://docs.google.com/spreadsheets/d/1UjZJaXwUeNJHYoP9P1ax0V3J3F0zxS42zM5B2Zd6VjU/copy";

let qrModal = document.getElementById("modalQr");
let btnQr = document.getElementById("btnQrCode");
let spanFechar = document.querySelector(".fechar");
let qrContainer = document.getElementById("qrCodeContainer");

// Carrega a biblioteca QRCode dinamicamente (sem dependência externa fixa)
function carregarQRCodeLib(callback) {
    if (window.QRCode) {
        callback();
        return;
    }
    let script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js";
    script.onload = () => callback();
    document.head.appendChild(script);
}

function exibirQRCode() {
    if (!qrContainer) return;
    qrContainer.innerHTML = ""; // limpa
    if (window.QRCode) {
        new QRCode(qrContainer, {
            text: QR_CODE_TARGET,
            width: 200,
            height: 200,
            colorDark: "#00596B",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.M
        });
    } else {
        qrContainer.innerHTML = `<p style="color:#a00">⚠️ Carregando QR Code... Aguarde.</p>`;
        carregarQRCodeLib(() => {
            qrContainer.innerHTML = "";
            new QRCode(qrContainer, {
                text: QR_CODE_TARGET,
                width: 200,
                height: 200,
                colorDark: "#00596B"
            });
        });
    }
}

btnQr.addEventListener("click", () => {
    qrModal.style.display = "flex";
    exibirQRCode();
});

spanFechar.addEventListener("click", () => {
    qrModal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === qrModal) qrModal.style.display = "none";
});

// PRÉ-VISUALIZAÇÃO DO QR NO CARD (estático)
const qrPreviewPlace = document.getElementById("qrPreviewPlaceholder");
if (qrPreviewPlace) {
    qrPreviewPlace.innerHTML = "📘 QR Code do livro<br><span style='font-size:0.7rem;'>Clique no botão ao lado →</span>";
}
