import { AppBar, Box, Button, Snackbar, Toolbar } from '@mui/material';
import styles from './style.module.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Notifications from 'src/store/notification';

const Layout = observer(() => {
    const navigate = useNavigate();

    return (
        <div className={styles.layout}>
            <AppBar position='fixed'>
                <Toolbar>
                    <Box sx={{ flexGrow: 1, display: 'flex' }}>
                        <Button
                            sx={{
                                my: 2,
                                color: window.location.pathname === '/main' ? 'black' : 'white',
                                display: 'block',
                            }}
                            onClick={() => navigate('/main')}
                        >
                            Главная
                        </Button>
                        <Button
                            sx={{
                                my: 2,
                                color: window.location.pathname === '/organizations' ? 'black' : 'white',
                                display: 'block',
                            }}
                            onClick={() => navigate('/organizations')}
                        >
                            Организации
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <div className={styles.outlet}>
                <Outlet />
            </div>
            <Snackbar
                open={!!Notifications.snackMessage}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                autoHideDuration={3000}
                message={Notifications.snackMessage}
                onClose={() => Notifications.setSnackMessage('')}
            />
        </div>
    );
});

export default Layout;
