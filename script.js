document.addEventListener("DOMContentLoaded", function() {
  const carousel = document.querySelector('.carousel');
  const images = carousel.querySelectorAll('img');
  const thumbnailsContainer = document.querySelector('.thumbnails');
  const thumbnails = thumbnailsContainer.querySelectorAll('img');
  const title = document.getElementById('title');
  const prevThumbBtn = document.getElementById('prevThumbBtn');
  const nextThumbBtn = document.getElementById('nextThumbBtn');
  let currentIndex = 0;

  const thumbnailsPerPage = 5; // Number of thumbnails per page
  let currentPage = 0;
  const totalPages = Math.ceil(thumbnails.length / thumbnailsPerPage);

  function showImage(index) {
    images.forEach((image, i) => {
      if (i === index) {
        image.style.display = 'block';
      } else {
        image.style.display = 'none';
      }
    });
    title.textContent = `Image ${index + 1}`;
  }

  function showThumbnailPage(page) {
    thumbnails.forEach((thumbnail, index) => {
      const start = thumbnailsPerPage * page;
      const end = start + thumbnailsPerPage;
      if (index >= start && index < end) {
        thumbnail.style.display = 'inline-block';
      } else {
        thumbnail.style.display = 'none';
      }
    });
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
    currentPage = Math.floor(currentIndex / thumbnailsPerPage); // Update currentPage
    showThumbnailPage(currentPage);
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
    currentPage = Math.floor(currentIndex / thumbnailsPerPage); // Update currentPage
    showThumbnailPage(currentPage);
  }

  function nextThumbnail() {
    if (currentPage < totalPages - 1) {
      currentPage++;
    } else {
      currentPage = 0; // Loop back to the first page
    }
    showThumbnailPage(currentPage);
  }

  function prevThumbnail() {
    if (currentPage > 0) {
      currentPage--;
    } else {
      currentPage = totalPages - 1; // Loop to the last page
    }
    showThumbnailPage(currentPage);
  }

  document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
      prevImage();
    } else if (event.key === 'ArrowRight') {
      nextImage();
    }
  });

  prevThumbBtn.addEventListener('click', prevThumbnail);
  nextThumbBtn.addEventListener('click', nextThumbnail);

  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', function() {
      currentIndex = index;
      showImage(currentIndex);
    });
  });

  showImage(currentIndex);
  showThumbnailPage(currentPage);
});


document.addEventListener("DOMContentLoaded", function() {
  const toolbar = document.querySelector('.toolbar');
  const thumbnailsContainer = document.querySelector('.thumbnails-container');
  const toggleToolbarBtn = document.getElementById('toggleToolbar');

  toggleToolbarBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default action of the hyperlink

    toolbar.classList.toggle('hidden');
    if (thumbnailsContainer.style.visibility === 'hidden') {
      thumbnailsContainer.style.visibility = 'visible'; // Show thumbnails if currently hidden
    } else {
      thumbnailsContainer.style.visibility = 'hidden'; // Hide thumbnails if currently visible
    }
  });
});
document.addEventListener("DOMContentLoaded", function() {
  const images = document.querySelectorAll('.carousel img');
  const toolbar = document.querySelector('.toolbar');
  const prevBtn = document.getElementById('prevBtn');
  const playBtn = document.getElementById('playBtn');
  const nextBtn = document.getElementById('nextBtn');
  const randomBtn = document.getElementById('randomBtn');
  let currentIndex = 0;
  let isPlaying = false;
  let timer;

  // Function to show the current image
  function showImage(index) {
    images.forEach((image, i) => {
      if (i === index) {
        image.style.display = 'block';
      } else {
        image.style.display = 'none';
      }
    });
  }

  // Function to move to the previous image
  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  }

  // Function to move to the next image
  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }

  // Function to toggle play/pause
  function togglePlay() {
    if (isPlaying) {
      clearInterval(timer);
      isPlaying = false;
      playBtn.innerHTML = '<i class="fas fa-play"></i> Play';
    } else {
      timer = setInterval(nextImage, 2000); // Change the image every 2 seconds
      isPlaying = true;
      playBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
    }
  }

  // Function to move to a random image
  function randomImage() {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * images.length);
    } while (randomIndex === currentIndex); // Keep generating random index until it's different from the current index
    showImage(randomIndex);
  }
  // Add event listeners to the toolbar buttons
  prevBtn.addEventListener('click', prevImage);
  playBtn.addEventListener('click', togglePlay);
  nextBtn.addEventListener('click', nextImage);
  randomBtn.addEventListener('click', randomImage);

  // Add event listener for spacebar key press
  document.addEventListener('keydown', function(event) {
    if (event.key === ' ') { // Check if spacebar is pressed
      togglePlay(); // Toggle play/pause
    }
  });
});
document.addEventListener("DOMContentLoaded", function() {
  const images = document.querySelectorAll('.carousel img');
  const toolbar = document.querySelector('.toolbar');
  const prevBtn = document.getElementById('prevBtn');
  const playBtn = document.getElementById('playBtn');
  const nextBtn = document.getElementById('nextBtn');
  const randomBtn = document.getElementById('randomBtn');
  const title = document.getElementById('title'); // Get the title element
  let currentIndex = 0;
  let isPlaying = false;
  let timer;

  // Function to show the current image
  function showImage(index) {
    images.forEach((image, i) => {
      if (i === index) {
        image.style.display = 'block';
      } else {
        image.style.display = 'none';
      }
    });
  }

  // Function to move to the previous image
  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
    updateTitle(); // Update title after changing image
  }

  // Function to move to the next image
  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
    updateTitle(); // Update title after changing image
  }

  // Function to toggle play/pause
  function togglePlay() {
    if (isPlaying) {
      clearInterval(timer);
      isPlaying = false;
      playBtn.innerHTML = '<i class="fas fa-play"></i> Play';
    } else {
      timer = setInterval(nextImage, 2000); // Change the image every 2 seconds
      isPlaying = true;
      playBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
      updateTitle(); // Update title when starting slideshow
    }
  }

  // Function to move to a random image
  function randomImage() {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * images.length);
    } while (randomIndex === currentIndex); // Keep generating random index until it's different from the current index
    currentIndex = randomIndex;
    showImage(currentIndex);
    updateTitle(); // Update title after changing image
  }

  // Function to update the title to the current image
  function updateTitle() {
    title.textContent = `Image ${currentIndex + 1}`;
  }

  // Add event listeners to the toolbar buttons
  prevBtn.addEventListener('click', prevImage);
  playBtn.addEventListener('click', togglePlay);
  nextBtn.addEventListener('click', nextImage);
  randomBtn.addEventListener('click', randomImage);

  // Add event listener for spacebar key press
  document.addEventListener('keydown', function(event) {
    if (event.key === ' ') { // Check if spacebar is pressed
      togglePlay(); // Toggle play/pause
    }
  });

  // Show the initial image and update the title
  showImage(currentIndex);
  updateTitle();
});
