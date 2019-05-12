
import {PhoneNumber} from './PhoneNumber'
export interface Employee {

    id : number;
    empName : string;
    email : string;
    phoneNumber : PhoneNumber[];
    gender : string;
    city: string,
    state: string,
    postalCode: string,
    isActive : boolean;


}
