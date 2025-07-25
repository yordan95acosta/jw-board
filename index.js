document.addEventListener("DOMContentLoaded", () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDJOuwebgrENgfgUrkziFnnNIwvh4PRq9Q",
    authDomain: "jwboard-2a83a.firebaseapp.com",
    projectId: "jwboard-2a83a",
    storageBucket: "jwboard-2a83a.appspot.com",
    messagingSenderId: "221707565673",
    appId: "1:221707565673:web:57309faa326e8508d840f8"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  const board = document.getElementById("board");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || "Preview";
    lightbox.style.display = "flex";
  }

  lightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
    lightboxImg.src = "";
  });

  async function loadAnnouncements() {
    try {
      const snapshot = await db.collection("announcements")
        .orderBy("timestamp", "desc")
        .get();

      board.innerHTML = "";

      if (snapshot.empty) {
        board.innerHTML = "<p style='text-align:center; color:#666;'>No announcements yet.</p>";
        return;
      }

      snapshot.forEach(doc => {
        const data = doc.data();

        const card = document.createElement("div");
        card.className = "card";

        const title = document.createElement("h3");
        title.textContent = data.title || "(No title)";
        card.appendChild(title);

        if (data.description) {
          const desc = document.createElement("p");
          desc.textContent = data.description;
          card.appendChild(desc);
        }

        if (data.fileUrl) {
          if (/\.(jpg|jpeg|png|gif|webp)$/i.test(data.fileUrl)) {
            const img = document.createElement("img");
            img.src = data.fileUrl;
            img.alt = data.title || "Announcement image";
            img.style.cursor = "pointer";
            img.addEventListener("click", () => openLightbox(data.fileUrl, data.title));
            card.appendChild(img);
          } else {
            const link = document.createElement("a");
            link.href = data.fileUrl;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = "View Document";
            card.appendChild(link);
          }
        }

        board.appendChild(card);
      });
    } catch (error) {
      board.innerHTML = `<p style="color:red; text-align:center;">Error loading announcements: ${error.message}</p>`;
      console.error(error);
    }
  }

  loadAnnouncements();
});
