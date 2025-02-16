//your code here
document.addEventListener("DOMContentLoaded", function () {
  const imagesContainer = document.createElement("div");
  imagesContainer.classList.add("flex");
  document.querySelector("main").appendChild(imagesContainer);

  const images = [
    "https://picsum.photos/id/237/200/300",
    "https://picsum.photos/seed/picsum/200/300",
    "https://picsum.photos/200/300?grayscale",
    "https://picsum.photos/200/300/",
    "https://picsum.photos/200/300.jpg"
  ];
  
  const duplicateImage = images[Math.floor(Math.random() * images.length)];
  const allImages = [...images, duplicateImage];
  allImages.sort(() => Math.random() - 0.5);

  let selectedImages = [];

  const message = document.createElement("h3");
  message.id = "h";
  message.textContent = "Please click on the identical tiles to verify that you are not a robot.";
  document.querySelector("main").prepend(message);

  const resultMessage = document.createElement("p");
  resultMessage.id = "para";
  document.querySelector("main").appendChild(resultMessage);

  const resetButton = document.createElement("button");
  resetButton.id = "reset";
  resetButton.textContent = "Reset";
  resetButton.style.display = "none";
  document.querySelector("main").appendChild(resetButton);

  const verifyButton = document.createElement("button");
  verifyButton.id = "verify";
  verifyButton.textContent = "Verify";
  verifyButton.style.display = "none";
  document.querySelector("main").appendChild(verifyButton);

  allImages.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.dataset.index = index;
    img.addEventListener("click", () => handleImageClick(img));
    imagesContainer.appendChild(img);
  });

  function handleImageClick(img) {
    if (selectedImages.length >= 2) return;
    if (selectedImages.includes(img)) return;
    img.classList.add("selected");
    selectedImages.push(img);
    resetButton.style.display = "block";
    if (selectedImages.length === 2) {
      verifyButton.style.display = "block";
    }
  }

  resetButton.addEventListener("click", () => {
    selectedImages.forEach(img => img.classList.remove("selected"));
    selectedImages = [];
    resetButton.style.display = "none";
    verifyButton.style.display = "none";
    resultMessage.textContent = "";
  });

  verifyButton.addEventListener("click", () => {
    if (selectedImages.length === 2) {
      if (selectedImages[0].src === selectedImages[1].src) {
        resultMessage.textContent = "You are a human. Congratulations!";
      } else {
        resultMessage.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
      }
      verifyButton.style.display = "none";
    }
  });
});