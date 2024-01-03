// Speed Games
const speedImgElement1 = document.getElementById('speed-games-card-1-background-img')
const computedStyle = getComputedStyle(speedImgElement1)
const speedimgUrl1 = computedStyle.getPropertyValue('--index-speed-games-card-1-background-img').trim()
const speedcleanedUrl1 = speedimgUrl1.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '')
speedImgElement1.src = speedcleanedUrl1

const speedImgElement2 = document.getElementById('speed-games-card-2-background-img')
const speedimgUrl2 = getComputedStyle(document.documentElement).getPropertyValue('--index-speed-games-card-2-background-img').trim()
const speedcleanedUrl2 = speedimgUrl2.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '')
speedImgElement2.src = speedcleanedUrl2

const speedImgElement3 = document.getElementById('speed-games-card-3-background-img')
const speedimgUrl3 = getComputedStyle(document.documentElement).getPropertyValue('--index-speed-games-card-3-background-img').trim()
const speedcleanedUrl3 = speedimgUrl3.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '')
speedImgElement3.src = speedcleanedUrl3

// Problem Solving Games
const problemSolvingImgElement1 = document.getElementById('problem-solving-games-card-1-background-img')
const problemSolvingimgUrl1 = getComputedStyle(document.documentElement).getPropertyValue('--index-problem-solving-games-card-1-background-img').trim()
const problemSolvingcleanedUrl1 = problemSolvingimgUrl1.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '')
problemSolvingImgElement1.src = problemSolvingcleanedUrl1

const problemSolvingImgElement2 = document.getElementById('problem-solving-games-card-2-background-img')
const problemSolvingimgUrl2 = getComputedStyle(document.documentElement).getPropertyValue('--index-problem-solving-games-card-2-background-img').trim()
const problemSolvingcleanedUrl2 = problemSolvingimgUrl2.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '')
problemSolvingImgElement2.src = problemSolvingcleanedUrl2

const problemSolvingImgElement3 = document.getElementById('problem-sloving-games-card-3-background-img')
const problemSolvingimgUrl3 = getComputedStyle(document.documentElement).getPropertyValue('--index-problem-solving-games-card-3-background-img').trim()
const problemSolvingcleanedUrl3 = problemSolvingimgUrl3.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '')
problemSolvingImgElement3.src = problemSolvingcleanedUrl3

// Memory Games
const memoryImgElement1 = document.getElementById('memory-games-card-1-background-img')
const memoryimgUrl1 = getComputedStyle(document.documentElement).getPropertyValue('--index-memory-games-card-1-background-img').trim()
const memorycleanedUrl1 = memoryimgUrl1.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '')
memoryImgElement1.src = memorycleanedUrl1

const memoryImgElement2 = document.getElementById('memory-games-card-2-background-img')
const memoryimgUrl2 = getComputedStyle(document.documentElement).getPropertyValue('--index-memory-games-card-2-background-img').trim()
const memorycleanedUrl2 = memoryimgUrl2.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '')
memoryImgElement2.src = memorycleanedUrl2

const memoryImgElement3 = document.getElementById('memory-games-card-3-background-img')
const memoryimgUrl3 = getComputedStyle(document.documentElement).getPropertyValue('--index-memory-games-card-3-background-img').trim()
const memorycleanedUrl3 = memoryimgUrl3.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '')
memoryImgElement3.src = memorycleanedUrl3

// Attention Games
const attentionImgElement1 = document.getElementById('attention-games-card-1-background-img')
const attentionimgUrl1 = getComputedStyle(document.documentElement).getPropertyValue('--index-attention-games-card-1-background-img').trim()
const attentioncleanedUrl1 = attentionimgUrl1.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '')
attentionImgElement1.src = attentioncleanedUrl1

const attentionImgElement2 = document.getElementById('attention-games-card-2-background-img')
const attentionimgUrl2 = getComputedStyle(document.documentElement).getPropertyValue('--index-attention-games-card-2-background-img').trim()
const attentioncleanedUrl2 = attentionimgUrl2.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '')
attentionImgElement2.src = attentioncleanedUrl2

const attentionImgElement3 = document.getElementById('attention-games-card-3-background-img')
const attentionimgUrl3 = getComputedStyle(document.documentElement).getPropertyValue('--index-attention-games-card-3-background-img').trim()
const attentioncleanedUrl3 = attentionimgUrl3.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '')
attentionImgElement3.src = attentioncleanedUrl3
