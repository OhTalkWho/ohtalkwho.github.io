document.getElementById("grammar-form").addEventListener("submit", function(e) {
  e.preventDefault();

  // Get selected levels
  const selectedLevels = Array.from(document.querySelectorAll("input[type=checkbox]:checked"))
    .map(cb => cb.value);

  const count = parseInt(document.getElementById("count").value, 10);
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (selectedLevels.length === 0) {
    resultsDiv.innerHTML = "<p style='color:red;'>Please select at least one JLPT level.</p>";
    return;
  }

  // Filter grammarData by selected levels
  const filtered = grammarData.filter(item => selectedLevels.includes(item.level));

  if (filtered.length === 0) {
    resultsDiv.innerHTML = "<p style='color:red;'>No grammar points found for the selected levels.</p>";
    return;
  }

  // Shuffle and pick random grammar points
  const shuffled = filtered.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count);

  // Display results
  selected.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("grammar-card");
    card.innerHTML = `
      <h3>${item.grammar} (${item.level})</h3>
      <p><strong>Reading:</strong> ${item.reading}</p>
      <p><strong>Meaning:</strong> ${item.meaning}</p>
      ${item.link ? `<a href="${item.link}" target="_blank">View on JLPT Sensei</a>` : ""}
    `;
    resultsDiv.appendChild(card);
  });
});