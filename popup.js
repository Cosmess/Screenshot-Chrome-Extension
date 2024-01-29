document.getElementById('captureButton').addEventListener('click', function() {
    console.log('printou')
    captureScreen()
  });
  
  function captureScreen() {
    const data = new Date();
    const currentDate = data.toDateString();
    const currenthour = data.getHours();
    const minutes = data.getMinutes();
    const seconds = data.getSeconds();


    chrome.tabs.captureVisibleTab(null, { format: 'png' }, function(dataUrl) {
      var imageData = dataUrl.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
      console.log('printou')
      chrome.downloads.download({
        url: imageData,
        filename: `${currentDate+'_'+currenthour+minutes+seconds}.png`
      });


      
    // Cria um elemento de imagem para copiar para a área de transferência
    var img = new Image();
    img.src = dataUrl;

    // Adiciona um manipulador de eventos para garantir que a imagem esteja carregada antes de copiar para a área de transferência
    img.onload = function() {
      // Cria um canvas temporário
      var canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width, img.height);

      // Copia a imagem para a área de transferência
      canvas.toBlob(function(blob) {
        var item = new ClipboardItem({ 'image/png': blob });
        navigator.clipboard.write([item]).then(function() {
          console.log('Imagem copiada para a área de transferência!');
        }).catch(function(err) {
          console.error('Erro ao copiar para a área de transferência:', err);
        });
      }, 'image/png');
    };

    
    });

    
  }
  