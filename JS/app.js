const inputFeild = document.getElementById('input-field');
const searchBtn = document.getElementById('search-btn');

// Book Information div id
const bookInfo = document.getElementById('book-info');

// Book cover div id
const bookCover = document.getElementById('book-details');

// Error Handle div
const errorHandle = document.getElementById('error-handle');

searchBtn.addEventListener('click', ()=>{
    const searchText = inputFeild.value;
    

    if(inputFeild.value === ''){
        // clear error 
        errorHandle.textContent = '';

        const errorPara = document.createElement('p');
        errorPara.innerHTML = `
            <h3>Input field can't be empty</h3>
        `;
        errorHandle.appendChild(errorPara);

        // clear data showing
        bookInfo.textContent = '';

        // clear cover showing
        bookCover.textContent = '';
        return;
    }
    // clear error
    errorHandle.textContent = '';
    
    const bookUrl = `http://openlibrary.org/search.json?q=${searchText}`;
    

    fetch(bookUrl)
    .then(res => res.json())
    .then(data => displayNumberOFData(data.num_found))

   

    fetch(bookUrl)
    .then(res => res.json())
    .then(data => displayBook(data.docs))

})

const displayNumberOFData = numberOfData =>{
    console.log(numberOfData);

    if(numberOfData === 0){
        const errorPara = document.createElement('p');
        errorPara.innerHTML = `
            <h3>Please enter valid keyword</h3>
        `;
        errorHandle.appendChild(errorPara);
    }
} 

const displayBook = books => {
        // clear data showing
        bookInfo.textContent = '';

        // clear cover showing
        bookCover.textContent = '';
 
    books.forEach(book => {
        const booksDiv = document.createElement('div');
        booksDiv.classList.add('col');
        booksDiv.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        
                        <h3 class="card-title fw-bold fs-5 ">${book.title}</h3>
                        <h4 class="text-muted">Author : ${book.author_name}</h4>
                        <h5 class="fw-light text-muted ">Publlisher : ${book.publisher}</h5>
                        <h6 class="fw-light text-muted">Published : ${book.first_publish_year}</h6>
                        <button onclick = "displayDetails('${book.cover_i}')" class="btn btn-outline-info">see cover</button>
                        
                    </div>
                </div>
        `;
        bookInfo.appendChild(booksDiv);
    });   
}

const displayDetails = async details => {
    const coverImgUrl = `https://covers.openlibrary.org/b/id/${details}-M.jpg`;
    loadDetails(details);
}

const loadDetails = showCover => {
     
        // clear cover showing
        bookCover.textContent = '';
    
    const detailsDiv = document.createElement('div');
    detailsDiv.innerHTML = `
        <div class="card mx-auto my-4 w-25">
            <img src="https://covers.openlibrary.org/b/id/${showCover}-M.jpg" class="card-img-top" alt="...">
            <button class="w-50 btn btn-outline-info mx-auto my-2">Buy Now</button>    
            </div>
        </div>
    `;
    bookCover.appendChild(detailsDiv);
}

// <img src="https://covers.openlibrary.org/b/id/${books.cover_i}-L.jpg">