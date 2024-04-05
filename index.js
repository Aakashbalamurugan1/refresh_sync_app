function getData() {
    console.log("hi")
    // Retrieve values from the form
    var Input = document.getElementById("cortex").value;
    var List = cortexInput.split(",").map(cortex => cortex.trim());
    var scope = document.querySelector('input[name="scope"]:checked').value;
    var productSync =document.querySelector('input[name="product_sync"]:checked').value;
    var doNotSkip = document.querySelector('input[name="do_not_skip"]:checked').value;


    if (!cortexInput) {
        document.getElementById('cortexError').textContent = 'Please enter cortex values';
    } else {  
        if (List.length === 0) {
            document.getElementById('cortexError').textContent = 'Please enter valid cortex values';     
        }
    }

    data = {
        "scope": scope,
        "product_sync": productSync,
        "do_not_skip": doNotSkip,
        "sync_services": [
            "elasticsearch",
            "qna_serv"
        ]
    }
 
    if (scope == "account") {
        data.account_list=List;
    }
    if (scope == "product") {
        data.cortex_list=List;
    }

    const url = 'your_api_endpoint_here';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer <Token>'
    };

    console.log("data:", data);
    console.log("url:", url);
    console.log("headers :", headers);
    // postData(url, headers, data)
    //     .then(response => {
    //         console.log('Data received:', response);
    //         // Do something with the response if needed
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //         // Handle errors here
    //     });
}

function postData(url, headers, data) {
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    });
}

document.getElementById("scope_account").addEventListener("change", updateCortexOrAccount);
document.getElementById("scope_product").addEventListener("change", updateCortexOrAccount);

function updateCortexOrAccount() {

    if(document.querySelector('input[name="scope"]:checked').value=="account"){ 
        document.getElementById("cortexOrAccount").innerText = "Account ids (comma-separated list):"
     }else if (document.querySelector('input[name="scope"]:checked').value=="product"){
         document.getElementById("cortexOrAccount").innerText = "Cortex ids (comma-separated list):"
     }
}


document.getElementById("dataForm").addEventListener("submit", e => {
    e.preventDefault();
    getData();
});


