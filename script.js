const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyPuN-SpdtTtn6Nlz1Vn1LRlFMz2wEPFeVWDMX7HcGmOty4CgxL0Pc9plgL-JUh00eE/exec";

const form = document.getElementById("guestForm");
const submitBtn = document.getElementById("submitBtn");
const formStatus = document.getElementById("formStatus");

const allergyFlag = document.getElementById("allergyFlag");
const allergyTextRow = document.getElementById("allergyTextRow");

allergyFlag.addEventListener("change", () => {
  if (allergyFlag.value === "Да") {
    allergyTextRow.classList.remove("hidden");
  } else {
    allergyTextRow.classList.add("hidden");
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  formStatus.textContent = "";
  submitBtn.disabled = true;
  submitBtn.textContent = "Отправка...";

  const formData = new FormData(form);

  const payload = {};
  formData.forEach((value, key) => {
    payload[key] = value.trim();
  });

  payload.timestamp = new Date().toISOString();

  try {
    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Ошибка отправки");
    }

    window.location.href = "success.html";

  } catch (err) {
    formStatus.textContent = "Ошибка. Попробуйте ещё раз или напишите Лизе.";
    submitBtn.disabled = false;
    submitBtn.textContent = "Отправить";
  }
});
