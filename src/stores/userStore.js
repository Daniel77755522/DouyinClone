import { makeAutoObservable, runInAction } from 'mobx';

class UserStore {
    user = null; // Stored user object or null if not logged in
    isAuthenticated = false;

    constructor() {
        makeAutoObservable(this);
    }

    login(username, password) {
        // Mock login
        this.loading = true;
        setTimeout(() => {
            runInAction(() => {
                this.user = {
                    id: 'me',
                    username: username || 'Daniel77755522',
                    displayName: 'Daniel Vale',
                    avatar: '👤',
                    stats: {
                        following: 120,
                        followers: '45K',
                        likes: '1.2M'
                    }
                };
                this.isAuthenticated = true;
            });
        }, 800);
    }

    logout() {
        this.user = null;
        this.isAuthenticated = false;
    }
}

export const userStore = new UserStore();
