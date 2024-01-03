async function formToJson(e) {
  e.preventDefault()
  let subscriptionData = JSON.parse(sessionStorage.getItem('selectedSubscription'))
  if (validatePaymentForm()) {
    let form = document.getElementById('subscribeForm')
    let subscriptionPayload = {
      subscriptionType: subscriptionData.subscriptionType,
      billingAddressData: {
        zipCode: '',
        address: '',
        city: '',
        state: '',
      },
      accountData: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      cardData: {
        cardNumber: '',
        cardHolder: '',
        cardExpiryMonth: '',
        cardExpiryYear: '',
        cardCvv: '',
      },
    }

    document.querySelectorAll('.paymentForms').forEach(function (formGroup) {
      let inputElement = formGroup.querySelector('input, select')
      let inputId = inputElement ? inputElement.id : null

      if (inputElement && inputId && inputElement.type !== 'checkbox') {
        let inputValue = inputElement.tagName === 'SELECT' ? inputElement.value : inputElement.value.trim()

        switch (inputId) {
          case 'subscribePassword':
            subscriptionPayload.accountData.password = inputValue
            break
          case 'subscribeStreetAddress':
            subscriptionPayload.billingAddressData.address = inputValue
            break
          case 'subscribeCity':
            subscriptionPayload.billingAddressData.city = inputValue
            break
          case 'selectCountry':
            subscriptionPayload.billingAddressData.country = inputValue
            break
          case 'selectState':
            subscriptionPayload.billingAddressData.state = inputValue
            break
          case 'subscribeCardHolder':
            subscriptionPayload.cardData.cardHolder = inputValue
            break
          case 'subscribeCardNumber':
            subscriptionPayload.cardData.cardNumber = inputValue
            break
          case 'subscribeExpiryMonth':
            subscriptionPayload.cardData.cardExpiryMonth = inputValue
            break
          case 'subscribeExpiryYear':
            subscriptionPayload.cardData.cardExpiryYear = inputValue
            break
          case 'subscribeCardCvv':
            subscriptionPayload.cardData.cardCvv = inputValue
            break
          case 'subscribeZipCode':
            subscriptionPayload.billingAddressData.zipCode = inputValue
            break
          case 'subscribeName':
            subscriptionPayload.accountData.firstName = inputValue
            break
          case 'subscribeEmail':
            subscriptionPayload.accountData.email = inputValue
            break
          case 'subscribeLastName':
            subscriptionPayload.accountData.lastName = inputValue
            break
          default:
        }
      }
    })

    // console.log("payment3DRequest", subscriptionPayload);
    let siteData = await getSiteData(siteId)
    if (siteData.secure3D) {
      try {
        const payment3DResp = await sendPayment3D(subscriptionPayload)
        console.log('payment3DResp', payment3DResp)
        if (payment3DResp.status === 'COMPLETED') {
          const payment3DConfirmResp = await sendPayment3DResponse({ paymentId: payment3DResp._id }, payment3DResp.tpResponse.id)
          // console.log("payment3DConfirmResp", payment3DConfirmResp);
          if (payment3DConfirmResp) {
            window.alert(`Payment confirmation for payment ID ${payment3DResp._id} was successful.`)
          } else {
            console.error('Payment confirmation failed:', payment3DConfirmResp.error)
          }
        } else {
          sessionStorage.setItem('payment3DResp', JSON.stringify(payment3DResp))
          window.location.href = payment3DResp.tpResponse.redirect.url
        }
      } catch (err) {
        // Handle the error
        console.error('Error during payment3D request:', err)
        // TODO: Add error messages or perform other error handling logic
        alert('An error occurred during the payment process. Please try again later.')
      }
    } else {
      const paymentResp = await sendPaymentClassic(subscriptionPayload)
      console.log('payment3DResp', paymentResp)
    }
    return false
  }
}

