// material-ui
import Button from '@mui/material/Button';
// project import

// assets
import AnimateButton from 'components/@extended/AnimateButton';

// ==============================|| DRAWER CONTENT - NAVIGATION CARD ||============================== //

export default function NavCard() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}>
      <AnimateButton>
        <Button variant="contained" color="success" size="small">
          Logout
        </Button>
      </AnimateButton>
    </div>
  );
}
