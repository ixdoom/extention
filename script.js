var shifted_status=false;
var capslocked_status=false;
var escape_status=false;
var shift_is_down=false;
var capslock_is_down=false;
var escape_is_down=false;
var last_key_ID_pressed="";

var keyCodeConverter = {
  8 : "onlinekeyboard-backspace",
  9 : "onlinekeyboard-tab",
  13 : "onlinekeyboard-enter",
  16 : "onlinekeyboard-left-shift",
  17 : "onlinekeyboard-left-ctrl",
  20 : "onlinekeyboard-capslock",
  27 : "onlinekeyboard-escape",
  32 : "onlinekeyboard-space",
  48 : "onlinekeyboard-k10",
  49 : "onlinekeyboard-k1",
  50 : "onlinekeyboard-k2",
  51 : "onlinekeyboard-k3",
  52 : "onlinekeyboard-k4",
  53 : "onlinekeyboard-k5",
  54 : "onlinekeyboard-k6",
  55 : "onlinekeyboard-k7",
  56 : "onlinekeyboard-k8",
  57 : "onlinekeyboard-k9",
  65 : "onlinekeyboard-k26",
  66 : "onlinekeyboard-k42",
  67 : "onlinekeyboard-k40",
  68 : "onlinekeyboard-k28",
  69 : "onlinekeyboard-k15",
  70 : "onlinekeyboard-k29",
  71 : "onlinekeyboard-k30",
  72 : "onlinekeyboard-k31",
  73 : "onlinekeyboard-k20",
  74 : "onlinekeyboard-k32",
  75 : "onlinekeyboard-k33",
  76 : "onlinekeyboard-k34",
  77 : "onlinekeyboard-k44",
  78 : "onlinekeyboard-k43",
  79 : "onlinekeyboard-k21",
  80 : "onlinekeyboard-k22",
  81 : "onlinekeyboard-k13",
  82 : "onlinekeyboard-k16",
  83 : "onlinekeyboard-k27",
  84 : "onlinekeyboard-k17",
  85 : "onlinekeyboard-k19",
  86 : "onlinekeyboard-k41",
  87 : "onlinekeyboard-k14",
  88 : "onlinekeyboard-k39",
  89 : "onlinekeyboard-k18",
  90 : "onlinekeyboard-k38",
  186 : "onlinekeyboard-k35",
  187 : "onlinekeyboard-k12",
  188 : "onlinekeyboard-k45",
  189 : "onlinekeyboard-k11",
  190 : "onlinekeyboard-k46",
  191 : "onlinekeyboard-k47",
  219 : "onlinekeyboard-k23",
  220 : "onlinekeyboard-k25",
  221 : "onlinekeyboard-k24",
  222 : "onlinekeyboard-k36",
  192 : "onlinekeyboard-k0",
};

function show_upper_letter(){
  $('.onlinekeyboard-label-specific').each(function(){
    
    if(!$(this).attr('data-capitalized'))
      $(this).text($(this).text().toUpperCase());
    else
      $(this).text($(this).data("capitalized"));
  });
  $('.onlinekeyboard-label-specific-shifted').each(function(){
    $(this).text($(this).text().toLowerCase());
  });
}
function show_lower_letter(){
  $('.onlinekeyboard-label-specific').each(function(){
    if(!$(this).attr('data-lower'))
      $(this).text($(this).text().toLowerCase());
    else
      $(this).text($(this).data("lower"));
  });
  $('.onlinekeyboard-label-specific-shifted').each(function(){
    $(this).text($(this).text().toUpperCase());
  });
}

function update_keyboard_ui(){

  if(capslocked_status){
    show_upper_letter();
  }
  else{
    show_lower_letter();
  }

  if(shifted_status){
    $('.onlinekeyboard-label-specific').hide();
    $('.onlinekeyboard-label-specific-shifted').show();
  }
  else{
    $('.onlinekeyboard-label-specific').show();
    $('.onlinekeyboard-label-specific-shifted').hide();
  }

  if(shift_is_down){
    $("#onlinekeyboard-left-shift, #onlinekeyboard-right-shift").addClass('key_chosen');
  }
  else{
    $("#onlinekeyboard-left-shift, #onlinekeyboard-right-shift").removeClass('key_chosen');
  }

  if(capslock_is_down){
    $("#onlinekeyboard-capslock").addClass('key_chosen');
  }
  else{
    $("#onlinekeyboard-capslock").removeClass('key_chosen');
  }

  if(escape_is_down){
    $("#onlinekeyboard-escape").addClass('key_chosen');
  }
  else{
    $("#onlinekeyboard-escape").removeClass('key_chosen');
  }

}

