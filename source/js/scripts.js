// pretty print on load
window.onload = () => {
  window.window.currentStory = gup('_storyblok', window.location.href) + '-'
  initPrettyPrint()
  initSlugify()
  initTrackButton()
  initStartTourButtons()
  initLiveChat()
  initShowButton()

  initFirstAPICall()
  initSecondAPICall()


  initRenderingService()
  initTeaserState()
  initRenderingServiceGotIt()

  initApiSdkBoilerplates()
  initAPIHowtos()
  initApiSdkBoilerplateGotIt()

  checkSteps()
}

function initTrackButton() {
  var trackButtons = document.querySelectorAll('[data-track]')
  for (var index = 0, max = trackButtons.length; index < max; index++) {
    var trackButton = trackButtons[index];
    trackButton.addEventListener('click', (event) => {
      var toTrack = trackButton.getAttribute('data-track')
      ga('send', 'event', 'Button', toTrack, 'quickstart-v2');
    })
  }
}

function initShowButton() {
  var showButtons = document.querySelectorAll('[data-show]')
  for (var index = 0, max = showButtons.length; index < max; index++) {
    var showButton = showButtons[index];
    showButton.addEventListener('click', (event) => {
      var toShowId = showButton.getAttribute('data-show')
      showButton.classList.add('quickstart--hidden')
      var element = document.querySelector(toShowId)
      element.classList.remove('quickstart--hidden')
    })
  }
}

function initLiveChat() {
  var buttons = document.querySelectorAll('[data-trigger-livechat]')
  for (var index = 0, max = buttons.length; index < max; index++) {
    var button = buttons[index];
    if (button) {
      button.addEventListener('click', () => {
        if (window.storyblok) {
          window.storyblok.openLiveChat()
        }
      })
    }
  }
}

function initStartTourButtons() {
  var startTourButtons = document.querySelector('[data-start-tour]')
  if (startTourButtons) {
    startTourButtons.addEventListener('click', () => {
      if (window.storyblok) {
        window.storyblok.startTour()
      }
    })
  }
}

function initFirstAPICall() {
  var button = document.querySelector('[data-first-api]')
  if (button) {
    button.addEventListener('click', () => {
      localStorage.setItem(window.currentStory + 'step-first-api', 'true');
      doFirstAPICall()
    })
  }
}
function doFirstAPICall() {
  var toShow = document.querySelector('#first-api')
  if (toShow) {
    toShow.classList.remove('quickstart--hidden')
    var button = document.querySelector('[data-first-api]')
    if (button) {
      var step = findAncestor(button, 'step')
      step.classList.add('step--active')
    }
  }
}

function initSecondAPICall() {
  var button = document.querySelector('[data-second-api]')
  if (button) {
    button.addEventListener('click', () => {
      localStorage.setItem(window.currentStory + 'step-second-api', 'true');
      doSecondAPICall()
    })
  }
}
function doSecondAPICall() {
  var toShow = document.querySelector('#second-api')
  if (toShow) {
    toShow.classList.remove('quickstart--hidden')
    var button = document.querySelector('[data-second-api]')
    if (button) {
      var step = findAncestor(button, 'step')
      step.classList.add('step--active')
    }
  }
}

function initRenderingService() {
  var button = document.querySelector('[data-rendering-service]')
  if (!!button) {
    button.addEventListener('click', () => {
      localStorage.setItem(window.currentStory + 'step-rendering-service', 'true');
      localStorage.setItem(window.currentStory + 'step-api-sdk-boilerplates', 'false');
      doRenderingService()
    })
  }
}
function doRenderingService() {
  var toShow = document.querySelector('#rendering-service')
  if (!!toShow) {
    toShow.classList.add('quickstart--show')
    document.querySelector('#api-sdk-boilerplates').classList.remove('quickstart--show')

    var step = findAncestor(document.querySelector('[data-rendering-service]'), 'step')
    step.classList.add('step--active')
  }
}

function initApiSdkBoilerplates() {
  var button = document.querySelector('[data-api-sdk-boilerplates]')
  if (!!button) {
    button.addEventListener('click', () => {
      localStorage.setItem(window.currentStory + 'step-rendering-service', 'false');
      localStorage.setItem(window.currentStory + 'step-api-sdk-boilerplates', 'true');
      doApiSdkBoilerplates()
    })
  }
}
function doApiSdkBoilerplates() {
  var toShow = document.querySelector('#api-sdk-boilerplates')
  if (!!toShow) {
    toShow.classList.add('quickstart--show')
    document.querySelector('#rendering-service').classList.remove('quickstart--show')
    var step = findAncestor(document.querySelector('[data-api-sdk-boilerplates]'), 'step')
    step.classList.add('step--active')
  }
}

