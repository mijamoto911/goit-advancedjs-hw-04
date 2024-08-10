export const createGalleryCard = ({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => {
  return `
    <li class="gallery-card">
      <a href="${largeImageURL}" class="gallery-link">
        <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
      </a>
      <div class="gallery-card-info">
        <p><strong>Likes:</strong> ${likes}</p>
        <p><strong>Views:</strong> ${views}</p>
        <p><strong>Comments:</strong> ${comments}</p>
        <p><strong>Downloads:</strong> ${downloads}</p>
      </div>
    </li>
  `;
};
