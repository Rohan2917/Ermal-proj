let buttons = document.querySelectorAll('.btn')
buttons.forEach(function (button) {
  button.addEventListener('click', function () {
    let parent = this.closest('.pricing-list')
    let figure = parent.querySelector('figure img').src
    let priceElement = parent.querySelector('h3')
    let price = priceElement.innerText.split('\n')[0].trim()
    let subscriptionType = parent.getAttribute('type') // Assuming type attribute is set
    let subscriptionTitle = parent.getAttribute('title') // Assuming title attribute is set
    let subscriptionData = JSON.stringify({ subscriptionType, subscriptionTitle, figure: figure, price: price }) // json stringy cause it returns object object
    console.log(subscriptionData)
    sessionStorage.setItem('selectedSubscription', subscriptionData)
  })
})
