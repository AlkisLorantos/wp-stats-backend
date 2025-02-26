const countryList = [
    'FR',
    'EN'
];

export default function isCountry(value: string) {

    return countryList.includes(value.toUpperCase());

};