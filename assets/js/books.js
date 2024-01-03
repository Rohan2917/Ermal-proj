async function renderBooks() {
  showLoadingIcon()

  const updateMenu = (categoryName) => {
    const menu = document.getElementById("menu-categories")
    const name = categoryName
      .replaceAll(" ", "")
      .replace(/[^a-zA-Z ]/g, "")
      .toLowerCase()
    const id = "menu-" + name
    const href = "#category-" + name

    // const icons = {
    //     business: "bi bi-currency-dollar",
    //     health: "bi bi-clipboard2-pulse",
    //     fooddrink: "bi bi-cup-straw",
    //     computing: "bi bi-pc-display-horizontal",
    //     artphotography: "bi bi-palette-fill",
    //     craftsandhobbies: "bi bi-scissors"
    //     // add all cases
    // }
    // <i class="${icons[name]} m-0 me-2 fs-5"></i>
    const categoryHtml = `
            <li class="library-menu-item menu-item-category d-flex justify-content-start align-items-center m-0 ps-2 ms-1 mt-4" id=${id}>
                <a href=${href} class="w-100">
                   ${categoryName.toUpperCase()}
                </a>
            </li>`

    const listItems = document.querySelectorAll(".menu-item-category")
    const duplicates = [...listItems].filter((item) => item.id === id)
    if (listItems.length === 0) {
      menu.innerHTML += categoryHtml
    } else if (listItems.length !== 0 && duplicates.length < 1) {
      menu.innerHTML += categoryHtml
    } else {
      //
    }
  }

  const updateSliders = (book, categoryName) => {
    const sliders = document.querySelectorAll("swiper-container")
    const id = categoryName
      .replaceAll(" ", "")
      .replace(/[^a-zA-Z ]/g, "")
      .toLowerCase()

    // Truncate book information
    const truncateBookTitle = (title) => {
      if (title.length > 28) {
        title = title.substring(0, 28) + "..."
      }
      return title
    }
    const truncateBookDescription = (desc) => {
      if (desc.length > 100) {
        desc = desc.substring(0, 100) + "..."
      }
      return desc
    }

    const bookHTML = ` 
            <div class="swiper-slide" onclick="window.open('${book.pdfUrl.replaceAll(" ", "%20")}')">
                <img src=${book.imgUrl.replaceAll(" ", "%20")} alt=${truncateBookTitle(book.title)} class="img-fluid swiper-img">
                <div class="library-book-info d-flex flex-column">
                    <h3>${truncateBookTitle(book.title)}</h3>
                    <p>${truncateBookDescription(book.description)}</p>
                </div>
                <a href="#" class="ms-auto">
                    <small>Read Now</small>
                </a>
            </div>`

    const sliderEl = [...sliders].find((s) => s.id === id)
    if (sliderEl) {
      if (sliderEl.childElementCount < 10) {
        sliderEl.innerHTML += bookHTML
      } else {
        //
      }
    } else {
      createSlider(categoryName)
      updateSliders(book)
      // let sliderList = document.querySelectorAll('swiper-container')
      // let mySlider = [...sliderList].find(s => s.id = id)
      // mySlider.innerHTML+=bookHTML
    }
  }

  const createSlider = (categoryName) => {
    const name = categoryName
      .replaceAll(" ", "")
      .replace(/[^a-zA-Z ]/g, "")
      .toLowerCase()
    const sliderHTML = `
        <div class="row justify-content-start ea-mt-50">
            <div class="col">
                <div class="category position-relative" id="category-${name}">
                    <div class="title d-flex flex-column position-relative">
                        <h1 class="mb-4">${categoryName.toUpperCase()}</h1>
                        <div class="swiper-scrollbar mt-5 bottom-0 w-100" id="swiper-scrollbar-${name}"></div>
                    </div>
                    <div class="swiper-button-prev me-3" id="swiper-button-prev-${name}"></div>
                    <div class="swiper-button-next" id="swiper-button-next-${name}"></div>
                    <swiper-container 
                        id="${name}"
                        class="mt-5"   
                        space-between="20" 
                        navigation-next-el="#swiper-button-next-${name}" navigation-prev-el="#swiper-button-prev-${name}"
                        scrollbar-el="#swiper-scrollbar-${name}">
                    </swiper-container>
                    <a><button class="more-btn btn" id=${categoryName}>View All<small class="d-none">${categoryName}</small></button></a>
                </div>
            </div>
        </div>`

    const slidersContainer = document.querySelector(".categories-container")
    slidersContainer.innerHTML += sliderHTML

    const buttons = document.querySelectorAll(".more-btn")

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const cName = btn.firstElementChild.innerText
        localStorage.setItem("Bookcategory", "")
        localStorage.setItem("Bookcategory", cName)
        console.log(localStorage.getItem("Bookcategory"))
        window.location = "library_all.html"
      })
    })
  }

  try {
    // Get books from API
    const response = await getBooks()

    // booksList -- mock data
    response.books.forEach((category) => {
      createSlider(category.categoryName)
      updateMenu(category.categoryName)
      category.list.forEach((book) => {
        updateSliders(book, category.categoryName)
      })
    })

    // Hide loading icon after rendering is complete
    hideLoadingIcon()
  } catch (error) {
    console.error("Error fetching books:", error)
    // Handle error if necessary
    // Hide loading icon in case of error
    hideLoadingIcon()
  }
}

const showLoadingIcon = () => {
  const loadingIcon = document.getElementById("loading-icon")
  if (loadingIcon) {
    loadingIcon.classList.remove("d-none")
  }
}

const hideLoadingIcon = () => {
  const loadingIcon = document.getElementById("loading-icon")
  if (loadingIcon) {
    loadingIcon.classList.add("d-none")
  }
}

// Show sidebar on large screens
const showSidebar = () => {
  const sidebar = document.getElementById("offcanvasScrolling")
  let w = screen.width
  if (w < 991) {
    sidebar.dataset.bsBackdrop = "true"
    sidebar.classList.remove("show")
  } else {
    sidebar.classList.add("show")
  }
}

// Change number of slides on window size
const updateSlidersperView = () => {
  //await renderBooks()
  const swipers = document.querySelectorAll("swiper-container")
  swipers.forEach((swiper) => (swiper.slidesPerView = 4))
  let w = screen.width
  swipers.forEach((swiper) => {
    if (w < 450) {
      swiper.slidesPerView = 1
    } else if (w < 768) {
      swiper.slidesPerView = 2
    } else if (w < 1200) {
      swiper.slidesPerView = 3
    }
  })
}

document.getElementById("libraryLogout").addEventListener("click", (e) => {
  e.preventDefault() // Prevent the default link behavior (page navigation)
  localStorage.removeItem(LOCAL_STORAGE_ACCOUNT_PROFILE_KEY)
  localStorage.removeItem(LOCAL_STORAGE_ACCOUNT_LOGIN_KEY)
  window.location.href = "index.html"
})

setTimeout(() => {
  showSidebar()
  updateSlidersperView()
}, 1)

window.addEventListener("resize", () => {
  showSidebar()
  updateSlidersperView()
})

window.addEventListener("load", () => {
  console.log("loaded")
  renderBooks()
  setTimeout(updateSlidersperView, 380)
})

updateSlidersperView()

redirectToHomeIfNotLoggedIn()
function redirectToHomeIfNotLoggedIn() {
  let token = getTokenFromStorage()
  if (!token) {
    window.location.href = "login.html" // Token is missing, redirect to the login page
  }
}
