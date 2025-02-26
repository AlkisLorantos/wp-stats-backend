export default function isValidDate(value: string) {

    const regex = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d)$/;

    if (!regex.test(value)) {
        return false;
    };

    const [day, month, year] = value.split('/').map(Number);
    const date = new Date(year, month - 1, day);

    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;

};