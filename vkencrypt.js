// Browser detection
// Firefox 1.0+
if (typeof InstallTrigger !== 'undefined'){
    configuration.images.lock = browser.extension.getURL('icons/lock.png');
    configuration.images.unlock = browser.extension.getURL('icons/unlock.png');
    configuration.images.key = browser.extension.getURL('icons/key.png');
}

// Safari 3.0+ "[object HTMLElementConstructor]" 
if (/constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification)){

}

// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;
if(isIE){

}

// Edge 20+
if (!isIE && !!window.StyleMedia){

    configuration.images.lock = browser.extension.getURL('icons/lock.png');
    configuration.images.unlock = browser.extension.getURL('icons/unlock.png');
    configuration.images.key = browser.extension.getURL('icons/key.png');
}

// Chrome 1+, Opera
var isChrome = !!window.chrome/* && !!window.chrome.webstore*/;
if (isChrome){
    configuration.images.lock = chrome.runtime.getURL('icons/lock.png');
    configuration.images.unlock = chrome.runtime.getURL('icons/unlock.png');
    configuration.images.key = chrome.runtime.getURL('icons/key.png');
}

// 
var onDialogPage = false;

// 0 - NATIVE DIALOG
// 1 - VKE BOX
// 2 - PASSWORD BOX
var interfaceState = 0;
var dialogObserver = null;
var browser = null;

function setMessage(){

    var target = document.getElementById("page_body");//$(".body_im").get(0);
    dialogObserver = new MutationObserver(mutationObserver);

    var config = { characterData: false, subtree: true, childList : true };

    dialogObserver.observe(target, config);

    setTimeout(function(){
        //var scroll = target.scrollTop;
        interfaceInit();
        mutationObserver([{}]);
        //window.scrollTo(0, scroll + 120);

    }, 250);
}

function interfaceInit(){

    var iconContainer = $(".media_selector.clear_fix").first();
    iconContainer.after(configuration.html.enableButton);

    var width = $(".ms_item_more_label").css("width");

    var enableButton = $(configuration.vkeSelectors.enableCB);
    enableButton.on("click", toggleVKE)
                .attr("src", configuration.images.unlock)
                .css("width", width)
                .css("height", width)
                .css("margin-bottom", "2px")
                .css("margin-left", "12px")
                .after(configuration.html.setPasswordButton);

    var passwordButton = $(configuration.vkeSelectors.setPasswordButton).first();
    passwordButton.css("margin-bottom", "4px")
                  .css("margin-left", "12px")
                  .css("display", "none")
                  .attr("src", configuration.images.key)
                  .css("width", width)
                  .css("height", width)
                  .on("click", togglePasswordWindow);

    var chatbox = $(configuration.nativeSelectors.chatBoxContainer);
    width = chatbox.css("width");

    // password window
    chatbox.after(configuration.html.passwordWindow);
    var passwordWindow = $(configuration.vkeSelectors.passwordWindow);
    passwordWindow.css("display", "none")
                  .css("margin-left", "30px")
                  .css("margin-top", "-13px")
                  .css("margin-bottom", "12px")
                  .css("width", width);
    var showPassword = $(configuration.vkeSelectors.passwordDisplay);
    showPassword.on("change", toggleShowPassword);
    var okPassword = $(configuration.vkeSelectors.passwordOK);
    okPassword.on("click", passwordOK)
              .css("border", "1px solid #A7ADB7")
              .css("background", "lightgreen")
              .css("width", "40%")
              .css("float", "right");
    var cancelPassword = $(configuration.vkeSelectors.passwordCancel);
    cancelPassword.on("click", passwordCancel)
                  .css("border", "1px solid #A7ADB7")
                  .css("background", "palevioletred")
                  .css("width", "40%");

    //chat window
    chatbox.after(configuration.html.messageWindow);
    chatbox = $(configuration.vkeSelectors.messageBox);
    chatbox.css("margin-left", "30px")
           .css("margin-top", "-13px")
           .css("margin-bottom", "12px")
           .css("width", width)
           .css("resize", "vertical")
           .css("max-height", "190px")
           .css("display", "none")
           .on("keydown", vkeEnter);

    // $(configuration.nativeSelectors.windowContainer).css("min-height", "120px");
    // $(configuration.nativeSelectors.chatHistoryContainer).css("border-bottom-width", "120px");
}

function interfaceDeinit(){
    $(configuration.nativeSelectors.windowContainer).css("min-height", "");
    displayNativeVKDialog(true);

    $(configuration.vkeSelectors.setPasswordButton).remove();
    $(configuration.vkeSelectors.enableCB).remove();
    // password window
    $(configuration.vkeSelectors.passwordWindow).remove();
    $(configuration.vkeSelectors.messageBox).remove();
}

