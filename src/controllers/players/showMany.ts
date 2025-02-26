// import { Request, Response } from "express";
// import { getPlayers } from "../../services/player";

// const validParamKeys = {
//     'position': String,
//     'cap_number': Number,
//     'team_id': Number,
//     'nationality': String,
//     'age': Number
// };

// const queryToFieldMap = {
//     'cap_number': 'capNumber',
//     'team_id': 'teamId'
// };

// const convertType = (key: string, value: any) => {

//     const paramType = validParamKeys[key];

//     if (paramType === Number) {

//         const convertedValue = Number(value);

//         if (isNaN(convertedValue)) throw new Error(`Invalid value for ${key}`);
        
//         return convertedValue;

//     };

//     return value.toUpperCase();

// };

// export const showMany = async (req: Request, res: Response) => {

//     let errors: string[] = [];
//     const params: any = {};

//     Object.keys(req.query).forEach(param => {

//         if (!(param in validParamKeys)) {

//             errors.push(param);
//             return;

//         };

//         const field = queryToFieldMap[param] || param;
//         params[field] = convertType(param, req.query[param]);

//     });

//     if (errors.length !== 0) {

//         return res.status(422).json({
//             error: `Invalid parameters (${errors.join(', ')})`,
//             accepted_parameters: Object.keys(validParamKeys).join(', '),
//         });

//     };

//     const players = await getPlayers(params);

//     return res.status(200).json({
//         data: players,
//     });

// };


import { Request, Response } from "express";
import { getPlayers } from "../../services/player";

const validParamKeys: Record<string, any> = {
    position: String,
    cap_number: Number,
    team_id: Number,
    nationality: String,
    age: Number,
};

const queryToFieldMap: Record<string, string> = {
    cap_number: "capNumber",
    team_id: "teamId",
};

const convertType = (key: string, value: any) => {
    const paramType = validParamKeys[key];

    if (paramType === Number) {
        const convertedValue = Number(value);
        if (isNaN(convertedValue)) throw new Error(`Invalid value for ${key}`);
        return convertedValue;
    }

    return typeof value === "string" ? value.toUpperCase() : value;
};

export const showMany = async (req: Request, res: Response) => {
    try {
        let errors: string[] = [];
        const params: Record<string, any> = {};

        Object.keys(req.query).forEach((param) => {
            if (!(param in validParamKeys)) {
                errors.push(param);
                return;
            }

            const field = queryToFieldMap[param] || param;
            try {
                params[field] = convertType(param, req.query[param]);
            } catch (error) {
                errors.push(`${param} (invalid value)`);
            }
        });

        if (errors.length !== 0) {
            return res.status(422).json({
                error: `Invalid parameters (${errors.join(", ")})`,
                accepted_parameters: Object.keys(validParamKeys).join(", "),
            });
        }

        const players = await getPlayers(params);

        return res.status(200).json({ data: players });
    } catch (error) {
        console.error("Error fetching players:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
