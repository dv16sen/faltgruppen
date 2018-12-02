import {Column, Model, Table} from "sequelize-typescript";

@Table
export default class Sample extends Model<Sample> {
    @Column
    text: string
}