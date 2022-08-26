module.exports = (sequelize,DataTypes)=>{
    const ipTable = sequelize.define('ipTable',{
        id:{
            type:DataTypes.BIGINT,
            autoIncrement:true,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        ipAddress:{
            type:DataTypes.STRING(15),
            allowNull: false,
            unique:true

        },
        time:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        pressedOn:{
            type:DataTypes.DATE,
            allowNull:false,
            defaultValue:DataTypes.NOW
        }
    },{
        timestamps:false
    })

    return ipTable;
}