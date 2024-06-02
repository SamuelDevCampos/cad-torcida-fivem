

const webhookUrl = 'https://discord.com/api/webhooks/1246702655221268501/-1O792eM4g7M7lHqs5FEfnBpwy1x4746brt4qQ9j4CcDR_rjAU6BKbPSacYU8Cyvh1ev';
const DadosForm = document.getElementById('dados-form');
const btnEnviar = document.getElementById('btnEnviar');


if (DadosForm) {

    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    var randomString = '';

    for (var i = 0; i < 12; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    document.getElementById('randomString').textContent = 'Chave de autenticação: #Fivem-' + randomString + '-Torcidas';

}

DadosForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var table = document.getElementById('formulario');
    html2canvas(table).then(function (canvas) {

        const nomeTO = document.getElementById('nomeTO').value;

        var imgData = canvas.toDataURL('image/jpeg');
        var link = document.createElement('a');
        link.href = imgData;
        link.download = nomeTO;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        var Msg = `Cadastro: ${nomeTO} - 'Chave de autenticação:  #Fivem-'${randomString}-Torcidas - @everyone`;

        EnviarMsg(">>> " + Msg + "", imgData);

    });


    function EnviarMsg(msg, file) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", webhookUrl);
        const formData = new FormData();
        formData.append('content', msg);
        formData.append('username', 'Campos Dev');
        formData.append('avatar_url', '');
        var blob = dataURItoBlob(file);
        formData.append('file', blob, 'imagem.jpeg');
        xhr.send(formData);

        alert('Enviado');

    }


    function dataURItoBlob(dataURI) {
        var byteString = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    }

    DadosForm.reset();


});


document.getElementById('imageInput').addEventListener('change', function (event) {

    var imgElement = document.getElementById('Imgs');

    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            imgElement.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});


