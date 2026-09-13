(() => {
  const form = document.getElementById("reserveForm");
  if (!form) return;

  const thanksPanel = document.getElementById("thanksPanel");
  const resetFormBtn = document.getElementById("resetFormBtn");
  const inputName = document.getElementById("inputName");
  const inputTel = document.getElementById("inputTel");
  const inputDate = document.getElementById("inputDate");
  const inputTime = document.getElementById("inputTime");
  const inputNote = document.getElementById("inputNote");
  const partyChips = document.getElementById("partyChips");
  const seatChips = document.getElementById("seatChips");
  const formSummary = document.getElementById("formSummary");

  const state = { party: "2名", seat: "カウンター" };

  function setupChipGroup(container, onChange) {
    container.addEventListener("click", (e) => {
      const btn = e.target.closest(".chip-btn");
      if (!btn) return;
      [...container.querySelectorAll(".chip-btn")].forEach((b) => b.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
      onChange(btn.dataset.value);
      updateSummary();
    });
  }

  setupChipGroup(partyChips, (v) => (state.party = v));
  setupChipGroup(seatChips, (v) => (state.seat = v));

  function updateSummary() {
    const dateLabel = inputDate.value || "日付未定";
    formSummary.textContent = `${dateLabel} ${inputTime.value} ／ ${state.party} ／ ${state.seat}`;
  }
  inputDate.addEventListener("change", updateSummary);
  inputTime.addEventListener("change", updateSummary);

  function setError(fieldId, errorId, message) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(errorId);
    if (message) {
      field.classList.add("has-error");
      errorEl.textContent = message;
    } else {
      field.classList.remove("has-error");
      errorEl.textContent = "";
    }
  }

  function validate() {
    let valid = true;

    if (!inputName.value.trim()) {
      setError("fieldName", "errorName", "お名前をご入力ください");
      valid = false;
    } else {
      setError("fieldName", "errorName", "");
    }

    const digits = inputTel.value.replace(/[-\s]/g, "");
    if (!/^0\d{9,10}$/.test(digits)) {
      setError("fieldTel", "errorTel", "電話番号を数字でご入力ください");
      valid = false;
    } else {
      setError("fieldTel", "errorTel", "");
    }

    if (!inputDate.value) {
      setError("fieldDate", "errorDate", "ご希望日をお選びください");
      valid = false;
    } else {
      const d = new Date(inputDate.value + "T00:00:00");
      const min = new Date();
      min.setHours(0, 0, 0, 0);
      min.setDate(min.getDate() + 2);
      if (d < min) {
        setError("fieldDate", "errorDate", "2日後以降の日付をお選びください");
        valid = false;
      } else if (d.getDay() === 0) {
        setError("fieldDate", "errorDate", "日曜日は定休日です");
        valid = false;
      } else {
        setError("fieldDate", "errorDate", "");
      }
    }

    return valid;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) return;
    form.hidden = true;
    thanksPanel.hidden = false;
  });

  resetFormBtn.addEventListener("click", () => {
    form.reset();
    [...partyChips.querySelectorAll(".chip-btn")].forEach((b) => b.setAttribute("aria-pressed", b.dataset.value === "2名" ? "true" : "false"));
    [...seatChips.querySelectorAll(".chip-btn")].forEach((b) => b.setAttribute("aria-pressed", b.dataset.value === "カウンター" ? "true" : "false"));
    state.party = "2名";
    state.seat = "カウンター";
    setError("fieldName", "errorName", "");
    setError("fieldTel", "errorTel", "");
    setError("fieldDate", "errorDate", "");
    updateSummary();
    thanksPanel.hidden = true;
    form.hidden = false;
  });

  updateSummary();
})();
