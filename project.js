const getColor = () => {
    // Generate a random hex color code
    const randomNumber = Math.floor(Math.random() * 16777215);
    const randomCode = "#" + randomNumber.toString(16).padStart(6, "0"); // Ensure 6 characters

    // Update background color and display the hex code
    document.body.style.backgroundColor = randomCode;
    document.getElementById("color-code").innerText = randomCode;

    // Copy the hex code to the clipboard
    if (navigator.clipboard) {
        navigator.clipboard.writeText(randomCode).then(() => {
            showTooltip("Copied to clipboard!");
        }).catch((err) => {
            console.error("Clipboard write failed: ", err);
        });
    } else {
        // Fallback for browsers without clipboard support
        const tempInput = document.createElement("input");
        tempInput.value = randomCode;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        showTooltip("Copied to clipboard!");
    }
};

// Display a tooltip to inform the user
const showTooltip = (message) => {
    const tooltip = document.createElement("span");
    tooltip.innerText = message;
    tooltip.style.position = "absolute";
    tooltip.style.top = "10px";
    tooltip.style.right = "10px";
    tooltip.style.background = "#333";
    tooltip.style.color = "#fff";
    tooltip.style.padding = "5px 10px";
    tooltip.style.borderRadius = "5px";
    tooltip.style.zIndex = "1000";
    tooltip.style.opacity = "0";
    tooltip.style.transition = "opacity 0.3s ease";

    document.body.appendChild(tooltip);

    // Fade in and remove after 1.5 seconds
    setTimeout(() => (tooltip.style.opacity = "1"), 10);
    setTimeout(() => tooltip.remove(), 1500);
};

// Attach event listener to the button
document.getElementById("btn").addEventListener("click", getColor);

// Initial call to set a random color on page load
getColor();
