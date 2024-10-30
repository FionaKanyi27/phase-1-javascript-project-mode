// Load activities from db.json and display them
document.addEventListener("DOMContentLoaded", () => {
  fetch("db.json")
    .then((response) => response.json())
    .then((data) => displayActivities(data.activities));
});

function displayActivities(activities) {
  const activitiesSection = document.getElementById("activities");

  activities.forEach((activity) => {
    const activityCard = document.createElement("div");
    activityCard.className = "activity-card";
    activityCard.dataset.price = activity.pricePerPerson;

    activityCard.innerHTML = `
      <img src="${activity.image}" alt="${activity.name}" class="activity-image">
      <h3>${activity.name}</h3>
      <p>Price per person: $${activity.pricePerPerson}</p>
      <p>${activity.description}</p>
      <div class="participant-control">
        <button onclick="updateParticipants(this, -1)">-</button>
        <span class="participant-count">0</span>
        <button onclick="updateParticipants(this, 1)">+</button>
      </div>
      <p>Total: $<span class="total-cost">0</span></p>
    `;

    activitiesSection.appendChild(activityCard);
  });
}

// Function to update participant count and calculate total cost
function updateParticipants(button, change) {
  const participantControl = button.parentElement;
  const participantCountElem =
    participantControl.querySelector(".participant-count");
  const totalCostElem =
    participantControl.parentElement.querySelector(".total-cost");

  let participantCount = parseInt(participantCountElem.textContent);
  const pricePerPerson = parseInt(
    participantControl.parentElement.dataset.price
  );

  participantCount = Math.max(0, participantCount + change);
  participantCountElem.textContent = participantCount;

  const totalCost = participantCount * pricePerPerson;
  totalCostElem.textContent = totalCost;
}
