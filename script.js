//your code here
const images = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/seed/picsum/200/300",
  "https://picsum.photos/200/300?grayscale",
  "https://picsum.photos/200/300/",
  "https://picsum.photos/200/300.jpg"
];

let duplicatedImageIndex = Math.floor(Math.random() * images.length);
images.push(images[duplicatedImageIndex]);

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffle(images);

const imageContainer = document.getElementById("image-container");
let selectedImages = [];
images.forEach((imageSrc, index) => {
  const img = document.createElement("img");
  img.src = imageSrc;
  img.dataset.index = index;
  img.addEventListener("click", handleImageClick);
  imageContainer.appendChild(img);
});

const resetButton = document.getElementById("reset");
const verifyButton = document.getElementById("verify");
const message = document.getElementById("para");

resetButton.addEventListener("click", reset);
verifyButton.addEventListener("click", verify);

function handleImageClick(event) {
  const img = event.target;
  if (!selectedImages.includes(img)) {
    img.classList.add("selected");
    selectedImages.push(img);

    if (selectedImages.length >= 1) {
      resetButton.style.display = "block";
    }

    if (selectedImages.length === 2) {
      verifyButton.style.display = "block";
    }
  }
}

function reset() {
  selectedImages.forEach(img => img.classList.remove("selected"));
  selectedImages = [];
  resetButton.style.display = "none";
  verifyButton.style.display = "none";
  message.textContent = "";
}

function verify() {
  if (selectedImages[0].src === selectedImages[1].src) {
    message.textContent = "You are a human. Congratulations!";
  } else {
    message.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }
  verifyButton.style.display = "none";
}