function validatePaymentForm() {
  let formValid = true
  let form = document.getElementById('subscribeForm')

  form.querySelectorAll('.paymentForms').forEach(function (formGroup) {
    let label = formGroup.querySelector('label')
    let inputElement = formGroup.querySelector('input, select')

    if (label && inputElement) {
      let inputValue = inputElement.tagName === 'SELECT' ? inputElement.value : inputElement.value.trim()
      let labelValue = label.textContent.trim().toLowerCase()
      let existingErrorMessage = formGroup.querySelector('.error-message')

      if (existingErrorMessage) {
        existingErrorMessage.remove()
      }

      // Reset border color since we are re-validating the form
      inputElement.style.borderColor = ''

      if (labelValue.includes('email')) {
        validateEmailField(inputValue, inputElement, formGroup, labelValue)
      } else if (inputElement.type === 'checkbox') {
        validateCheckbox(inputElement, formGroup, labelValue)
      } else {
        validateOtherField(inputValue, inputElement, formGroup, labelValue)
      }
    }
  })

  return formValid

  function validateEmailField(email, element, formGroup, labelValue) {
    if (!validateEmail(email)) {
      handleValidationFailure(element, formGroup, `Please insert a valid ${labelValue}`)
    } else {
      element.style.border = '1px solid rgb(221, 221, 221)'
    }
  }

  function validateCheckbox(element, formGroup, labelValue) {
    if (!element.checked) {
      handleValidationFailure(element, formGroup, `Please check the ${labelValue}`)
    }
  }

  function validateOtherField(value, element, formGroup, labelValue) {
    if (value === '') {
      handleValidationFailure(element, formGroup, `Please insert ${labelValue}`)
    } else {
      // Additional validations
      switch (labelValue) {
        case 'card cvv':
          if (!/^\d{3}$/.test(value)) {
            handleValidationFailure(element, formGroup, 'CVV should be a 3-digit number')
          }
          break
        case 'zip code':
          if (!/^\d+$/.test(value)) {
            handleValidationFailure(element, formGroup, 'Zip code should only contain numbers')
          }
          break
        case 'card number':
          if (!/^\d{16}$/.test(value)) {
            handleValidationFailure(element, formGroup, 'Card number should be a 16-digit number')
          } else {
            let cardNumberValue = parseInt(value, 10)
            if (cardNumberValue < 1000000000000000 || cardNumberValue > 9999999999999999) {
              handleValidationFailure(element, formGroup, 'Card number should be a 16-digit number')
            }
          }
          break
        case 'expiry month':
          let monthValue = parseInt(value, 10)
          if (monthValue < 1 || monthValue > 12 || isNaN(monthValue)) {
            handleValidationFailure(element, formGroup, 'Expiry month should be between 1 and 12')
          }
          break
        case 'expiry year':
          if (!/^\d{4}$/.test(value)) {
            handleValidationFailure(element, formGroup, 'Expiry year should be a 4-digit number')
          }
          break
        // Add other cases as needed
      }
    }
  }

  function handleValidationFailure(element, formGroup, errorMessage) {
    element.style.border = '2px solid red'
    formValid = false
    showErrorMessage(formGroup, errorMessage)
  }
}

function showErrorMessage(formGroup, message) {
  let errorMessageDiv = document.createElement('div')
  errorMessageDiv.className = 'error-message'
  errorMessageDiv.style.color = 'red'
  errorMessageDiv.innerHTML = message
  formGroup.insertBefore(errorMessageDiv, formGroup.firstChild)
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const formSubmitBtn = document.getElementById('registerAccount')
formSubmitBtn.addEventListener('click', formToJson)

function updatePageOnLoad() {
  let storedData = sessionStorage.getItem('selectedSubscription')
  console.log(storedData)
  if (storedData) {
    // Parse the JSON data
    let parsedData = JSON.parse(storedData)
    // Update the elements on the page with the retrieved data
    let productImage = document.querySelector('.product-img img')
    let priceElement = document.getElementById('price')
    let subtotalElement = document.getElementById('subtotal')
    let amountElement = document.getElementById('amount')
    let subscriptionTitleDiv = document.getElementById('subscriptionTitle')

    productImage.src = parsedData.figure
    priceElement.textContent = parsedData.price
    subtotalElement.textContent = parsedData.price + '/month'
    amountElement.textContent = parsedData.price + '/month'
    subscriptionTitleDiv.textContent = parsedData.subscriptionTitle
  }
}

// Call the function on page load
document.addEventListener('DOMContentLoaded', updatePageOnLoad)
