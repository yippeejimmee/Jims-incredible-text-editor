const butInstall = document.getElementById('buttonInstall');
//gets the button install element

// Logic for installing the PWA

window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    //stores the events prior to the install

    butInstall.classList.toggle('hidden', false);
    //removes the hidden class from the install button
});


butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    //store events into the prompt Event

    if (!promptEvent) {
        return;
    }

    promptEvent.prompt();
    //show the prompt for the the events stored in windows.deferredPrompt

    window.deferredPrompt = null;
    //reset the deferred prompt variable

    butInstall.classList.toggle('hidden', true);
    //return the hidden class to install button after button is clicked
});


window.addEventListener('appinstalled', (event) => {

    window.deferredPrompt = null;
    //clear prompt after app is installed

});
