document.querySelectorAll(".note-card").forEach((card) => {
  const time = card.querySelector(".note-time");
  const content = card.querySelector(".note-content");
  const textarea = card.querySelector(".note-textarea");

  const viewButtons = card.querySelector(".buttons-view");
  const editButtons = card.querySelector(".buttons-edit");

  const btnEdit = card.querySelector(".btn-edit");
  const btnCancel = card.querySelector(".btn-cancel");
  const btnSubmit = card.querySelector(".btn-submit");

  btnEdit.addEventListener("click", (e) => {
    e.preventDefault();

    time.classList.add("d-none"); // hide time
    content.classList.add("d-none"); // hide text
    textarea.classList.remove("d-none"); // show textarea
    // textarea.value = content.textContent;

    viewButtons.classList.add("d-none");
    editButtons.classList.remove("d-none");
  });

  btnCancel.addEventListener("click", (e) => {
    e.preventDefault();

    textarea.value = content.textContent; // restore original text

    time.classList.remove("d-none");
    content.classList.remove("d-none");
    textarea.classList.add("d-none");

    editButtons.classList.add("d-none");
    viewButtons.classList.remove("d-none");
  });

  btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();

    const newContent = textarea.value;

    // Update UI
    content.textContent = newContent;

    time.classList.remove("d-none");
    content.classList.remove("d-none");
    textarea.classList.add("d-none");

    editButtons.classList.add("d-none");
    viewButtons.classList.remove("d-none");

    // You can send AJAX to server here to save the updated text
    console.log("Save this:", {
      id: card.dataset.id,
      content: newContent,
    });
  });
});

const panel = document.getElementById("addNotePanel");
const textarea = document.getElementById("newNoteText");
const btnSubmit = document.getElementById("submitNoteBtn");
const btnCancel = document.getElementById("cancelNoteBtn");

btnCancel.addEventListener("click", () => {
  textarea.value = ""; // clear text
});

// Submit new note
btnSubmit.addEventListener("click", async () => {
  const noteText = textarea.value.trim();
  if (!noteText) return;

  const bookId = window.location.pathname.split("/")[2];
  const res = await fetch("/add-note", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bookId: bookId,
      content: noteText,
    }),
  });

  const data = await res.json();
  window.location.reload();
});
