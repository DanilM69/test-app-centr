import { makeAutoObservable } from 'mobx';

class Organizations {
    organizations: any[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setOrganizations(organizations: any[]) {
        this.organizations = organizations;
    }
}

export default new Organizations();
