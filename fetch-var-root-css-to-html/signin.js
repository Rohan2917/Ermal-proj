const imgElement = document.getElementById('sign-in-background-img')
const computedStyle = getComputedStyle(imgElement) 
const imgUrl = computedStyle.getPropertyValue('--sign-in-container-background-img').trim()

// Extract the URL from different formats (with or without quotes)
const cleanedUrl = imgUrl.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '')
imgElement.src = cleanedUrl
