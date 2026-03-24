let pgBar = document.querySelector("#progressBar");
let pgText = document.querySelector("#progressText");
let btn = document.querySelector("button");
let count = 0;
let sec = 60; // change this sec value efect the download progress in sec(fast,slow);

btn.addEventListener("click", () => {
  let interval = setInterval(
    () => {
      if (count <= 99) {
        count++;
        pgBar.style.width = `${count}%`;
        pgText.textContent = `${count}%`;
      } else {
        document.querySelector("h2").textContent = "Downloaded.";
        clearInterval(interval);
      }
    },
    (sec * 1000) / 100,
  );
});
