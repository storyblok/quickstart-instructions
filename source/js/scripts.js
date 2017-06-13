window.onload = () => {
  var toPrettyPrint = document.querySelectorAll('[data-pretty]')
  for (var index = 0, max = toPrettyPrint.length; index < max; index++) {
    var element = toPrettyPrint[index]
    var json = JSON.parse(element.innerHTML)

    if (!!element.getAttribute('data-skip-body')) {
      json.content.body = []
    }

    element.innerHTML = JSON.stringify(clearStory(json), null, 2)
  }
}

var requestButtons = document.querySelectorAll('[data-show]')
for (var index = 0, max = requestButtons.length; index < max; index++) {
  var element = requestButtons[index];
  element.addEventListener('click', (event) => {
    var toShow = document.querySelector(event.currentTarget.getAttribute('data-show'))
    toShow.classList.remove('u-hidden')
  })
}

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
