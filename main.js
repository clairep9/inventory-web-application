
function addDeleteEvent() {
    const removeButtons = document.querySelectorAll(".remove-button")
    removeButtons.forEach(function (button) {
        button.addEventListener("click", (e) => deleteBook(e))
    })
}
addDeleteEvent()

function deleteBook(e) {
    const resourceSection = e.target.closest(".resource")
    resourceSection.remove()
}

function addChangeEvent() {
    const stockButtons = document.querySelectorAll('.stockbox .stock-button');
    stockButtons.forEach(function (button) {
        button.addEventListener('click', (e) => changeStock(e));
    });
}
addChangeEvent()

function changeStock(e) {
    const stockLabel = e.target.textContent.trim();

    if (stockLabel === 'In Stock') {
        e.target.textContent = 'Out of Stock';
        e.target.classList.add("out-of-stock")
    } else {
        e.target.textContent = 'In Stock';
        e.target.style.color = ''
    }
    if (e.target.textContent.trim() === 'Out of Stock') {
        e.target.style.color = 'red';
    }
}
document.getElementById('button2').addEventListener('click', validateForm);

function validateForm() {
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const price = document.getElementById('price').value.trim();
    const genre = document.getElementById('genre').value.trim();
    const image = document.getElementById('image').value.trim();

    var errorMessagesArray = [];
    if (!title) {
        errorMessagesArray.push('*Title is required.');
    }
    if (!author) {
        errorMessagesArray.push('*Author is required.');
    }
    if (!price) {
        errorMessagesArray.push('*Price is required.');
    }
    if (!genre) {
        errorMessagesArray.push('*Genre is required.');
    }
    if (!image) {
        errorMessagesArray.push('*Image URL is required.');
    }

    if (errorMessagesArray.length > 0) {
        displayErrorMessages(errorMessagesArray);
        return;
    }


    const newResource = document.createElement('section');
    newResource.classList.add('resource');
    const inStock = document.getElementById('in-stock').value;
    newResource.innerHTML = `
        <img src="${image}" />
        <span>
        <nav>
        <h3>${title}</h3>
        <hr>
        <h4>${author}</h4>
        <h5>${price}</h5>
        <h5>${genre}</h5>
        </nav>
        <div class="stockbox">
            <button class="stock-button" style="border: none; font-weight: bold; font-size: 12px;">${inStock}</button>
        </div>
        <br>
    <button class="remove-button">Remove</button>
</span>    
    `;


    const resourceContainer = document.getElementById('resource-container');
    resourceContainer.prepend(newResource);
    addDeleteEvent()
    addChangeEvent()

    resetForm();
}


function resetForm() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('price').value = '';
    document.getElementById('genre').value = '';
    document.getElementById('in-stock').value = '-- Select One --';
    document.getElementById('errorMessages').innerHTML = '';
}




function displayErrorMessages(messagesArray) {
    const errorMessagesElement = document.getElementById('errorMessages');
    errorMessagesElement.innerHTML = '';

    messagesArray.forEach(function (message) {
        let errorMessage = document.createElement('div');
        errorMessage.textContent = message;
        errorMessagesElement.appendChild(errorMessage);
    });
}



const form = document.querySelector("#resource-form")
form.addEventListener("submit", (event) => {
    event.preventDefault()
    validateForm()
})



