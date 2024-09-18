import { useEffect, useState } from 'react';
import styles from './style.module.scss';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import OrganizationsAPI from 'src/api/OrganizationsAPI';
import Notifications from 'src/store/notification';
import Organizations from 'src/store/organizations';

interface IDataTable {
    id: string;
    name: string;
    date: string;
}

const OrganizationsPage = () => {
    const [orgs, setOrgs] = useState<IDataTable[]>([]);
    const [name, setName] = useState<string>('');
    const [date, setDate] = useState<Dayjs | null>(null);

    const getOrganizations = () => {
        OrganizationsAPI.getOrganizations().then((response) => {
            const data = response.data.orgs.map((org) => ({
                id: org._id,
                name: org.name,
                date: dayjs(org.exp).format('DD.MM.YYYY HH:mm:ss'),
            }));
            setOrgs(data);
            Organizations.setOrganizations(data);
        });
    };

    const saveOrganization = () => {
        if (!name || !date) {
            Notifications.setSnackMessage('Успешно');
        }
        OrganizationsAPI.createOrganizations({
            name,
            exp: dayjs(date).valueOf(),
        })
            .then((response) => {
                if (response.status <= 204) {
                    setName('');
                    setDate(null);
                    getOrganizations();
                    Notifications.setSnackMessage('Успешно');
                } else {
                    Notifications.setSnackMessage('Ошибка');
                }
            })
            .catch(() => {
                Notifications.setSnackMessage('Ошибка');
            });
    };

    const deleteOrganization = (id: string) => {
        OrganizationsAPI.deleteOrganization(id)
            .then((response) => {
                if (response.status <= 204) {
                    getOrganizations();
                    Notifications.setSnackMessage('Успешно');
                } else {
                    Notifications.setSnackMessage('Ошибка');
                }
            })
            .catch(() => {
                Notifications.setSnackMessage('Ошибка');
            });
    };

    useEffect(() => {
        if (Organizations.organizations.length) {
            setOrgs(Organizations.organizations);
            return;
        }
        getOrganizations();
    }, []);

    return (
        <div className={styles.body}>
            <div className={styles['form-block']}>
                <TextField
                    label='Название организации '
                    variant='outlined'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <DatePicker label='Активна до' value={date} onChange={setDate} />
                <Button
                    sx={{
                        my: 2,
                        color: 'white',
                        display: 'block',
                    }}
                    variant='contained'
                    onClick={saveOrganization}
                >
                    Сохранить
                </Button>
            </div>
            <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Название</TableCell>
                        <TableCell>Активна до</TableCell>
                        <TableCell>Действие</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orgs.map((org) => (
                        <TableRow key={org.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>{org.id}</TableCell>
                            <TableCell>{org.name}</TableCell>
                            <TableCell>{org.date}</TableCell>
                            <TableCell>
                                <Button
                                    sx={{
                                        my: 2,
                                        color: 'black',
                                        display: 'block',
                                    }}
                                    onClick={() => deleteOrganization(org.id)}
                                >
                                    удалить
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default OrganizationsPage;
