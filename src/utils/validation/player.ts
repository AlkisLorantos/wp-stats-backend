import { Prisma } from "@prisma/client";
import isValidDate from "../isValidDate";
import isCountry from '../isCountry';

interface ValidationError {
    attribute: string;
    message: string
}

export default function validatePlayer(body: any): ValidationError[] {

    const errors: ValidationError[] = [];

    if (!isValidDate(body.birthday)) {

        errors.push({ attribute: 'birthday', message: 'Invalid date format (dd/mm/yyyy)' });

    };

    if (!isCountry(body.nationality)) {

        errors.push({ attribute: 'nationality', message: 'Invalid country code' });

    };

    return errors;

};