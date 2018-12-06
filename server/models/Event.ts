import {Column, Model, Table} from "sequelize-typescript";

@Table({timestamps: true})
export default class Event extends Model<Event> {
    @Column({
        allowNull: false,
        validate: {
            isIn: [["Tjej", "Kille"]]
        }
    })
    gender: string;

    @Column({allowNull: false})
    location: string;

    @Column({allowNull: false})
    measure: string;
}