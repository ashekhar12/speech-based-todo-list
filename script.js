window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

const words = document.querySelector('.words');

let p = document.createElement('p');

//adds a item to to-do list.

function addItem(){
    const item = document.createElement('div');
    item.className = 'item';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('click', handleCheck);
    
    item.appendChild(checkbox);
    item.appendChild(p);
    words.appendChild(item);
}

addItem();

recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

    // reload the page and start from begining if "reset" is encountered.

    if(transcript.includes('reset')){
        window.location.reload();
    }

    p.textContent = transcript;

    if (e.results[0].isFinal) {
        p = document.createElement('p');
        addItem();
    }
});

recognition.addEventListener('end', recognition.start);

recognition.start();

// enables multiple selection, when holding shift key.

let lastChecked;

function handleCheck(e) {
    let inBetween = false;

    if (e.shiftKey && this.checked) {
        const checkboxes = document.querySelectorAll('.words input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            if (checkbox === this || checkbox === lastChecked) {
            inBetween = !inBetween;
            }
  
            if (inBetween) {
            checkbox.checked = true;
            }
      });
    }
  
    lastChecked = this;
}
