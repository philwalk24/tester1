const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event

// Listen for the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Store the event object in a global variable for later use
  window.deferredPrompt = event;

  // Show the install button by removing the 'hidden' class
  butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler for the `butInstall` element
butInstall.addEventListener('click', async () => {
  // Retrieve the deferred prompt event from the global variable
  const eventThe = window.deferredPrompt;

  // Check if the prompt event is available
  if (!eventThe) {
    return;
  }

  // Show the installation prompt to the user
  eventThe.prompt();

  // Reset the global deferredPrompt variable
  window.deferredPrompt = null;

  // Hide the install button by adding the 'hidden' class
  butInstall.classList.toggle('hidden', true);
});

// TODO: Add an event handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // Clear the deferredPrompt global variable when the app is successfully installed
  window.deferredPrompt = null;
});
