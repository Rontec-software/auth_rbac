import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export interface InputPhoneProps {
  phone: string;
  setPhone: (value: string) => void;
}

export default function InputPhone(props: InputPhoneProps) {
  return (
    <PhoneInput
      country={'br'}
      value={props.phone}
      onChange={(value) => props.setPhone(value)}
      inputStyle={{
        width: '100%',
        height: '43px',
        backgroundColor: '#09090B',
        color: 'white',
        border: '2px solid black',
        borderRadius: '5px',
        paddingLeft: '50px',
      }}
      dropdownStyle={{
        backgroundColor: '#09090B',
        color: 'white',
        border: '2px solid black',
        borderRadius: '5px',
      }}
      searchStyle={{
        backgroundColor: '#09090B',
        color: 'white',
        border: '2px solid black',
        borderRadius: '5px',
      }}
      buttonStyle={{
        backgroundColor: '#09090B',
        color: 'white',
        border: '2px solid black',
        borderRadius: '5px',
      }}
    />
  );
}
