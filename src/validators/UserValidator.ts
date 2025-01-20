import * as Yup from 'yup';
import { RoleType } from '../enums/RoleType';

export class UserValidator {
    public createUserValidator() {
        return Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().required('Email is required').email('Email is not valid'),
            password: Yup.string()
                .required('Password is required')
                .min(8, 'Password must be at least 8 characters')
                .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                .matches(/\d/, 'Password must contain at least one number')
                .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
            role: Yup.mixed()
                .oneOf(Object.values(RoleType), 'Role must be a valid role type')
                .required('Role is required'),
        });
    };
    
    public loginUserValidator() {
        return Yup.object({
            email: Yup.string().required('Email is required').email('Email is not valid'),
            password: Yup.string().required('Password is required'),
        });
    };
}