function validateForm(form) {
    event.preventDefault();
    var savedResults = [];
    
    var emailFilter  = /^[^@]+@[^@.]+\.[^@]*\w\w$/,
        illegalChars = /[\(\)\\<\>\,\;\:\\\"\[\]]/,
        isValid = true;
    //Do we have an error ?
    if (form.name.value === '' || form.email.value === '' || form.subject.value === '' || form.message.value === '') {
        savedResults.push('missing-fields');
        isValid = false;
    }

    if (!emailFilter.test(form.email.value.replace(/^\s+|\s+$/, '')) && form.email.value) { //test for illegal chars
        savedResults.push('invalid-email');
        isValid = false;
    }

    if (form.email.value.match(illegalChars)) {
        savedResults.push('invalid-caracters');
        isValid = false;
    }

    if (isValid) {
        ajaxPost(form, savedResults);
    } else {
        notifyRequestState(savedResults);
        return false;
    }
}

function ajaxPost(form, savedResults) {
    var url = form.action,
        xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"),
        params = [],
        response;

    // Building up the request...
    for (var i = 0, name, value; i < form.elements.length; i++) {
        name = encodeURIComponent(form.elements[i].name);
        value = encodeURIComponent(form.elements[i].value);
        params.push(name + '=' + value);
    }
    params = params.join('&');

    // Recording the response
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 1) {
            addClass(contactForm, 'loading');
        } else if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                checkResponse(xhr.responseText, savedResults);
            } else {
                savedResults.push('failure');
            }

            notifyRequestState(savedResults);
        }
    };

    // Opening the connection
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    //All preparations are clear, send the request!
    xhr.send(params);
}

function checkResponse(response, savedResults) {
    if (response === 'success') {
        savedResults.push('success');
    } else if (response === 'invalid-email') {
        savedResults.push('invalid-email');
    } else {
        savedResults.push('failure');
    }
}

function notifyRequestState(savedResults){
    var resultMessages = contactForm.querySelectorAll('.result-message');
    var fields = contactForm.querySelectorAll('input, textarea');

    for (i = 0; i < resultMessages.length; i++) {
        removeClass(resultMessages[i], 'show');
    }

    for (i = 0; i < savedResults.length; i++) {
        if (savedResults[i] === 'missing-fields' || savedResults[i] === 'invalid-email' || savedResults[i] === 'invalid-caracters') {
            addClass(contactForm.querySelector('.result-message.' + savedResults[i]), 'show');
        }

        if (savedResults[i] === 'missing-fields') {
            for (u = 0; u < fields.length; u++) {
                if (fields[u].value === '') {
                    addClass(fields[u], 'invalid');
                } else {
                    removeClass(fields[u], 'invalid');
                }
            }
        }

        if (savedResults[i] === 'invalid-email' || savedResults[i] === 'invalid-caracters') {
            addClass(contactForm.querySelector('#email'), 'invalid');
        }

        if (savedResults[i] === 'success' || savedResults[i] === 'failure') {
            for (u = 0; u < fields.length; u++) {
                removeClass(fields[u], 'invalid');
            }

            killFormLoader(savedResults[i]);
        }
    }
}

function killFormLoader(result) {
    var fields = contactForm.querySelectorAll('input, textarea');

    setTimeout(function() {
        removeClass(contactForm, 'loading');
        addClass(contactForm.querySelector('.result-message.' + result), 'show');

        if (result === 'success') {
            for (i = 0; i < fields.length; i++) {
                fields[i].value = '';
            }
        }
    }, 1000);
}