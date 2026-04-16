// Link correto da sua planilha (com /copy no final)
const PLANILHA_COPY_LINK = "https://docs.google.com/spreadsheets/d/1WDAbK79HB5j090J7E5o0kBGcXqDqtnXVmsbDdWMxRMs/copy";

// Para o QR Code do livro, recomendo usar a página de redirecionamento
// Mas vou deixar o link direto da planilha funcionando também
const QR_CODE_TARGET = PLANILHA_COPY_LINK;

let qrModal = document.getElementById("modalQr");
let btnQr = document.getElementById("btnQrCode");
let spanFechar = document.querySelector(".fechar");
let qrContainer = document.getElementById("qrCodeContainer");

// Carrega a biblioteca QRCode dinamicamente
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
    qrContainer.innerHTML = "";
    if (window.QRCode) {
        new QRCode(qrContainer, {
            text: QR_CODE_TARGET,
            width: 220,
            height: 220,
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
                width: 220,
                height: 220,
                colorDark: "#00596B",
                colorLight: "#ffffff"
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

// Pré-visualização no card
const qrPreviewPlace = document.getElementById("qrPreviewPlaceholder");
if (qrPreviewPlace) {
    qrPreviewPlace.innerHTML = "📘 QR Code do livro<br><span style='font-size:0.7rem;'>Clique no botão ao lado →</span>";
}
