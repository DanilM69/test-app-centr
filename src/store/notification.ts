import { makeAutoObservable } from 'mobx';

class Notifications {
    snackMessage = '';

    constructor() {
        makeAutoObservable(this);
    }

    setSnackMessage(message: string) {
        this.snackMessage = message;
    }
}

export default new Notifications();
