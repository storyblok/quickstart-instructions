// pretty print on load
window.onload = () => {

  // pretty print the content jsons - and clear some data
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


  // set api request steps as active if already done.
  var activeApiSteps = JSON.parse(window.localStorage.getItem('activeApiSteps'))
  if (!activeApiSteps) {
    activeApiSteps = []
    window.localStorage.setItem('activeApiSteps', JSON.stringify(activeApiSteps))
  }

  for (var index = 0, max = activeApiSteps.length; index < max; index++) {
    var activeStep = activeApiSteps[index];

    var codeBlock = document.querySelector(activeStep)
    codeBlock.classList.remove('u-hidden')

    var requestButton = document.querySelector(`[data-show="${activeStep}"]`)
    if (requestButton) {
      requestButton.classList.add('u-hidden')
    }

    var actualStep = findAncestor(codeBlock, 'step')
    actualStep.classList.add('step--active')
  }


  // init show api request buttons.
  var requestButtons = document.querySelectorAll('[data-show]')
  for (var index = 0, max = requestButtons.length; index < max; index++) {
    var element = requestButtons[index];

    element.addEventListener('click', (event) => {
      var toShowId = event.currentTarget.getAttribute('data-show')
      var toShow = document.querySelector(event.currentTarget.getAttribute('data-show'))

      event.currentTarget.classList.add('u-hidden')
      toShow.classList.remove('u-hidden')

      var stepHistory = JSON.parse(window.localStorage.getItem('activeApiSteps'))

      if (stepHistory.indexOf(toShowId) == -1) {
        stepHistory.push(toShowId)
        window.localStorage.setItem('activeApiSteps', JSON.stringify(stepHistory))
      }

      findAncestor(event.currentTarget, 'step').classList.add('step--active')

    })
  }

  // init start tour buttons
  var startTourButtons = document.querySelector('[data-start-tour]')
  startTourButtons.addEventListener('click', () => {
    if (window.storyblok) {
      window.storyblok.startTour()
    }
  })
}

// find nearest element with class
function findAncestor(el, cls) {
  while ((el = el.parentElement) && !el.classList.contains(cls));
  return el;
}

// clear story data for simplicity
function clearStory(story) {
  // provide clear data
  delete story.alternates
  delete story.tag_list
  delete story.sort_by_date
  delete story.is_startpage
  delete story.group_id
  delete story.parent_id
  delete story.full_slug
  delete story.content._editable
  return story
}
