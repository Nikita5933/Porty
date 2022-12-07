"use strict";

document.addEventListener('DOMContentLoaded', function () {
    // ThanksModal

const thkClose = document.querySelector('.modal__close'),
      thkModal = document.querySelector('.modal'),
      thkTitle = document.querySelector('.modal__title'),
      thkImg = thkModal.querySelector('img');



thkClose.addEventListener('click', () => {
  thkModal.classList.add('hide');
  thkModal.classList.remove('show');
});

document.addEventListener('keydown', (e) => {
  if (e.code === 'Escape' && thkModal.classList.contains('show')) {
      thkModal.classList.remove('show');
      thkModal.classList.add('hide');
  }
});

thkModal.addEventListener('click', (e) => {
  if (e.target === thkModal) {
      thkModal.classList.remove('show');
      thkModal.classList.add('hide');
  }
});

    // POST + Validate

    const form = document.querySelector('form'),
          formBtn = form.querySelector('button');

    formBtn.addEventListener('click', () => {
       
        thkImg.src = message.loadingImg;
        thkTitle.textContent = message.loading;
    });

    const message = {
        loading: 'Данные отправляются...',
        loadingImg: 'icons/modal/spinner.svg',
        success: 'Спасибо, мы скоро с Вами свяжемся',
        successImg: 'icons/modal/check.svg',
        failure: 'Что-то пошло не так',
        failureImg: 'icons/modal/close.svg'
    };

       form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let error = formValidate(form);

        const formData = new FormData(form);


           if (error === 0) {
            thkModal.classList.add('show');
            thkModal.classList.remove('hide');
            fetch('sendmail.php', {
                method: 'POST',
                
                body: formData
               })
               .then(data => data.text())
               .then(data => {
                console.log(data);
                // thkModal.classList.add('show');
                // thkModal.classList.remove('hide');
                thkImg.src = message.successImg;
                thkTitle.textContent = message.success;

               })
               .catch(() => {
                thkModal.classList.add('show');
                thkModal.classList.remove('hide');
                thkTitle.textContent = message.failure;
                thkImg.src = message.failureImg;
                
               })
               .finally(() => {
                form.reset();
                
               })
           }
       });




       function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        // openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            // closeModal();
        }, 4000);
    }


       

        
    

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

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

