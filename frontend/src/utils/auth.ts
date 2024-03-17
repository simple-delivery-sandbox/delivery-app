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
        const { access_token, role } = await response.json();
        localStorage.setItem('access_token', access_token);
        return role;
    },
    signout() {
        localStorage.removeItem('access_token');
    },
    async verifyToken() {
        const access_token = localStorage.getItem('access_token');
        if (!access_token) {
            return { isValid: false }; // トークンが存在しない場合は直ちにfalseを返す
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
                const userInfo = await response.json();
                return { isValid: true, role: userInfo.role }
            } else {
                localStorage.removeItem('access_token'); // レスポンスがOKでない場合、トークンを削除
                return { isValid: false }; // トークンが無効であることを示す
            }
        } catch (error) {
            console.error("Error verifying token:", error);
            localStorage.removeItem('access_token'); // エラーが発生した場合もトークンを削除
            return { isValid: false }; // エラーが発生したことを示す
        }
    }
}