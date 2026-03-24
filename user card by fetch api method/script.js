function getUsers() {
  const res = fetch("https://randomuser.me/api/?results=3")
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".main").innerHTML = "";
      data.results.forEach((user) => {
        // Create card container
        const card = document.createElement("div");
        card.className =
          "bg-gray-800 shadow-xl rounded-2xl p-6 w-80 text-center border border-gray-700";

        // Profile Image
        const img = document.createElement("img");
        img.src = user.picture.large;
        img.alt = "Profile Image";
        img.className =
          "w-24 h-24 mx-auto rounded-full border-4 border-indigo-500";

        // Full Name
        const name = document.createElement("h2");
        name.textContent = user.name.first + " " + user.name.last;
        name.className = "mt-4 text-xl font-semibold text-white";

        // email
        const email = document.createElement("p");
        email.textContent = user.email;
        email.className = "mt-2 text-sm text-gray-400";
        //status
        const status = document.createElement("p");
        status.textContent = user.status;
        status.className = "mt-2 text-sm text-gray-400";

        // Append elements
        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(email);
        card.appendChild(status);

        // Add to main div
        document.querySelector(".main").appendChild(card);
      });
    })
    .catch((err) => console.log(err));
}
getUsers();

document.querySelector("#refreshBtn").addEventListener("click", () => {
  getUsers();
});
