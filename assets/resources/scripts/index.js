alert(`Seja bem-vindo ao Vixe-Quebrou!
Um sistema para informar problemas de infraestrutura na UTFPR.`);

let isSendEmail = confirm('Quer ser notificado por email sobre novos problemas cadastrados?');
let email = null;
if (isSendEmail) {

    do {
        email = prompt('Digite o seu email', 'username@email.com');
    } while (!isValidEmail(email))

    alert(`Você será informado sobre as novidades do site pelo email ${email}`);
}

function isValidEmail(email) {
    if (email == null || email == '' || email == 'username@email.com') {
        return false;
    }

    if (email.indexOf('@') == -1 || email.indexOf('.') == -1) {
        return false;
    }

    return true;
}