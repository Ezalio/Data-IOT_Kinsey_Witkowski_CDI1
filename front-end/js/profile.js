const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:3000/getMyProfile", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) throw new Error('Failed to fetch profile.');

        const { user } = await response.json();
        document.getElementById("userName").innerHTML = `Name: ${user.username || 'Not provided'}`;
        document.getElementById("userEmail").innerHTML = `Email: ${user.email}`;
    } catch (error) {
        localStorage.removeItem("token"); 
        window.location.href = "login.html";
    }
};

fetchUser();

function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}
