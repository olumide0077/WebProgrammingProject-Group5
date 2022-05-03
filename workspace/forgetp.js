document.getElementById("btn").addEventListener("click", function() { 
    let email = document.getElementById("email").value;

    axios.post('http://db29-197-211-61-39.eu.ngrok.io/sendrecoverypassword', {
            email: email
        })
        .then(function (response) {
           console.log(response.data)
           alert(`Kindly proceed to`)
        })
        .catch(function (error) {
            alert(error.response.data.error)
        });
})
