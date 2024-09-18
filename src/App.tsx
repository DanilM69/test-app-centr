import Router from './router';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Router />
            </LocalizationProvider>
        </div>
    );
}

export default App;
