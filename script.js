const upload_box = document.querySelector(".upload-box");
const content = document.querySelector(".content");
const inp = document.querySelector(".file");
const inpImage = document.querySelector("#preview");
const cmpImage = document.querySelector(".CompressedImage");
const compressBtn = document.querySelector(".btn");
const FileName = document.querySelector(".FileName");
const CompressedImageContainer = document.querySelector(".CompressedImageContainer",);
const reset = document.querySelector(".reset");
const formatSelector = document.querySelector(".Format_Selector")
let file = null;
upload_box.addEventListener("click", () => {
  inp.click();
});
inp.addEventListener("change", () => {
  file = inp.files[0];
  inpImage.src = URL.createObjectURL(file);
  inpImage.style.display = "block";
  content.style.display = "none";
  formatSelector.style.display = "block"
  const div = document.createElement("div");
  div.innerHTML = ` <span class="material-symbols-outlined"> image </span>
        <p>${file.name} (${(file.size / 1024).toFixed(2)} KB)</p>
        <span class="material-symbols-rounded" id="close"> close </span>`;
  FileName.appendChild(div);
  div.querySelector(".material-symbols-rounded").addEventListener("click",() => {
    file = null
    inpImage.style.display = "none";
    content.style.display = "block";
    formatSelector.style.display = "none"
    div.remove()
  })
});
compressBtn.addEventListener("click", () => {
  if (!file) {
    alert("Please select an image");
    return
  }
  const format = document.querySelector("#format").value
  console.log(format)
  const img = new Image();
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (e) => {
    img.src = e.target.result;
  };
  img.onload = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.height = img.height;
    canvas.width = img.width;
    context.drawImage(img, 0, 0);
    canvas.toBlob(
      (blob) => {
        const CompressedImageFile = new File(
          [blob],
          `${file.name.split(".")[0]}_compressed.${format.split("/")[1]}`,
          { type: format },
        );
        CompressedImageContainer.style.display = "block";
        const div2 = document.createElement("div");
        div2.innerHTML = `<span class="material-symbols-outlined"> image </span>
        <p>${CompressedImageFile.name} (${(blob.size / 1024).toFixed(2)} KB)</p>
        <span class="material-symbols"> download </span>`;
        document
          .querySelector(".CompressedImageContainer .FileName")
          .appendChild(div2);
        div2.querySelector(".material-symbols").addEventListener("click",() => {
          const link = document.createElement("a")
          link.href = URL.createObjectURL(CompressedImageFile)
          link.download = CompressedImageFile.name
          link.click()
          URL.revokeObjectURL(link.href)
        })
      },
      format,
      0.7,
    );
  };
});
reset.addEventListener("click", () => {
  file = null;
  inp.value = null;
  inpImage.src = "";
  inpImage.style.display = "none";
  content.style.display = "block";
  FileName.innerHTML = "";
  CompressedImageContainer.style.display = "none";
   formatSelector.style.display = "none"
  document.querySelector(".CompressedImageContainer .FileName").innerHTML = "";
});
