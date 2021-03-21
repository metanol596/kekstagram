
const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const removePictureNodes = () => {
  const pictureNodes = document.querySelectorAll('.picture');
  pictureNodes.forEach((pictureNode) => {
    pictureNode.remove();
  })
}

const getThumbnailsMarkup = (photos) => {
  const fragment = document.createDocumentFragment();

  photos
    .slice()
    .forEach((picture, i) => {
      const clonedTemplate = thumbnailTemplate.cloneNode(true);
      const image = clonedTemplate.querySelector('.picture__img');
      const likes = clonedTemplate.querySelector('.picture__likes');
      const comments = clonedTemplate.querySelector('.picture__comments');

      image.dataset.number = i;
      image.src = picture.url;
      likes.textContent = picture.likes;
      comments.textContent = picture.comments.length;

      fragment.appendChild(clonedTemplate);
    });
  removePictureNodes();

  return fragment;
}

export { getThumbnailsMarkup, removePictureNodes };
