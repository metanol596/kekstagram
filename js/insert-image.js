const FILE_TYPES = ['.jpeg', '.jpg', '.png', '.WebP'];

const fileChooser = document.querySelector('.img-upload__input');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const isEndsWith = FILE_TYPES.some((is) => {
    return fileName.endsWith(is);
  });

  if (isEndsWith) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      imgUploadPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
})
