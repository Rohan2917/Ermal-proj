const resetToken = new URLSearchParams(window.location.search).get("resetToken");
const resetNewPasword = document.getElementById('resetNewPassword');
const resetVerifyNewPasword = document.getElementById('resetVerifyNewPassword');
const resetPasswordButton = document.getElementById('resetPasswordButton');
const resetPasswordFormContainer = document.getElementById('resetPasswordFormContainer');
const resetPasswordResponseBox = document.getElementById('resetPasswordResponseBox');
const resetResponseText = document.getElementById('resetResponseText');

async function setNewPassword(newPassword){
    const beUrl = `${BACKEND_URL}/${siteId}/account/setNewPassword`;
    if(!resetToken){
      resetResponseText?.classList.add('text-danger');
      resetResponseText.textContent = 'Invalid token! Please try again!'
      resetPasswordFormContainer.classList.add('d-none');
      resetPasswordResponseBox.classList.remove('d-none');
    } else {
        resetPasswordFormContainer.classList.remove('d-none');
        resetPasswordResponseBox.classList.add('d-none');
    }
    const data = {password: newPassword, resetToken: resetToken}
    try {
        const response = await fetch(beUrl, {
            method: 'PUT',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
    })
    if(!response.ok){
        resetPasswordFormContainer.classList.add('d-none');
        resetPasswordResponseBox.classList.remove('d-none');
        resetResponseText.classList.add('text-danger');
        resetResponseText.textContent = 'There was a problem reseting your password! Please try again later!';
        throw new Error(response.message)
    }
    resetPasswordFormContainer.classList.add('d-none');
    resetPasswordResponseBox.classList.remove('d-none');
    resetResponseText.classList.add('text-success');
    resetResponseText.textContent = 'Your password has been successfully changed. You can now log in with your new password.'
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
    } catch (error) {
        console.error("Error when setNewPassword:", error);
        window.location.reload();
    }
}

resetPasswordButton.addEventListener('click', async () => {
    if(resetNewPasword.value !== resetVerifyNewPasword.value || resetNewPasword.value === ''){
        resetVerifyNewPasword.style.border = '2px solid red';
    } else {
        console.log(resetVerifyNewPasword.value);
        await setNewPassword(resetVerifyNewPasword.value);
        resetVerifyNewPasword.style.borderColor = '#273c89';
    }
})