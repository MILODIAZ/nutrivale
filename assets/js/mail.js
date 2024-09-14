const form = document.getElementById("contactForm");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const message = document.getElementById("message");
const submitButton = document.getElementById("submitButton");

function sendEmail() {
    const bodyMessage = `Nombre completo: ${fullName.value}<br> Correo: ${email.value}<br> Fono: ${phone.value}<br> Mensaje: ${message.value}`;

    Email.send({
        SecureToken: "a3ae227c-d8a8-4c51-a832-fd7beffc3b8a",
        To: 'valentinadiaz.ntadeportiva@gmail.com',
        From: "valentinadiaz.ntadeportiva@gmail.com",
        Subject: "Mensaje desde página Web",
        Body: bodyMessage
    }).then(
        message => {
            document.getElementById("spinner").classList.add("hidden");
            document.getElementById("buttonText").classList.remove("hidden");
            submitButton.disabled = false;
            if (message == "OK") {
                Swal.fire({
                    title: "Éxito!",
                    text: "Mensaje enviado exitosamente!",
                    icon: "success",
                    confirmButtonText: 'Aceptar',
                    customClass: {
                        confirmButton: 'bg-primary'
                    }
                });
                form.reset();
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "Error al envíar el mensaje. Por favor, intente nuevamente más tarde.",
                    icon: "error",
                    confirmButtonText: 'Aceptar',
                    customClass: {
                        confirmButton: 'bg-primary'
                    }
                });
            }
        }
    ).catch(error => {
        document.getElementById("spinner").classList.add("hidden");
        document.getElementById("buttonText").classList.remove("hidden");
        submitButton.disabled = false;

        Swal.fire({
            title: "Error!",
            text: "Hubo un error al envíar el mensaje. Por favor, revisa tu conexión a internet o inténtalo de nuevo más tarde.",
            icon: "error",
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'bg-primary'
            }
        });
        console.error('Email sending error:', error);
    });;
}

function checkInputs() {
    const items = document.querySelectorAll(".item");

    for (const item of items) {
        if (item.value == "") {
            const firstSpan = item.parentElement.getElementsByTagName("span")[0];
            firstSpan.classList.remove("hidden");

        }

        if (items[1].value != "") {
            checkEmail();
        }

        items[1].addEventListener("keyup", () => { checkEmail(); });

        item.addEventListener("keyup", () => {
            if (item.value != "") {
                item.parentElement.getElementsByTagName("span")[0].classList.add("hidden");
            } else {
                item.parentElement.getElementsByTagName("span")[0].classList.remove("hidden");
            }
        })
    }
}

function checkEmail() {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!email.value.match(emailRegex)) {
        email.parentElement.getElementsByTagName("span")[0].classList.remove("hidden");
        if (email.value != "") {
            email.parentElement.getElementsByTagName("span")[0].innerText = "Ingrese una dirección de correo válida";
        } else {
            email.parentElement.getElementsByTagName("span")[0].innerText = "El correo no puede estar en blanco";
        }
    } else {
        email.parentElement.getElementsByTagName("span")[0].classList.add("hidden");

    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();

    if (fullName.parentElement.getElementsByTagName("span")[0].classList.contains("hidden")
        && email.parentElement.getElementsByTagName("span")[0].classList.contains("hidden")
        && phone.parentElement.getElementsByTagName("span")[0].classList.contains("hidden")
        && message.parentElement.getElementsByTagName("span")[0].classList.contains("hidden")) {

        submitButton.disabled = true;
        document.getElementById("buttonText").classList.add("hidden");
        document.getElementById("spinner").classList.remove("hidden");
        sendEmail();
        return false;
    }
});

