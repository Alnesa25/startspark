// ... Firebase imports and config (همونطور که قبلاً نوشتی)

let usageCount = localStorage.getItem("idea_uses") || 0;

// IDEA TOOL FORM
document.getElementById("ideaForm").addEventListener("submit", (e) => {
  e.preventDefault();
  
  usageCount++;
  localStorage.setItem("idea_uses", usageCount);
  
  if (usageCount <= 3) {
    const idea = generateIdea(); // تابع فرضی
    document.getElementById("ideaResult").innerText = `✨ Here's your idea #${usageCount}: ${idea}`;
  } else {
    document.getElementById("ideaResult").innerHTML = `
      ❌ You have reached the free limit of 3 ideas.<br>
      💳 <button class="bg-green-600 text-white px-4 py-2 mt-2 rounded" onclick="fakePayment()">Upgrade to Unlimited</button>
    `;
  }
});

// FAKE PAYMENT
window.fakePayment = function () {
  alert("✅ Payment Successful! Unlimited idea generation unlocked.");
  localStorage.setItem("idea_uses", 0); // reset counter
  document.getElementById("ideaResult").innerText = "";
};

// DUMMY IDEA GENERATOR
function generateIdea() {
  const ideas = [
    "Start a dropshipping business",
    "Build a fitness app",
    "Launch a digital product store",
    "Create an AI-based chatbot for restaurants",
    "Offer freelance video editing"
  ];
  return ideas[Math.floor(Math.random() * ideas.length)];
}
