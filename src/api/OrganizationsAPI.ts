import { AxiosResponse } from 'axios';
import axiosConfig from './axiosConfig';
import ICreateOrganizationRequest from 'src/models/request/ICreateOrganizationRequest';
import IOrganizationsResponse from 'src/models/response/IOrganizationsResponse';
import IEditOrganizationRequest from 'src/models/request/IEditOrganizationRequest';

class OrganizationsAPI {
    public static getOrganizations(): Promise<AxiosResponse<IOrganizationsResponse>> {
        return axiosConfig.get('/orgs');
    }

    public static createOrganizations(body: ICreateOrganizationRequest): Promise<AxiosResponse<any>> {
        return axiosConfig.post('/orgs', body);
    }

    public static editOrganizations(body: IEditOrganizationRequest): Promise<AxiosResponse<any>> {
        return axiosConfig.put('/orgs', body);
    }

    public static deleteOrganization(id: string): Promise<AxiosResponse<any>> {
        return axiosConfig.delete('/orgs', { data: { id } });
    }
}

export default OrganizationsAPI;
