//Etape 1:
//Verifier que le nombre de pages correspond au nombre de d'etape
//et forcer le nombre de page en appliquant un style CSS a l'element HTML

const steps = document.querySelectorAll('.step');
const bullets = document.querySelectorAll('.step .bullet');
const bulletLabels = document.querySelectorAll('.step p');
const pages = document.querySelectorAll('.page');
const nextButtons = document.querySelectorAll('.next');
const prevButtons = document.querySelectorAll('.prev');
const form = document.querySelector('form');
const numberOfPages = pages.length;
if (steps.length !== numberOfPages) {
    console.warn(
        "Le nombre d'etapes indique dans la barre de progression ne correspondent pas aux nombre de pages du formulaire"
    );
}

document.documentElement.style.setProperty('--step-number', numberOfPages);

//Etape 3: Gestion des boutons next et previous

nextButtons.forEach((button, index) => {
    button.addEventListener('click', function (e) {
        e.preventDefault();

        inputIsValid = isValid(this);
        currentPage = index + 1;

        if (inputIsValid) {
            form.style.transform = `TranslateX(${
                currentPage * (-100 / pages.length)
            }%)`;
            bullets[index].classList.add('active');
            bulletLabels[index].classList.add('active');
        }
    });
});

prevButtons.forEach((button, index) => {
    button.addEventListener('click', function (e) {
        e.preventDefault();

        currentPage = index + 1;

        form.style.transform = `TranslateX(${
            (currentPage - 1) * (-100 / pages.length)
        }%)`;
        bullets[index].classList.remove('active');
        bulletLabels[index].classList.remove('active');
    });
});

//Etape 4: gestion de la soumission du formulaire
document.querySelector('.submit').addEventListener('click', function (e) {
    e.preventDefault();
    inputIsValid = isValid(this);
    if (inputIsValid) {
        bullets[steps.length - 1].classList.add('active');
        bulletLabels[steps.length - 1].classList.add('active');
        setTimeout(() => {
            alert('Enregistrement termine.');
            location.reload();
        }, 1000);
    }
});

//Etape 2: valider le formulaire

function isValid(elt) {
    let validInputs = true;

    const inputs = elt.parentElement.parentElement.querySelectorAll('input');
    inputs.forEach((input) => {
        const trueReturn = input.checkValidity();

        if (!trueReturn) {
            validInputs = false;
            input.classList.add('invalid');
        } else {
            input.classList.remove('invalid');
        }
    });

    return validInputs;
}

// transform: translateX(calc(-100% / var(--step-number)));
