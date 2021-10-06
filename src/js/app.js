// A base class is defined using the new reserved 'class' keyword




// event Listeners
eventListeners();
function eventListeners() {
  const ui = new UI()
  // preloader
  window.addEventListener('load', function () {
    ui.hidePreloader();
    
  })
  // nav btn
  document.querySelector('.navBtn').addEventListener('click', function () {
    ui.showNav();
  })
  // control the video
  document.querySelector('.video__switch').addEventListener('click', function () {
    ui.videoControls()
  })
  // submit the form
  document.querySelector('.drink-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.querySelector('.input-name').value;
    const lastName = document.querySelector('.input-lastname').value;
    const email = document.querySelector('.input-email').value;

    let value = ui.checkEmpty(name, lastName, email)

    if (value) {
      let customer = new Customer(name, lastName, email)
      console.log(customer);
      ui.addCustomer(customer)
      ui.showFeedback('custumer added to the list', 'success')
      ui.clearFields()

    }
    else {
      ui.showFeedback('some form values empty', 'error')
    }

  })
  // display modal
  const links = document.querySelectorAll('.work-item__icon');


  links.forEach(function (item) {
    item.addEventListener('click', function (event) {
      ui.showModal(event)
    })
  })
  // hide modal
  document.querySelector('.work-modal__close').addEventListener('click', function () {
    ui.closeModal()
  })

  // MAP AND API 
  window.addEventListener('load', function () {
    ui.initMap();
    
  })

}

  ///////////////////////////////////////////////////


//constructor function
function UI() {
}

// hide preloader
UI.prototype.hidePreloader = function () {
  document.querySelector('.preloader').style.display = "none";
}
// show Nav
UI.prototype.showNav = function () {
  document.querySelector('.nav').classList.toggle('nav--show')
}
// play/pause the vidoe
UI.prototype.videoControls = function () {
  let btn = document.querySelector('.video__switch-btn');
  if (!btn.classList.contains('btnSlide')) {
    btn.classList.add('btnSlide')
    document.querySelector('.video__item').pause()
  }
  else {
    btn.classList.remove('btnSlide')
    document.querySelector('.video__item').play()
  }
}
// check for empty values
UI.prototype.checkEmpty = function (name, lastname, email) {
  let result;
  if (name === '' || lastname === '' || email === '') {

    result = false;
  }
  else {
    result = true;
  }
  return result;
}

UI.prototype.showFeedback = function (text, type) {
  const feedback = document.querySelector('.drink-form__feedback');
  if (type === 'success') {
    feedback.classList.add('success');
    feedback.innerText = text;
    this.removeAlert('success');
  }
  else if (type === 'error') {

    feedback.classList.add('error');
    feedback.innerText = text;
    this.removeAlert('error');
  }
}
// remove alert
UI.prototype.removeAlert = function (type) {

  setTimeout(function () {
    document.querySelector('.drink-form__feedback').classList.remove(type)
  }, 3000)

}
// add customer
UI.prototype.addCustomer = function (customer) {
  let images = [1, 2, 3, 4, 5];
  let random = Math.floor(Math.random() * images.length);
  const myDiv = document.createElement('myDiv');
  myDiv.classList.add('person');
  let userData = `<img src="./src/img/person-${random}.jpeg" alt="person" class="person__thumbnail">
            <h4 class="person__name">${customer.name}</h4>
            <h4 class="person__last-name">${customer.lastname}</h4>`
  myDiv.innerHTML = userData;
  document.querySelector('.drink-card__list').appendChild(myDiv)
}
// clear fields
UI.prototype.clearFields = function () {
  document.querySelector('.input-name').value = '';
  document.querySelector('.input-lastname').value = '';
  document.querySelector('.input-email').value = '';
}
// show modal

UI.prototype.showModal = function (event) {
  event.preventDefault();
  if (event.target.parentElement.classList.contains('work-item__icon')) {


    let id = event.target.parentElement.dataset.id

    const modal = document.querySelector('.work-modal');
    const modalItem = document.querySelector('.work-modal__item');

    modal.classList.add('work-modal--show');
    modalItem.img.src = `url(./src/img/work-${id}.jpeg)`
  }
}
// hide modal

UI.prototype.closeModal = function () {
  document.querySelector('.work-modal').classList.remove('work-modal--show');
}

// map and api
UI.prototype.initMap = function () {
            // map optoins
            let options = {
                zoom: 8,
                center: {lat: 33.6353, lng:-7.4504}
            }
            // new map
            let map = new google.maps.Map(document.getElementById("map"), options)
            // add marker
            new google.maps.Marker({
                position: { lat: 33.6353, lng: -7.4504 },
                map,
            });
        }


// customer 
function Customer(name, lastname, email) {
  this.name = name,
    this.lastname = lastname,
    this.email = email;
}