
import {
    Table, 
    Column, 
    Model, 
    ForeignKey, 
    HasMany,
    BeforeFind,
    BeforeSave,
    BeforeUpdate,
    DataType
} 
from 'sequelize-typescript';

@Table({
    timestamps: true,
    freezeTableName: true
})
export class Balance extends Model<Balance> {

    @Column({
        primaryKey: true,
        autoIncrement: false
    })
    id: string

    @Column({
        allowNull: false        
    })
    userid: string

    @Column({
        allowNull: false,
        type: DataType.DOUBLE
    })
    balanceamount: number
}