function displayNativeVKDialog(display){
    with(configuration.nativeSelectors){
        var chatboxElement = $(chatBox);
        var placeholderElement = $(placeholder);
        var photoButtonElement = $(attachmentButton);
        var smileButtonElement = $(smileButton);
        var sendButtonElement = $(sendButton);
    }

    if (display){
        photoButtonElement.css("display", "");
        smileButtonElement.css("display", "");
        chatboxElement.css("display", "");
        placeholderElement.css("display", "");
        sendButtonElement.css("display", "");
    }
    else{
        photoButtonElement.css("display", "none");
        smileButtonElement.css("display", "none");
        chatboxElement.css("display", "none");
        placeholderElement.css("display", "none");
        sendButtonElement.css("display", "none");
    }
}

function displayVKEDialog(display){

    var vkebox = $(configuration.vkeSelectors.messageBox);
    var passwordButton = $(configuration.vkeSelectors.setPasswordButton);
    var enableButton = $(configuration.vkeSelectors.enableCB);

    if (display){
        vkebox.css("display", "");
        passwordButton.css("display", "");
        enableButton.attr("src", configuration.images.lock);
    }
    else{
        vkebox.css("display", "none");
        passwordButton.css("display", "none");
        enableButton.attr("src", configuration.images.unlock);
    }
}

function displayPasswordDialog(display){

    var passwordWindow = $(configuration.vkeSelectors.passwordWindow);

    if (display){
        passwordWindow.css("display", "");
    }
    else{
        passwordWindow.css("display", "none");
    }
}

function toggleVKE(){
    switch(interfaceState){
        case 0:
            displayVKEDialog(true);
            displayNativeVKDialog(false);
            interfaceState = 1;
            break;
        case 1:
            displayVKEDialog(false);
            displayNativeVKDialog(true);
            interfaceState = 0;
            break;
        case 2:
            displayPasswordDialog(false);
            displayVKEDialog(false);
            displayNativeVKDialog(true);
            interfaceState = 0;
            break;
    }
    initializeDialogHistory();
}

function togglePasswordWindow(){
    switch(interfaceState){
        case 0:
            return;
        case 1:
            displayPasswordDialog(true);
            displayVKEDialog(false);
            interfaceState = 2;
            break;
        case 2:
            displayPasswordDialog(false);
            displayVKEDialog(true);
            interfaceState = 1;
            break;
    }
}

function toggleShowPassword(){
    var passwordField = $(configuration.vkeSelectors.passwordField);
    if (passwordField.attr("type") == "password"){
        passwordField.attr("type", "text");
    }
    else{
        passwordField.attr("type", "password");
    }
}

function passwordOK(){
    var passwordField = $(configuration.vkeSelectors.passwordField);
    var passwordText = passwordField.val();
    var passwordBytes = new TextEncoder().encode(passwordText);
    if (passwordBytes.length > configuration.maxPasswordLength){
        alert(configuration.alerts.passwordIsTooLong);
        return false;
    }
    encryptModule.generateKey(passwordBytes, navigationModule.key);
    passwordField.val("");
    togglePasswordWindow();
}

function passwordCancel(){
    togglePasswordWindow();
}

function vkeEnter(key){

    if(key && key.which == 13){
        var textbox = $("#vke-message-input"); 
        var message = textbox.val();

        var nativebox = $(configuration.nativeSelectors.chatBox).first();

        if (message == ""){
            return false;
        }

        message = encryptFully(message);

        if (message === false){
            alert(configuration.alerts.messageIsTooLong);
            return false;
        }

        textbox.val("");

        var currentContent = nativebox.html();
        nativebox.html("");

        nativebox.append("<div>" + message + "</div>");
        
        $(".im-send-btn.im-chat-input--send").click();

        setTimeout(function(){nativebox.html(currentContent);}, 0); 
        
        return false;
    }
    key.stopPropagation();
}

function mutationObserver(mutations){
    initializeDialogHistory();
}

function initializeDialogHistory(){
    //im_msg_text
        $("div.im-mess--text.wall_module._im_log_body").each(function(mes){
            messageHandler(this);
    });
}

