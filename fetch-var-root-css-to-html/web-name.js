const rootStyles = getComputedStyle(document.documentElement)
var title = rootStyles.getPropertyValue('--website-name')

const pageName = document.title
title = title.replace(/'/g, '')
document.title = title + ' - ' + pageName