function initTeaserState() {
  var teaser = document.querySelector('.quickstart__teaser')
  if (!!teaser) {
    document.querySelector('.step--teaser-creation').classList.add('step--active')
  }
}

function initRenderingServiceGotIt() {
  var button = document.querySelector('[data-rendering-service-got-it]')
  if (!!button) {
    button.addEventListener('click', () => {
      localStorage.setItem(window.currentStory + 'step-rendering-service-got-it', 'true');
      doRenderingServiceGotIt()
    })
  }
}
function doRenderingServiceGotIt() {
  var step = findAncestor(document.querySelector('[data-rendering-service-got-it]'), 'step')
  step.classList.add('step--active')
}

function initApiSdkBoilerplateGotIt() {
  var button = document.querySelector('[data-api-sdk-boilerplates-got-it]')
  if (!!button) {
    button.addEventListener('click', () => {
      localStorage.setItem(window.currentStory + 'step-api-sdk-boilerplates-got-it', 'true');
      doApiSdkBoilerplateGotIt()
    })
  }
}
function doApiSdkBoilerplateGotIt() {
  var step = findAncestor(document.querySelector('[data-api-sdk-boilerplates-got-it]'), 'step')
  step.classList.add('step--active')
}




function checkSteps() {
  if (localStorage.getItem(window.currentStory + 'step-first-api') == 'true') {
    doFirstAPICall()
  }
  if (localStorage.getItem(window.currentStory + 'step-second-api') == 'true') {
    doSecondAPICall()
  }
  if (localStorage.getItem(window.currentStory + 'step-rendering-service') == 'true') {
    doRenderingService()
  }
  if (localStorage.getItem(window.currentStory + 'step-rendering-service-got-it') == 'true') {
    doRenderingServiceGotIt()
  }
  if (localStorage.getItem(window.currentStory + 'step-api-sdk-boilerplates') == 'true') {
    doApiSdkBoilerplates()
  }
  if (localStorage.getItem(window.currentStory + 'step-api-sdk-boilerplates-got-it') == 'true') {
    doApiSdkBoilerplateGotIt()
  }
}

function initAPIHowtos() {
  var qs = document.querySelectorAll('.quickstart__lang')
  var ct = document.querySelector('.step--choose-tech')
  for (var i = 0; i < qs.length; i++) {
    qs[i].addEventListener('click', function() {
      var qtabs = ct.querySelectorAll('.quickstart__t')
      for (var j = 0; j < qtabs.length; j++) {
        qtabs[j].style.display = 'none'
      }

      for (var x = 0; x < qs.length; x++) {
        qs[x].classList = 'quickstart__lang'
      }

      this.classList = 'quickstart__lang quickstart__lang--active'
      document.querySelector('[data-tab='+this.getAttribute('data-lang')+']').style.display = 'block'
    })
  }
}



function initPrettyPrint() {
  var toPrettyPrint = document.querySelectorAll('[data-pretty]')
  for (var index = 0, max = toPrettyPrint.length; index < max; index++) {
    var element = toPrettyPrint[index]
    var json = JSON.parse(element.innerHTML)
    clearStory(json)

    if (!!element.getAttribute('data-skip-body')) {
      json.content.body = []
      json = JSON.stringify(json, null, 2);
    } else {
      json = JSON.stringify(json, null, 2);
      json = json.replace('"body": [', '"body": [<em>')
      json = json.replace(`],
    "component": "root"`, `</em>],
    "component": "root"`)
    }

    json = json.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
    json = json.replace('&lt;em&gt;', '<em>').replace('&lt;\/em&gt;', '</em>')
    element.innerHTML = json
  }
}

function initSlugify() {
  var toSlugify = document.querySelectorAll('[data-slugify]')
  for (var index = 0, max = toSlugify.length; index < max; index++) {
    var element = toSlugify[index];
    element.innerHTML = element.innerHTML.replace(/\s+/g, '-').toLowerCase()
  }
}

function findAncestor(el, cls) {
  while ((el = el.parentElement) && !el.classList.contains(cls));
  return el;
}

function clearStory(story) {
  delete story.alternates
  delete story.tag_list
  delete story.sort_by_date
  delete story.is_startpage
  delete story.group_id
  delete story.parent_id
  delete story.content._editable
  return story
}

function gup(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
