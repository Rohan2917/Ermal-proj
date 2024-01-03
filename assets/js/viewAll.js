const loadAllCategoryBooks = async (categoryName) => {
    const container = document.querySelector('.categories-container')
    const name = categoryName.replaceAll(' ', '').replace(/[^a-zA-Z ]/g, "").toLowerCase()
    const html = `
    <div class="row justify-content-start ea-mt-50">
        <div class="col">
            <div class="category position-relative" id="category-${name}">
                <div class="title d-flex flex-column position-relative">
                    <h1 class="mb-4">${categoryName.toUpperCase()}</h1>
                </div>
                <div class="allBooksContainer d-flex flex-row space-evenly flex-wrap w-100">
                    
                </div>
            </div>
        </div>
    </div>`
    container.innerHTML+=html

    const response = await getBooks()
    const myBooks = await response.books.filter(category => category.categoryName === categoryName)

    const updateMenu = (categoryName) => {
        const menu = document.getElementById('menu-categories')
        const name = categoryName.replaceAll(' ', '').replace(/[^a-zA-Z ]/g, "").toLowerCase()
        const id = "menu-" + name 

        const categoryHtml = `
            <li class="library-menu-item menu-item-category d-flex justify-content-start align-items-center m-0 ps-2 ms-1 mt-4" id=${id}>
                <a class="w-100 view-all-link">
                   ${categoryName.toUpperCase()}
                   <small class="d-none">${categoryName}</small>
                </a>
            </li>`

        const listItems = document.querySelectorAll('.menu-item-category')
        const duplicates = [...listItems].filter(item => item.id === id)
        if(listItems.length === 0) {
            menu.innerHTML += categoryHtml
        } else if (listItems.length !== 0 && duplicates.length < 1){
            menu.innerHTML += categoryHtml
        } else {
            //
        }
    }
    
    const updateCategory = (book) => {
        // Truncate book information
        const truncateBookTitle = (title) => {
            if(title.length > 25) {
                title = title.substring(0, 25) + '...'
            }
            return title
        }
        const truncateBookDescription = (desc) => {
            if (desc.length > 100) {
                desc = desc.substring(0, 100) + "...";
            }
            return desc
        }

        const bookHTML = ` 
            <div class="swiper-slide view-all-book m-3" onclick="window.open('${book.pdfUrl.replaceAll(' ', '%20')}')">
                <img src=${book.imgUrl.replaceAll(' ', '%20')} alt=${truncateBookTitle(book.title)} class="img-fluid swiper-img">
                <div class="library-book-info d-flex flex-column">
                    <h3>${truncateBookTitle(book.title)}</h3>
                    <p>${truncateBookDescription(book.description)}</p>
                </div>
                <a href="#" class="ms-auto">
                    <small>Read Now</small>
                </a>
            </div>`
        document.querySelector('.allBooksContainer').innerHTML+=bookHTML
    }

    response.books.forEach(category => {
        updateMenu(category.categoryName)
    })
       myBooks[0].list.forEach(book => {
       updateCategory(book)
       })

       const links = document.querySelectorAll('.view-all-link')
       links.forEach(link => {
            link.addEventListener('click', () => {
                const cName = link.firstElementChild.innerText
                localStorage.setItem('Bookcategory', '')
                localStorage.setItem('Bookcategory', cName)
                console.log(localStorage.getItem('Bookcategory'))
                window.location='library_all.html'
            })
       })
}

loadAllCategoryBooks(localStorage.getItem('Bookcategory'))