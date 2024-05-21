document.getElementById('sendMessageButton').addEventListener('click', (event) => {
  event.preventDefault();

  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (selectedOption) {
    const selectedValue = selectedOption.value;

    // Send the selected value to the content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'selectedOption', value: selectedValue }, (response) => {
        console.log(response.status);
      });
    });
  } else {
    console.log('No option selected');
  }
});