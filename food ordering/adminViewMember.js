function navigateTo(page) {
    // Navigate to the specified page
    window.location.href = page;
}

// Sample Orders Data
let members = [
    {
        id: "#M001",
        username: "John Doe",
        email: "johndoe@gmail.com",
        registrationDate: "08 Feb 2024",
        accountStatus: "Active"
    },
    {
        id: "#M002",
        username: "Jane Smith",
        email: "janesmith@gmail.com",
        registrationDate: "08 Feb 2024",
        accountStatus: "Active"
    }
];

// Display Members
function displayMembers() {
    const memberList = document.getElementById("member-list");
    memberList.innerHTML = "";

    members.forEach((member, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${member.id}</td>
            <td>${member.username}</td>
            <td>${member.email}</td>
            <td>${member.registrationDate}</td>
            <td>${member.accountStatus}</td>
        `;
        memberList.appendChild(row);
    });
}

// Initial Display
displayMembers();
