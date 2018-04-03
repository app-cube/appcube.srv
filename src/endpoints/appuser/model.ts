
import {
    Table, 
    Column, 
    Model, 
    ForeignKey, 
    HasMany,
    BeforeFind,
    BeforeSave,
    BeforeUpdate
} 
from 'sequelize-typescript';

@Table({
    timestamps: true,
    freezeTableName: true,
    indexes: [
        {
            name: 'appuser_unq_email',
            index: 'UNIQUE',
            fields: ['appuseremail']
        }
    ]
})
export class Appuser extends Model<Appuser> {

    @Column({
        primaryKey: true,
        autoIncrement: false
    })
    appuserid: string

    @Column({
        allowNull: false
    })
    appuseremail: string

    @Column({
        allowNull: false
    })
    appusername: string

    @Column({
        allowNull: false
    })
    appusersurname: string;

    @Column({
        allowNull: false
    })
    appusrpassword: string;
}


