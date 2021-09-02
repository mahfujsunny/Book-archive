const inputFeild = document.getElementById('input-field');
const searchBtn = document.getElementById('search-btn');

// Book Information div id
const bookInfo = document.getElementById('book-info');

// Book cover div id
const bookCover = document.getElementById('book-details');

// Error Handle div
const errorHandle = document.getElementById('error-handle');

// Result handle div
const resultFound = document.getElementById('result-found');

// spinner
const toggleSpinner = displayStyle => {
    document.getElementById('loading-spinner').style.display = displayStyle;
};

// search Button
searchBtn.addEventListener('click', ()=>{
    const searchText = inputFeild.value;

    // spinner start
    toggleSpinner('block');
    
    // Error Handle 
    if(inputFeild.value === ''){

        // clear error 
        errorHandle.textContent = '';

        const errorPara = document.createElement('p');
        errorPara.innerHTML = `
            <h4 class="text-white text-center bg-danger mx-auto rounded p-3 w-50">Input field can't be empty</h4>
        `;
        errorHandle.appendChild(errorPara);

        // clear data showing
        bookInfo.textContent = '';

        // clear cover showing
        bookCover.textContent = '';

        // clear result showing
        resultFound.textContent = '';

        // spinner stop
        toggleSpinner('none');
        return;
    }
    // clear error
    errorHandle.textContent = '';
    
    // book search by name API
    const bookUrl = `https://openlibrary.org/search.json?q=${searchText}`;
    
    // number of result Fetching
    fetch(bookUrl)
    .then(res => res.json())
    .then(data => displayNumberOFData(data))

    // Book information Fetching
    fetch(bookUrl)
    .then(res => res.json())
    .then(data => displayBook(data.docs))

})

// for result
const displayNumberOFData = numberOfData =>{

        // clear result Showing
        resultFound.textContent = '';

        const resultPara = document.createElement('p');
        resultPara.innerHTML = `
            <p class="text-center bg-dark w-25 mx-auto rounded text-white p-2">Result Found : ${numberOfData.num_found} Showing result : ${numberOfData.docs.length}</p>
        `;
        resultFound.appendChild(resultPara);

    // Error Handling 
    if(numberOfData.num_found === 0){
        const errorPara = document.createElement('p');
        errorPara.innerHTML = `
            <h3 class="text-white text-center bg-danger mx-auto rounded p-3 w-50">Please enter valid keyword</h3>
        `;
        errorHandle.appendChild(errorPara);

        // clear result Showing
        resultFound.textContent = '';
    }
    
} 

const displayBook = books => {
        // clear data showing
        bookInfo.textContent = '';

        // clear cover showing
        bookCover.textContent = '';

    // loop for every books
    books.forEach(book => {
        const booksDiv = document.createElement('div');
        booksDiv.classList.add('col');
        booksDiv.innerHTML = `
                <div class="card h-100">
                    <div class="card-body">
                        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg" class= "card-img-center rounded mx-auto d-block my-2">
                        <h3 class="card-title fw-bold fs-3"
                        style="font-family:Dancing Script">${book.title}</h3>
                        <h4 class="text-muted">Author : ${book.author_name}</h4>
                        <h5 class="fw-light text-muted ">Publlisher : ${book.publisher}</h5>
                        <h6 class="fw-light text-muted">Published : ${book.first_publish_year}</h6>
                        <button onclick = "displayDetails('${book.cover_i}')" class="btn btn-outline-info">see cover</button>
                        
                    </div>
                </div>
        `;
        bookInfo.appendChild(booksDiv);

    });

    // spinner stop
    toggleSpinner('none');
    
}


const displayDetails = details => {
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
            <button class="w-50 btn btn-outline-secondary mx-auto my-2">Buy Now</button>    
            </div>
        </div>
    `;
    bookCover.appendChild(detailsDiv);
}
