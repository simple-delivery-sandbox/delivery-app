const API_URL = 'http://localhost:80/api'

export const authProvider = {
    async signup(email: string, password: string) {
        const response = await fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) {
            throw new Error('Email already exists')
        }
    },
    async signin(email: string, password: string) {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) {
            throw new Error('Invalid email or password')
        }
        const { access_token } = await response.json();
        localStorage.setItem('access_token', access_token);
    },
    signout() {
        localStorage.removeItem('access_token');
    },
    async verifyToken() {
        const access_token = localStorage.getItem('access_token');
        if (!access_token) {
            return false; // トークンが存在しない場合は直ちにfalseを返す
        }

        try {
            const response = await fetch(`${API_URL}/user/info`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                }
            });

            if (response.ok) {
                return true; // トークンが有効であることを示す
            } else {
                localStorage.removeItem('access_token'); // レスポンスがOKでない場合、トークンを削除
                return false; // トークンが無効であることを示す
            }
        } catch (error) {
            console.error("Error verifying token:", error);
            localStorage.removeItem('access_token'); // エラーが発生した場合もトークンを削除
            return false; // エラーが発生したことを示す
        }
    }
}