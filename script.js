document.addEventListener("DOMContentLoaded", function() {
  const carousel = document.querySelector('.carousel');
  const images = carousel.querySelectorAll('img');
  const thumbnailsContainer = document.querySelector('.thumbnails-container');
  const thumbnails = thumbnailsContainer.querySelectorAll('.thumbnails img');
  const title = document.getElementById('title');
  const prevThumbBtn = document.getElementById('prevThumbBtn');
  const nextThumbBtn = document.getElementById('nextThumbBtn');
  const prevBtn = document.getElementById('prevBtn');
  const playBtn = document.getElementById('playBtn');
  const nextBtn = document.getElementById('nextBtn');
  const randomBtn = document.getElementById('randomBtn');
  const toggleToolbarBtn = document.getElementById('toggleToolbar');
  const toolbar = document.querySelector('.toolbar');

  let currentIndex = 0;
  let currentPage = 0;
  let isPlaying = false;
  let timer;

  const thumbnailsPerPage = 5;
  const totalPages = Math.ceil(thumbnails.length / thumbnailsPerPage);

  function showImage(index) {
    images.forEach((image, i) => {
      image.style.display = i === index ? 'block' : 'none';
    });
    updateTitle(index);
  }

  function updateTitle(index) {
    title.textContent = `Image ${index + 1}`;
  }

  function showThumbnailPage(page) {
    thumbnails.forEach((thumbnail, index) => {
      const start = thumbnailsPerPage * page;
      const end = start + thumbnailsPerPage;
      thumbnail.style.display = (index >= start && index < end) ? 'inline-block' : 'none';
    });
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
    currentPage = Math.floor(currentIndex / thumbnailsPerPage);
    showThumbnailPage(currentPage);
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
    currentPage = Math.floor(currentIndex / thumbnailsPerPage);
    showThumbnailPage(currentPage);
  }

  function nextThumbnail() {
    currentPage = (currentPage < totalPages - 1) ? currentPage + 1 : 0;
    showThumbnailPage(currentPage);
  }

  function prevThumbnail() {
    currentPage = (currentPage > 0) ? currentPage - 1 : totalPages - 1;
    showThumbnailPage(currentPage);
  }

  function togglePlay() {
    if (isPlaying) {
      clearInterval(timer);
    } else {
      timer = setInterval(nextImage, 2000);
    }
    isPlaying = !isPlaying;
    playBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i> Pause' : '<i class="fas fa-play"></i> Play';
  }

  function randomImage() {
    if (isPlaying) {
      clearInterval(timer);
    } else {
      timer = setInterval(() => {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * images.length);
        } while (randomIndex === currentIndex);
        currentIndex = randomIndex;
        showImage(currentIndex);
      }, 2000);
    }
    isPlaying = !isPlaying;
    playBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i> Pause' : '<i class="fas fa-play"></i> Play';
  }

  function toggleToolbar(event) {
    event.preventDefault();
    toolbar.classList.toggle('hidden');
    thumbnailsContainer.style.visibility = thumbnailsContainer.style.visibility === 'hidden' ? 'visible' : 'hidden';
  }

  // Event Listeners
  prevThumbBtn.addEventListener('click', prevThumbnail);
  nextThumbBtn.addEventListener('click', nextThumbnail);
  prevBtn.addEventListener('click', prevImage);
  playBtn.addEventListener('click', togglePlay);
  nextBtn.addEventListener('click', nextImage);
  randomBtn.addEventListener('click', randomImage);
  toggleToolbarBtn.addEventListener('click', toggleToolbar);

  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
      currentIndex = index;
      showImage(currentIndex);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      prevImage();
    } else if (event.key === 'ArrowRight') {
      nextImage();
    }
  });

  
  showImage(currentIndex);
  showThumbnailPage(currentPage);
});
