
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    var the_character = request.the_character;
    var inputElem=document.activeElement;
    var scrollPos = inputElem.scrollTop;
    var caretPos = 0;


    if (inputElem.tagName.toLowerCase() === 'input' || inputElem.tagName.toLowerCase() === 'textarea') {
      oldText = inputElem.value;
      caretPos = inputElem.selectionStart;
      var front = (inputElem.value).substring(0, caretPos);
      var back = (inputElem.value).substring(inputElem.selectionEnd, inputElem.value.length);
    } else {
      oldText = inputElem.innerText;
    }    

    if (inputElem.tagName.toLowerCase() === 'input' || inputElem.tagName.toLowerCase() === 'textarea') {
      if(the_character!="backspace"){
        inputElem.value = front + the_character + back;
        caretPos = caretPos + the_character.length;
        inputElem.selectionStart = caretPos;
        inputElem.selectionEnd = caretPos;
        inputElem.focus();
        inputElem.scrollTop = scrollPos;
      }
      else{
        front = (inputElem.value).substring(0, caretPos-1);
        inputElem.value = front + back;
        caretPos = caretPos -1;
        inputElem.selectionStart = caretPos;
        inputElem.selectionEnd = caretPos;
        inputElem.focus();
        inputElem.scrollTop = scrollPos;
      }
    } else {
      if (inputElem.getAttribute('contenteditable') === 'true') {
        if(the_character!="backspace"){
          inputElem.focus();
          $(inputElem).text($(inputElem).text() + the_character);
          inputElem.focus();
        }
        else{
          inputElem.focus();          
          //Delete last character
          $(inputElem).text($(inputElem).text().slice(0,-1));
          inputElem.focus();
        }
      }
    }
  }
);