$(document).ready(function(){  

  $("#online-keyboard-textarea").focus();

  // Register a hover event if not on mobile
  if(! /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    $("#onlinekeyboard-left-shift, #onlinekeyboard-right-shift").hover(function(){
      if(!shift_is_down){
        $("#onlinekeyboard-left-shift, #onlinekeyboard-right-shift").addClass('key_allow_to_choose');
        $('.onlinekeyboard-label-specific').hide();
        $('.onlinekeyboard-label-specific-shifted').show();
      }
      
    },function(){      
        $("#onlinekeyboard-left-shift, #onlinekeyboard-right-shift").removeClass('key_allow_to_choose');
        if(!shift_is_down){
          $('.onlinekeyboard-label-specific').show();
          $('.onlinekeyboard-label-specific-shifted').hide();
        }
    });

    $("#onlinekeyboard-capslock").hover(function(){
      if(!capslock_is_down){
        $("#onlinekeyboard-capslock").addClass('key_allow_to_choose');

        show_upper_letter();

      }
    },function(){
      if(!capslock_is_down){
        $("#onlinekeyboard-capslock").removeClass('key_allow_to_choose');

        show_lower_letter();
      }
    });

    //Escape key hover
    $("#onlinekeyboard-escape").hover(function(){
      if(!capslock_is_down){
        $("#onlinekeyboard-escape").addClass('key_allow_to_choose');

        // show_upper_letter();

      }
    },function(){
      if(!capslock_is_down){
        $("#onlinekeyboard-escape").removeClass('key_allow_to_choose');

        // show_lower_letter();
      }
    });

    //Keycap hover
    $('.onlinekeyboard-key, .onlinekeyboard-control-key').hover(function(){
      $(this).css('margin-top','-2px');
    },function(){
      $(this).css('margin-top','1px');
    });

  }  
  
  //Click event for keys
  $("#the_online_keyboard").on('click','.onlinekeyboard-key',function(){    
    var key_clicked=$(this).find(".onlinekeyboard-label-specific");
    if(!key_clicked.is(":visible"))
      key_clicked=$(this).find(".onlinekeyboard-label-specific-shifted");
    var key=key_clicked.text().trim();

    if(escape_status){
      key_clicked=$(this).find(".onlinekeyboard-label-original");  
      key=key_clicked.text().trim();
      if((capslocked_status&& !shifted_status)||(!capslocked_status&& shifted_status))
        key=key.toUpperCase();    
    }


        

    insertAtCaret("online-keyboard-textarea",key);       
    
    //If shift key was pressed, let it be normal 
    if(shifted_status){
      shifted_status=false;
      shift_is_down=false;
      update_keyboard_ui();
    }      
  });

  $("#onlinekeyboard-left-shift, #onlinekeyboard-right-shift").click(function(){
    shifted_status=!shifted_status;    
    shift_is_down=!shift_is_down;    
    update_keyboard_ui();
  });

  $("#onlinekeyboard-capslock").click(function(){
    capslocked_status=!capslocked_status;
    capslock_is_down=!capslock_is_down;            
    update_keyboard_ui();
  });


  $("#onlinekeyboard-escape").click(function(){
    escape_status=!escape_status;
    escape_is_down=!escape_is_down;            
    update_keyboard_ui();
  });

  $("#onlinekeyboard-space").click(function(){
    var key=" ";    
    insertAtCaret("online-keyboard-textarea",key);
  });

  $("#onlinekeyboard-tab").click(function(){
    var key="\t";    
    insertAtCaret("online-keyboard-textarea",key);
  });

  $("#onlinekeyboard-enter").click(function(){
    var key="\n";    
    insertAtCaret("online-keyboard-textarea",key);
  });

  $("#onlinekeyboard-backspace").click(function(){
    backspaceAtCaret("online-keyboard-textarea","");
  });

  $("#online-keyboard-textarea").keydown(function(event){

    if((event.keyCode in keyCodeConverter)&& !escape_status){
      event.preventDefault();
      var keyID="#"+keyCodeConverter[event.keyCode];

      $(last_key_ID_pressed).mouseleave();    
      $(keyID).mouseenter();    
      $(keyID).trigger('click');    

      last_key_ID_pressed=keyID;
    }
  });


  var copyButton= new Clipboard('#copy-btn');
  copyButton.on('success', function(event) {
      event.clearSelection();
      // event.trigger.textContent = 'Copied';
      document.getElementById("copy_text").textContent = "Copied";


      window.setTimeout(function() {
          // event.trigger.textContent = 'Copy';
          document.getElementById("copy_text").textContent = "Copy";
      }, 3000);
  });
  copyButton.on('error', function(event) { 
      document.getElementById("copy_text").textContent = 'Press "Ctrl + C" to copy';
      window.setTimeout(function() {
          // event.trigger.textContent = 'Copy';
          document.getElementById("copy_text").textContent = "Copy";
      }, 3000);
  });

  function sendToActiveElement(key){
    //Send to the active element
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        the_character: key
      }, function (response) {
      });
    });
  }
  //Auxilary useful functions
  function insertAtCaret(areaId, text) {
    var txtarea = document.getElementById(areaId);
    var scrollPos = txtarea.scrollTop;
    var caretPos = txtarea.selectionStart;

    var front = (txtarea.value).substring(0, caretPos);
    var back = (txtarea.value).substring(txtarea.selectionEnd, txtarea.value.length);
    txtarea.value = front + text + back;
    caretPos = caretPos + text.length;
    txtarea.selectionStart = caretPos;
    txtarea.selectionEnd = caretPos;
    txtarea.focus();
    txtarea.scrollTop = scrollPos;

    //Send to the active element
    sendToActiveElement(text);
  }

  function backspaceAtCaret(areaId) {
    var txtarea = document.getElementById(areaId);
    var scrollPos = txtarea.scrollTop;
    var caretPos = txtarea.selectionStart;

    var front = (txtarea.value).substring(0, caretPos-1);    
    
    var back = (txtarea.value).substring(txtarea.selectionEnd, txtarea.value.length);


    txtarea.value = front + back;
    caretPos = caretPos -1;
    txtarea.selectionStart = caretPos;
    txtarea.selectionEnd = caretPos;
    txtarea.focus();
    txtarea.scrollTop = scrollPos;

    //Send to the active element
    sendToActiveElement("backspace");
  }

  //Clear button
  $("#clear-btn").click(function(){
    $("#online-keyboard-textarea").val("");
  });  

  //For the link to web version
  $("body").on('click','a',function(){
    if($(this).attr('id')=="web_version_link"){
      chrome.tabs.create({url:$(this).attr('href')});
      return false;
    }    
  });

});