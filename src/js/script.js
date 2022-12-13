"use strict";

document.addEventListener('DOMContentLoaded', function () {
    // ThanksModal(fade)

const thkClose = document.querySelector('.modal__close'),
      thkModal = document.querySelector('.modal'),
      thkTitle = document.querySelector('.modal__title'),
      thkDialog = document.querySelector('.modal__dialog'),
      thkImg = thkModal.querySelector('img');



thkClose.addEventListener('click', () => {
    closeModal(thkModal);
});

document.addEventListener('keydown', (e) => {
  if (e.code === 'Escape' && thkModal.classList.contains('show')) {
    closeModal(thkModal);
  }
});

thkModal.addEventListener('click', (e) => {
  if (e.target === thkModal) {
    closeModal(thkModal);
  }
});

function openModal(el){
    setTimeout(()=>{
        el.classList.add('show');
        el.classList.remove('hide');
          },100);
    setTimeout(()=>{
        fadeIn(thkDialog);
          },200);
   
  }
  
  function closeModal(el){
    setTimeout(()=>{
        el.classList.add('hide');
        el.classList.remove('show');
          },1000);
    
    setTimeout(()=>{
        fadeOut(thkDialog);
          },100);
  }

  function fadeIn(el){
    el.classList.add('fadeIn');
    el.classList.remove('fadeOut');
  }
  
  function fadeOut(el){
    el.classList.add('fadeOut');
    el.classList.remove('fadeIn');
  }

function showThanksModal(message, messageImg, messageAlt) {
    thkImg.src = messageImg;
    thkTitle.textContent = message;
    thkImg.setAttribute('alt', messageAlt);
    openModal(thkModal);
}

    // POST + Validate

    const form = document.querySelector('form'),
          formBtn = form.querySelector('button');


    const message = {
        loading: 'Данные отправляются...',
        loadingImg: 'icons/modal/spinner.svg',
        loadingAlt: 'spinner',
        success: 'Спасибо, мы скоро с Вами свяжемся',
        successImg: 'icons/modal/check.svg',
        successAlt: 'success',
        failure: 'Что-то пошло не так',
        failureImg: 'icons/modal/close.svg',
        failureAlt: 'failure'
    };


   

       form.addEventListener('submit', (e) => {
        e.preventDefault();

        let error = formValidate(form);

        const formData = new FormData(form);

           if (error === 0) {
            formBtn.addEventListener('click', () => {
                showThanksModal(message.loading, message.loadingImg, message.loadingAlt);
            });
            openModal(thkModal);
            fetch('sendmail.php', {
                method: 'POST',
                body: formData
               })
               .then(() => {
                showThanksModal(message.success, message.successImg, message.successAlt);
               })
               .catch(() => {
                showThanksModal(message.failure, message.failureImg, message.failureAlt);
               })
               .finally(() => {
                form.reset();
               });
           }
       });



    function formValidate(form) {
        let error = 0;
        const formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
                formAddError(input);
                error++;
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }


// Hamburger

    const hamburger = document.querySelector('.hamburger'),
      menu = document.querySelector('.menu'),
      close = document.querySelector('.menu__close'),
      link = document.querySelector('.menu__list'),
      overlay = document.querySelector('.menu__overlay');

link.addEventListener('click', () => {
        menu.classList.remove('active');
    });

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});

close.addEventListener('click', () => {
    menu.classList.remove('active');
});
document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && menu.classList.contains('active')) {
        menu.classList.remove('active');
    }
});
menu.addEventListener('click', (e) => {
    if (e.target === overlay) {
        menu.classList.remove('active');
    }
});

const counters = document.querySelectorAll('.skills__ratings-counter'),
      lines = document.querySelectorAll('.skills__ratings-line span');

counters.forEach( (item, i) => {
    lines[i].style.width = item.innerHTML;
});

//Scroll

const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
        e.preventDefault();
        const id = smoothLink.getAttribute('href');

        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
};

});

