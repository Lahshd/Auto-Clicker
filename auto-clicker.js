javascript:(function() {
  try {
    if (window.autoClickerActive) {
      alert("Auto Clicker is already running!");
      return;
    }

    let cps = parseFloat(prompt("Welcome to Marshys auto clicker. Enter CPS (Clicks Per Second):"));
    if (isNaN(cps) || cps <= 0) {
      alert("Invalid CPS entered.");
      return;
    }

    let intervalTime = 1000 / cps; // CPS to interval time in milliseconds
    let buttonType = prompt("Which mouse button to click? (left, middle, right)").toLowerCase();
    const validButtons = ["left", "middle", "right"];
    if (!validButtons.includes(buttonType)) buttonType = "left"; // Default to left if invalid

    let mouseX = 0, mouseY = 0;
    let clickerInterval = null;
    let isClicking = true;

    const buttonMap = { left: 0, middle: 1, right: 2 };
    const button = buttonMap[buttonType];

    // Create the toggle button with better positioning
    const toggleButton = document.createElement("button");
    toggleButton.textContent = "🟢 AutoClick ON";
    Object.assign(toggleButton.style, {
      position: "fixed",
      top: "20px", // Adjust the top margin here
      left: "20px", // Adjust the left margin here
      zIndex: 99999,
      padding: "10px 16px",
      background: "#222",
      color: "#fff",
      border: "2px solid lime",
      borderRadius: "8px",
      fontSize: "14px",
      cursor: "pointer",
      boxShadow: "0 0 10px rgba(0,0,0,0.5)",
      transition: "all 0.2s ease",
    });
    document.body.appendChild(toggleButton);

    // Function to dispatch mouse click
    function dispatchMouseClick(el) {
      if (!el) return;
      ["mousedown", "mouseup", "click"].forEach(type => {
        const evt = new MouseEvent(type, {
          bubbles: true,
          cancelable: true,
          clientX: mouseX,
          clientY: mouseY,
          button: button,
          buttons: 1 << button
        });
        el.dispatchEvent(evt);
      });
    }

    // Start the auto-clicking process with a high CPS
    function startClicking() {
      clickerInterval = setInterval(() => {
        if (isClicking) {
          const el = document.elementFromPoint(mouseX, mouseY);
          dispatchMouseClick(el);
        }
      }, intervalTime);
    }

    // Toggle the clicking on/off
    function toggleClicking() {
      isClicking = !isClicking;
      toggleButton.textContent = isClicking ? "🟢 AutoClick ON" : "🔴 AutoClick OFF";
      toggleButton.style.borderColor = isClicking ? "lime" : "red";
    }

    // Stop everything (auto-clicker and button)
    function stopEverything() {
      clearInterval(clickerInterval);
      clickerInterval = null;
      document.removeEventListener("mousemove", updateMouse);
      document.removeEventListener("keydown", keyHandler);
      toggleButton.remove();
      delete window.autoClickerActive;
      alert("Auto Clicker stopped.");
    }

    // Update the mouse coordinates
    function updateMouse(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    // Key handler to listen for key events
    function keyHandler(e) {
      if (e.ctrlKey && e.key === "e") {
        stopEverything(); // Ctrl + E to stop everything
    startClicking();

    window.autoClickerActive = true;

    alert("Auto Clicker started.\n\n🔄 Ctrl + Z: Toggle On/Off\n🛑 Ctrl + E: Stop everything");

      } else if (e.ctrlKey && e.key === "z") { // Ctrl + Z to toggle the auto-clicker on/off
        toggleClicking();
      }
    }

    // Add event listeners for mouse movement and key events
    document.addEventListener("mousemove", updateMouse);
    document.addEventListener("keydown", keyHandler);

    // Start the auto-clicking process
    toggleButton.onclick = toggleClicking;
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
