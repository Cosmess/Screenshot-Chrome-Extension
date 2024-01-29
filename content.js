function captureScreen() {
    // Captura a tela usando html2canvas
    html2canvas(document.body).then(function(canvas) {
        // Converte o canvas para uma imagem PNG
        var imageData = canvas.toDataURL("image/png");

        // Cria um link para download da imagem
        var a = document.createElement('a');
        a.href = imageData;
        a.download = 'screenshot.png';

        // Simula o clique no link para iniciar o download
        a.click();
    });
}