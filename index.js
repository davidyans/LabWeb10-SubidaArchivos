const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const preview = document.getElementById('preview');

const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
const maxFileSize = 5 * 1024 * 1024; // 5 MB in bytes

fileInput.addEventListener('change', function(event) {
  const selectedFile = event.target.files[0];

  if (!selectedFile) {
    fileInfo.innerHTML = 'Ningún archivo seleccionado.';
    preview.style.display = 'none';
    return;
  }

  if (!allowedTypes.includes(selectedFile.type)) {
    fileInfo.innerHTML = 'Tipo de archivo no admitido. Por favor, elige un archivo .jpg, .png o .gif.';
    preview.style.display = 'none';
    return;
  }

  if (selectedFile.size > maxFileSize) {
    fileInfo.innerHTML = 'El tamaño del archivo excede el límite de 5 MB.';
    preview.style.display = 'none';
    return;
  }

  fileInfo.innerHTML = `
    Nombre del archivo: ${selectedFile.name}<br>
    Tipo MIME: ${selectedFile.type}<br>
    Tamaño: ${selectedFile.size} bytes
  `;

  preview.style.display = 'block';

  const reader = new FileReader();
  reader.onload = function(e) {
    preview.src = e.target.result;
  };

  reader.readAsDataURL(selectedFile);
});