function messageHandler(msg){

    if ($(msg)){
        msg = $(msg);
    }

    var text = msg.text();

    var originalMessage = msg.html();
    var messageId = msg.parents("li[data-msgid]").attr("data-msgid");
    var author = msg.parents("div.im-mess-stack--content").find(".im-mess-stack--lnk").attr("href");

    if(storage.nonVKEMessages[messageId]){
        return;
    }

    if (storage.getOriginalMessage(messageId) != null){

        if (!storage.belongsToDialog(navigationModule.key, messageId)) return;

        if (interfaceState == 0 && storage.messageEncryptionState(messageId)){
            storage.setMessageState(messageId, false);
            msg.html(storage.getOriginalMessage(messageId).message);
            msg.css("background", "");
            return;
        }
    }
    else{
        if (navigationModule.key != "")
            storage.storeOriginalMessage(messageId, navigationModule.key, author, originalMessage);
    }

    if (interfaceState == 0){
        return;
    }

    if (storage.getModifiedMessage(messageId) != null){
        if (!storage.messageEncryptionState(messageId)){
            storage.setMessageState(messageId, true);
            msg.text(storage.getModifiedMessage(messageId).message);
            msg.css("background", storage.messagesColor[messageId]);
        }

        return;
    }

    var result = decryptFully(text, author, messageId);

    if(result.state){

        msg.text(result.msg);

        storage.storeModifiedMessage(messageId, author, result.msg);

        if (result.warning){
            storage.setMessagesColor(messageId, "palevioletred");
        }
        else{
            storage.setMessagesColor(messageId, "lightgreen");
        }

        msg.css("background", storage.messagesColor[messageId]);
    }

    if (result.errorMessage == errorModule.wrongHeader()){
        storage.addNonVKEMessage(messageId);
    }
}

function encryptFully(message){
    // I - ENCODING
    var messageArray = new TextEncoder().encode(message);

    if (messageArray.length > configuration.maxLength){
        return false;
    }

    // II - PREPARATION
    var preparedMessage = premodule.prepare(messageArray);
    // III - ENCRYPTION
    encryptModule.prepareForEncryption();
    var encryptedMessage = encryptModule.encrypt(preparedMessage, storage.getKey(navigationModule.key));
    // IV - BASE64
    var encoded64 = base64module.toBase64(encryptedMessage.encrypted);
    // V - HEADER
    var fullyEncoded = headerModule.addHeader(encoded64.message);
    return fullyEncoded;
}

function decryptFully(message, author, id){

    var result = {
        msg : message,
        state : false,
        warning : false,
        errorMessage : ""
    };

    var parsedHeader = headerModule.checkHeader(message);
    // V - HEADER
    if (parsedHeader.result){
        var decoded64 = base64module.fromBase64(parsedHeader.message);
        // IV - BASE64
        if (decoded64.result){
            encryptModule.prepareForDecryption(parsedHeader, author);
            var decryptedMessage = encryptModule.decrypt(decoded64.bytes, storage.getKey(navigationModule.key));
            // III - DECRYPTION
            if (decryptedMessage.result){
                var checkedMessage = premodule.check(decryptedMessage.decrypted);
                // II - PREPARATION
                if (checkedMessage){
                    var fullyDecoded = new TextDecoder("utf-8").decode(checkedMessage);
                    result.msg = fullyDecoded;
                    result.state = true;

                    if (!timeModule.checkLastUnixtime(author, parsedHeader.date, id)){
                        result.warning = errorModule.timestampWarninig();
                    }

                    timeModule.setLastUnixtime(author, parsedHeader.date, id);
                }
                else{
                    result.errorMessage = errorModule.wrongPassword();
                }
            }
            else{
                result.errorMessage = errorModule.decryptionError();
            }
        }
        else{
            result.errorMessage = errorModule.corruptedMessage();
        }
    }
    else{
        result.errorMessage = errorModule.wrongHeader();
    }

    return result;
}

$(document).ready(function() {

    setTimeout(function(){

        var target = document.getElementById("page_body");
        var observer = new MutationObserver(checkPageState);

        var config = { childList: true, characterData: false, subtree: true };

        observer.observe(target, config);

        checkPageState();

        // Logout actions
        $("#top_logout_link").on("click", storage.clearMessagesInfo);

        // Set current author
        navigationModule.setAuthor($("#l_pr").children("a").attr("href"));

    }, 400);
});

function checkPageState(mutations){
    //! mobile version
    var address = document.location.href;
    if (address.indexOf("https://vk.com/im") == -1 || address.indexOf("sel") == -1) {
        deinitialize();
        return;
    }
    
    var dialogPage = $("._im_peer_history.im-page-chat-contain").get(0);

    if (dialogPage){
        
        var previousDialog = navigationModule.updateNavigationState(window.location.search.substr(1));

        if(previousDialog){
            storage.resetDialogMessagesState(previousDialog);
        }

        if (!onDialogPage){

            $(configuration.nativeSelectors.windowContainer).css("min-height", "120px");
            $(configuration.nativeSelectors.chatHistoryContainer).css("border-bottom-width", "120px");

            $("._im_media_selector.im-chat-input--selector").css("top", "-20px");

            setMessage();
            onDialogPage = true;
        }
        
        initializeDialogHistory();
    }
    else{
        deinitialize();
    }
}

function deinitialize(){
    onDialogPage = false;
    interfaceState = 0;
    interfaceDeinit();
    if (dialogObserver != null){
        dialogObserver.disconnect();
        dialogObserver = null;
    }
}