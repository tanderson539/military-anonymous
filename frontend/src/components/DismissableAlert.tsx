import Alert from 'react-bootstrap/Alert';
import {AlertType} from '../types';
import { FC } from 'react';

interface Props {
  alert: AlertType;
  setShowAlert: (alert: boolean) => void;
}

export const DismissableAlert: FC<Props> = ({alert, setShowAlert}) => {

  return (
    <>
      <Alert show={true} variant={alert.error ? "danger" : "success"} onClose={() => setShowAlert(false)} className="pt-0 pb-0 mt-3 " >
      

        <div className="d-flex justify-content-between align-items-center p-1 m-0">
        <span>
          {alert.message}
        </span>
        
          <button type="button" className="btn-close p-0 m-0" aria-label="Close alert" onClick={() => setShowAlert(false)}></button>
        </div>

      </Alert>
    </>
  );
}