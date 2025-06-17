// Random Title Generator Module

// Title Options
const possibleTitles = [
  "Your To-Do List",
  "What's Next?",
  "Get It Done",
  "Conquer Your Day",
  "Today's Mission",
  "Let's Be Productive",
  "One Task at a Time",
  "Make Things Happen",
  "Ready to Go?",
  "Faites-le !",
  "¡Vamos!",
  "Auf geht's!"
];

// Title Selection and Display
export function setRandomTitle(titleElementId = 'app-title') {
  const titleElement = document.getElementById(titleElementId);
  if (!titleElement) {
    console.warn(`Element with ID '${titleElementId}' not found. Cannot set random title.`);
    return;
  }

  const lastTitle = localStorage.getItem('lastAppTitle');
  let availableTitles = possibleTitles.filter(title => title !== lastTitle);
  
  if (availableTitles.length === 0) {
    availableTitles = possibleTitles;
  }
  
  const randomIndex = Math.floor(Math.random() * availableTitles.length);
  const randomTitle = availableTitles[randomIndex];
  
  titleElement.textContent = randomTitle;
  localStorage.setItem('lastAppTitle', randomTitle);
  
  return randomTitle;
}