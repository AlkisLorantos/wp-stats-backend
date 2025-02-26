interface ValidationError {
    attribute: string;
    message: string;
}
export default function validatePlayer(body: any): ValidationError[];
export {};
