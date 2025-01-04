document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("calculator-form");
    const results = document.getElementById("results");
    const customInputs = document.getElementById("custom-inputs");
  
    // Custom input fields
    const customVocabInput = document.getElementById("custom-vocab");
    const customKanjiInput = document.getElementById("custom-kanji");
    const customGrammarInput = document.getElementById("custom-grammar");
  
    const currentLevelSelect = document.getElementById("current-level");
    const desiredLevelSelect = document.getElementById("desired-level");
  
    // Show/Hide custom fields based on selection
    function toggleCustomInputs() {
      if (
        currentLevelSelect.value === "Custom" ||
        desiredLevelSelect.value === "Custom"
      ) {
        customInputs.style.display = "block";
      } else {
        customInputs.style.display = "none";
        customVocabInput.value = "";
        customKanjiInput.value = "";
        customGrammarInput.value = "";
      }
    }
  
    currentLevelSelect.addEventListener("change", toggleCustomInputs);
    desiredLevelSelect.addEventListener("change", toggleCustomInputs);
  
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form submission
  
      const currentLevel = currentLevelSelect.value;
      const desiredLevel = desiredLevelSelect.value;
      const days = parseInt(document.getElementById("days-until-goal").value);
  
      if (!days || days <= 0) {
        alert("Please enter a valid number of days.");
        return;
      }
  
      let currentVocab, desiredVocab, currentKanji, desiredKanji, currentGrammar, desiredGrammar;
  
      // Use custom values if "Custom" is selected
      if (currentLevel === "Custom") {
        currentVocab = parseInt(customVocabInput.value) || 0;
        currentKanji = parseInt(customKanjiInput.value) || 0;
        currentGrammar = parseInt(customGrammarInput.value) || 0;
      } else {
        currentVocab = getCounts(currentLevel, "vocab");
        currentKanji = getCounts(currentLevel, "kanji");
        currentGrammar = getCounts(currentLevel, "grammar");
      }
  
      if (desiredLevel === "Custom") {
        desiredVocab = parseInt(customVocabInput.value) || 0;
        desiredKanji = parseInt(customKanjiInput.value) || 0;
        desiredGrammar = parseInt(customGrammarInput.value) || 0;
      } else {
        desiredVocab = getCounts(desiredLevel, "vocab");
        desiredKanji = getCounts(desiredLevel, "kanji");
        desiredGrammar = getCounts(desiredLevel, "grammar");
      }
  
      const vocabGoal = ((desiredVocab - currentVocab) / days).toFixed(2);
      const kanjiGoal = ((desiredKanji - currentKanji) / days).toFixed(2);
      const grammarGoal = ((desiredGrammar - currentGrammar) / days).toFixed(2);
  
      document.getElementById("vocab-goal").textContent = `Vocabulary: ${vocabGoal} words per day`;
      document.getElementById("kanji-goal").textContent = `Kanji: ${kanjiGoal} kanji per day`;
      document.getElementById("grammar-goal").textContent = `Grammar: ${grammarGoal} points per day`;
  
      results.style.display = "block";
    });
  
    function getCounts(level, type) {
      const dataMap = {
        vocab: { N5: 800, N4: 1500, N3: 3750, N2: 6000, N1: 10000 },
        kanji: { N5: 80, N4: 250, N3: 620, N2: 1000, N1: 2000 },
        grammar: { N5: 80, N4: 212, N3: 394, N2: 589, N1: 842 },
      };
      return dataMap[type][level] || 0;
    }
  });