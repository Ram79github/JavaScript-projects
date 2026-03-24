const users = [
  {
    name: "Ram Krishna",
    img: "https://i.pravatar.cc/96?img=12",
    bio: "Frontend developer who loves clean UI and animations.",
  },
  {
    name: "Aman Singh",
    img: "https://i.pravatar.cc/96?img=32",
    bio: "Backend engineer focused on APIs, performance, and databases.",
  },
  {
    name: "Neha Patel",
    img: "https://i.pravatar.cc/96?img=5",
    bio: "UI/UX designer building simple, beautiful design systems.",
  },
  {
    name: "Vikram Kumar",
    img: "https://i.pravatar.cc/96?img=18",
    bio: "Full‑stack dev shipping fast products with modern web tools.",
  },
  {
    name: "Priya Sharma",
    img: "https://i.pravatar.cc/96?img=41",
    bio: "QA engineer who enjoys automation and clean test reports.",
  },
  {
    name: "Arjun Verma",
    img: "https://i.pravatar.cc/96?img=24",
    bio: "Mobile developer creating smooth Android apps and UI flows.",
  },
];

function showUser(arr) {
  const cards = document.querySelector(".cards");
  if (!cards) return;

  arr.forEach((user) => {
     // Create outer card div
     const card = document.createElement("div");
     card.classList.add("card");
 
     // Create image
     const img = document.createElement("img");
     img.src = user.img;
     img.alt = user.name;
     img.classList.add("bg-img");
 
     // Create blurred-layer div
     const blurredLayer = document.createElement("div");
     blurredLayer.style.backgroundImage = `url(${user.img})`;
     blurredLayer.classList.add("blurred-layer");
 
     // Create content div
     const content = document.createElement("div");
     content.classList.add("content");
 
     // Create h3 and paragraph
     const heading = document.createElement("h3");
     heading.textContent = user.name;
 
     const para = document.createElement("p");
     para.textContent = user.bio;
 
     // Append heading and paragraph to content
     content.appendChild(heading);
     content.appendChild(para);
 
     // Append all to card
     card.appendChild(img);
     card.appendChild(blurredLayer);
     card.appendChild(content);
 
     // Finally, append card to the body or any container
     cards.appendChild(card);
   });
}
showUser(users);

const inp = document.querySelector(".inp");
const cards = document.querySelector(".cards");

if (inp && cards) {
  inp.addEventListener("input", () => {
    const q = inp.value.trim().toLowerCase();
    const newUser = !q
      ? users
      : users.filter(
          (user) =>
            user.name.toLowerCase().includes(q) ||
            user.bio.toLowerCase().includes(q)
        );

        
    cards.innerHTML = "";
    showUser(newUser);
    const alertSpan = document.querySelector(".alert");
        if (alertSpan) {
          if (newUser.length === 0) {
            alertSpan.textContent = 'No user found';
          } else {
            alertSpan.textContent = '';
          }
        }
  });
  }
  
