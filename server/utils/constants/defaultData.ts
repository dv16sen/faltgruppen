import {Sequelize} from "sequelize-typescript";

const defaultData: {[x: string]: object[]} = {
    Sample: [
        {text: "This is data from the MySQL database"},
        {text: "Fetched with help of express and sequelize"},
        {text: "REST endpoint available at /api/sample"},
    ],
    Event: [
        {
            measure: "Detta är en text som förklarar åtgärden som togs.",
            gender: "Kille",
            location: "Hagaskolan"
        }
    ]
};

export const loadDefaultData = async (sequelize: Sequelize): Promise<any> => {
    return Promise.all(Object.keys(defaultData).map(model => {
        return Promise.all(defaultData[model].map(data => {
            return sequelize.models[model].create(data);
        }));
    }))
};

export default defaultData;