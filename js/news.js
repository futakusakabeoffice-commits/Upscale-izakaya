(() => {
  const categoryList = document.getElementById("categoryList");
  const postList = document.getElementById("postList");
  if (!categoryList || !postList) return;

  const categories = ["すべて", "お知らせ", "メニュー", "プレスリリース"];
  const posts = [
    { date: "2026.09.11", category: "お知らせ", title: "秋の季節メニューをはじめました" },
    { date: "2026.09.05", category: "お知らせ", title: "9月の営業日・臨時休業のご案内" },
    { date: "2026.08.28", category: "メニュー", title: "新しい銘柄地鶏の取り扱いを開始しました" },
    { date: "2026.08.12", category: "プレスリリース", title: "グルメ雑誌「食楽日和」に掲載いただきました" },
    { date: "2026.07.30", category: "メニュー", title: "夏の一品料理と、冷酒の入荷について" },
    { date: "2026.07.02", category: "お知らせ", title: "個室の貸切利用を4名様から承ります" }
  ];

  let activeCategory = "すべて";

  function renderCategories() {
    categoryList.innerHTML = "";
    const label = document.createElement("p");
    label.className = "category-list__label";
    label.textContent = "CATEGORY";
    categoryList.appendChild(label);

    categories.forEach((cat) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("aria-pressed", String(cat === activeCategory));
      btn.innerHTML = `<span class="dot"></span>${cat}`;
      btn.addEventListener("click", () => {
        activeCategory = cat;
        renderCategories();
        renderPosts();
      });
      categoryList.appendChild(btn);
    });
  }

  function renderPosts() {
    const filtered = activeCategory === "すべて" ? posts : posts.filter((p) => p.category === activeCategory);
    postList.innerHTML = "";

    if (filtered.length === 0) {
      const empty = document.createElement("p");
      empty.className = "post-list__empty";
      empty.textContent = "該当するお知らせはありません。";
      postList.appendChild(empty);
      return;
    }

    filtered.forEach((post) => {
      const row = document.createElement("a");
      row.href = "#";
      row.className = "post-row";
      row.innerHTML = `
        <span class="post-row__meta">
          <span class="post-row__date">${post.date}</span>
          <span class="post-row__cat">${post.category}</span>
        </span>
        <span class="post-row__title">${post.title}</span>
        <span class="post-row__arrow">→</span>
      `;
      postList.appendChild(row);
    });
  }

  renderCategories();
  renderPosts();
})();
