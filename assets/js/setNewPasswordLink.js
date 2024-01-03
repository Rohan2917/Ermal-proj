const resetPasswordSentLink = document.getElementById('reset-password-btn');
const emailToResetPassword = document.getElementById('emailToResetPassword');
const resetLinkSentMsg = document.getElementById('resetLinkSent');
const resetLinkErrorMsg = document.getElementById('resetLinkError');
const lostPasswordFormEl = document.getElementById('lostPasswordForm');

async function sendResetPasswordLink(email) {
  const beUrl = `${BACKEND_URL}/${siteId}/account/requestResetPasswordLink`;
  const reqBody = {
    email: email,
  };
  try {
    const response = await fetch(beUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify(reqBody)
    })
    if (!response.ok) {
      emailToResetPassword.style.border = '2px solid red';
      lostPasswordFormEl.classList.add('hidden');
      resetLinkErrorMsg.classList.remove('d-none');
      throw new Error(`Can not send request for resetting password: ${beUrl}`);
    }
    lostPasswordFormEl.classList.add('hidden');
    resetLinkErrorMsg.classList.add('d-none');
    resetLinkSentMsg.classList.remove('d-none');
    emailToResetPassword.style.borderColor = '#273c89';
    emailToResetPassword.value = '';
    setTimeout(() => {
      window.location.reload();
    }, 2500);
  } catch (error) {
    console.log('Catching error: ', error.message);
  }
}

emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
resetPasswordSentLink.addEventListener('click', e => {
  if (!emailRegex.test(emailToResetPassword.value)) {
    emailToResetPassword.style.border = '2px solid red';
    e.preventDefault();
  } else {
    sendResetPasswordLink(emailToResetPassword.value);
  }
})

lostPasswordFormEl.addEventListener('submit', async function (e) {
  e.preventDefault();
  if (!emailRegex.test(emailToResetPassword.value)) {
    emailToResetPassword.style.border = '2px solid red';
  } else {
    await sendResetPasswordLink(emailToResetPassword.value);
  }
});
