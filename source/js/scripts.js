// pretty print on load
window.onload = () => {
  initPrettyPrint()
  initActiveStates()
  initTrackButton()
  initRequestApiButtons()
  initStartTourButtons()
  initShowButton()
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
      var element = document.querySelector(toShowId)
      element.classList.remove('quickstart--hidden')
    })
  }
}

function initStartTourButtons() {
  var startTourButtons = document.querySelector('[data-start-tour]')
  startTourButtons.addEventListener('click', () => {
    if (window.storyblok) {
      window.storyblok.startTour()
    }
  })
}

function initPrettyPrint() {
  var toPrettyPrint = document.querySelectorAll('[data-pretty]')
  for (var index = 0, max = toPrettyPrint.length; index < max; index++) {
    var element = toPrettyPrint[index]
    var json = JSON.parse(element.innerHTML)

    if (!!element.getAttribute('data-skip-body')) {
      json.content.body = []
      element.innerHTML = JSON.stringify(clearStory(json), null, 2)
    } else {
      var formatted = JSON.stringify(clearStory(json), null, 2);
      formatted = formatted.replace('"body": [', '"body": [<em>')
      formatted = formatted.replace(`],
    "component": "root"`, `</em>],
    "component": "root"`)
      element.innerHTML = formatted
    }
  }
}

function initActiveStates() {
  var currentStoryId = gup('_storyblok', window.location.href)
  var localStorageKey = currentStoryId + 'active-api-steps'

  var activeApiSteps = JSON.parse(window.localStorage.getItem(localStorageKey))
  if (!activeApiSteps) {
    activeApiSteps = []
    window.localStorage.setItem(localStorageKey, JSON.stringify(activeApiSteps))
  }

  for (var index = 0, max = activeApiSteps.length; index < max; index++) {
    var activeStep = activeApiSteps[index];

    var codeBlock = document.querySelector(activeStep)
    codeBlock.classList.remove('quickstart--hidden')

    var requestButton = document.querySelector(`[data-show-step="${activeStep}"]`)
    if (requestButton) {
      requestButton.classList.add('quickstart--hidden')
    }

    var actualStep = findAncestor(codeBlock, 'step')
    actualStep.classList.add('step--active')
  }
}

function initRequestApiButtons() {
  var currentStoryId = gup('_storyblok', window.location.href)
  var localStorageKey = currentStoryId + 'active-api-steps'

  var requestButtons = document.querySelectorAll('[data-show-step]')
  for (var index = 0, max = requestButtons.length; index < max; index++) {
    var element = requestButtons[index];

    element.addEventListener('click', (event) => {
      var toShowId = event.currentTarget.getAttribute('data-show-step')
      var toShow = document.querySelector(event.currentTarget.getAttribute('data-show-step'))

      event.currentTarget.classList.add('quickstart--hidden')
      toShow.classList.remove('quickstart--hidden')

      var stepHistory = JSON.parse(window.localStorage.getItem(localStorageKey))

      if (stepHistory.indexOf(toShowId) == -1) {
        stepHistory.push(toShowId)
        window.localStorage.setItem(localStorageKey, JSON.stringify(stepHistory))
      }

      findAncestor(event.currentTarget, 'step').classList.add('step--active')
    })
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
