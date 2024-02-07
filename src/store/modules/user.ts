import { defineStore } from 'pinia';
import { User } from '../../models/user.interface.ts';

export const useUserStore = defineStore('user', {
    state: () => ({
        currentUser: {
            id: 1,
            name: 'John Doe'
        },
    }),
    actions: {
        setUser(user: User) {
            this.currentUser = user;
        },
    },
});
