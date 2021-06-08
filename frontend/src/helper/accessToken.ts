export default function getAccessToken() {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user && user.access_token) {
        return user.access_token;
    } else {
        return null;
    }
}

