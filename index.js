function getData() {
    console.log("hi")
    // Retrieve values from the form
    var cortexInput = document.getElementById("cortex").value;
    var cortexList = cortexInput.split(",").map(cortex => cortex.trim());
    var scope = document.querySelector('input[name="scope"]:checked').value;
    var productSync =document.querySelector('input[name="product_sync"]:checked').value;
    var doNotSkip = document.querySelector('input[name="do_not_skip"]:checked').value;
    var hasError = false;


    // Validate Cortex (comma-separated list)
    if (!cortexInput) {
        document.getElementById('cortexError').textContent = 'Please enter cortex values';
        hasError = true;
    } else {
        // Split the cortex input and remove empty values
        var cortexList = cortexInput.split(',').map(cortex => cortex.trim()).filter(Boolean);
        if (cortexList.length === 0) {
            document.getElementById('cortexError').textContent = 'Please enter valid cortex values';
            hasError = true;
        }
    }
    if (hasError) {
        return;
    }
    // Display the retrieved values
 


     data = {
        "cortex_list": cortexList,
        "scope": scope,
        "product_sync": productSync,
        "do_not_skip": doNotSkip,
        "sync_services": [
            "elasticsearch",
            "qna_serv"
        ]
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




document.getElementById("dataForm").addEventListener("submit", e => {
    e.preventDefault();
    getData();
});


