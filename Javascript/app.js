document.addEventListener("DOMContentLoaded", function () {
    let users = [];
    let userId = 1;
    let selectedUserId = null;

    const form = document.getElementById("myForm");
    const userTable = document.getElementById("data-form");
    const submitBtn = document.querySelector(".submit");
    const imgInput = document.getElementById("imgInput");
    const previewImg = document.querySelector(".imgholder img");

    // Handle image upload preview
    imgInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImg.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Function to handle form submission
    function handleSubmit(event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const age = document.getElementById("age").value;
        const city = document.getElementById("city").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const post = document.getElementById("post").value;
        const sDate = document.getElementById("sDate").value;
        const imageSrc = previewImg.src; // Get image preview source

        if (!name || !age || !city || !email || !phone || !post || !sDate) {
            alert("Please fill all fields!");
            return;
        }

        if (selectedUserId === null) {
            // Add new user
            users.push({ id: userId++, name, age, city, email, phone, post, sDate, imageSrc });
        } else {
            // Update existing user
            const user = users.find(user => user.id === selectedUserId);
            if (user) {
                user.name = name;
                user.age = age;
                user.city = city;
                user.email = email;
                user.phone = phone;
                user.post = post;
                user.sDate = sDate;
                user.imageSrc = imageSrc;
            }
            selectedUserId = null; // Reset after update
            submitBtn.textContent = "Submit";
        }

        form.reset();
        previewImg.src = "./img/person.png"; // Reset image preview
        displayUsers();
        document.querySelector("#userForm .btn-close").click(); // Close modal
    }

    // Function to display users
    function displayUsers() {
        userTable.innerHTML = "";
        users.forEach((user, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td><img class="profile" src="${user.imageSrc}" width="50" height="50"></td>
                <td>${user.name}</td>
                <td>${user.age}</td>
                <td>${user.city}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>${user.post}</td>
                <td>${user.sDate}</td>
                <td>
                    <button class="btn btn-success" onclick="viewUser(${user.id})">Show</button>
                    <button class="btn btn-primary" onclick="editUser(${user.id})">Update</button>
                    <button class="btn btn-danger" onclick="deleteUser(${user.id})">Delete</button>
                </td>
            `;
            userTable.appendChild(row);
        });
    }

    // Function to delete user
    window.deleteUser = function (id) {
        users = users.filter(user => user.id !== id);
        displayUsers();
    };

    // Function to edit user
    window.editUser = function (id) {
        const user = users.find(user => user.id === id);
        if (user) {
            document.getElementById("name").value = user.name;
            document.getElementById("age").value = user.age;
            document.getElementById("city").value = user.city;
            document.getElementById("email").value = user.email;
            document.getElementById("phone").value = user.phone;
            document.getElementById("post").value = user.post;
            document.getElementById("sDate").value = user.sDate;
            previewImg.src = user.imageSrc; // Show existing image

            selectedUserId = id;
            submitBtn.textContent = "Update";
            
            new bootstrap.Modal(document.getElementById("userForm")).show(); // Open modal
        }
    };

    // Function to view user details
    window.viewUser = function (id) {
        const user = users.find(user => user.id === id);
        if (user) {
            document.querySelector("#readData input[id='name']").value = user.name;
            document.querySelector("#readData input[id='age']").value = user.age;
            document.querySelector("#readData input[id='city']").value = user.city;
            document.querySelector("#readData input[id='email']").value = user.email;
            document.querySelector("#readData input[id='phone']").value = user.phone;
            document.querySelector("#readData input[id='post']").value = user.post;
            document.querySelector("#readData input[id='sDate']").value = user.sDate;
            document.querySelector("#readData img").src = user.imageSrc; // Show image

            new bootstrap.Modal(document.getElementById("readData")).show();
        }
    };

    form.addEventListener("submit", handleSubmit);
});
