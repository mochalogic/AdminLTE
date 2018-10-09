module.exports = (sequelize, DataTypes) => {
  return sequelize
    .define(
      'app',
      {
        appId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          // defaultValue: 'myDefaultValue',
          // unique: true,
          primaryKey: true,
          autoIncrement: true,
          // field: 'table_column_name',
          // references: {
          //   model: OBJECT,
          //   key: 'OBJECT.ColName'
          // },
          // get() { this.getDataValue('col') },
          // set(val) { this.setDataValue('col', value) },
          // validate: {
          //   is: ...
          //   not: ...
          // }
        },
        version: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: 'myDefaultValue',
          // unique: true,
          // primaryKey: true,
          // autoIncrement: true,
          // field: 'table_column_name',
          // references: {
          //   model: OBJECT,
          //   key: 'OBJECT.ColName'
          // },
          // get() { this.getDataValue('col') },
          // set(val) { this.setDataValue('col', value) },
          // validate: {
          //   is: ...
          //   not: ...
          // }
        },
        // onCreated: {
        //   type: DataTypes.DATE,
        //   allowNull: true,
        //   defaultValue: DataTypes.NOW,
        // },
        // onUpdated: {
        //   type: DataTypes.DATE,
        //   allowNull: true,
        //   defaultValue: DataTypes.NOW,
        // }
      },
      {
        // tableName: '',
        freezeTableName: true,
        timestamps: true,
        createdAt: 'onCreated',
        updatedAt: 'onUpdated',
        // paranoid: false,
        // deletedAt: 'onDeleted',
        // underscores: false,
        // indexes: [],
        // version: true, // or 'value'
      }
    )
}


// Sequelize.STRING                      // VARCHAR(255)
// Sequelize.STRING(1234)                // VARCHAR(1234)
// Sequelize.STRING.BINARY               // VARCHAR BINARY
// Sequelize.TEXT                        // TEXT
// Sequelize.TEXT('tiny')                // TINYTEXT
//
// Sequelize.INTEGER                     // INTEGER
// Sequelize.BIGINT                      // BIGINT
// Sequelize.BIGINT(11)                  // BIGINT(11)
//
// Sequelize.FLOAT                       // FLOAT
// Sequelize.FLOAT(11)                   // FLOAT(11)
// Sequelize.FLOAT(11, 12)               // FLOAT(11,12)
//
// Sequelize.REAL                        // REAL        PostgreSQL only.
// Sequelize.REAL(11)                    // REAL(11)    PostgreSQL only.
// Sequelize.REAL(11, 12)                // REAL(11,12) PostgreSQL only.
//
// Sequelize.DOUBLE                      // DOUBLE
// Sequelize.DOUBLE(11)                  // DOUBLE(11)
// Sequelize.DOUBLE(11, 12)              // DOUBLE(11,12)
//
// Sequelize.DECIMAL                     // DECIMAL
// Sequelize.DECIMAL(10, 2)              // DECIMAL(10,2)
//
// Sequelize.DATE                        // DATETIME for mysql / sqlite, TIMESTAMP WITH TIME ZONE for postgres
// Sequelize.DATE(6)                     // DATETIME(6) for mysql 5.6.4+. Fractional seconds support with up to 6 digits of precision
// Sequelize.DATEONLY                    // DATE without time.
// Sequelize.BOOLEAN                     // TINYINT(1)
//
// Sequelize.ENUM('value 1', 'value 2')  // An ENUM with allowed values 'value 1' and 'value 2'
// Sequelize.ARRAY(Sequelize.TEXT)       // Defines an array. PostgreSQL only.
// Sequelize.ARRAY(Sequelize.ENUM)       // Defines an array of ENUM. PostgreSQL only.
//
// Sequelize.JSON                        // JSON column. PostgreSQL, SQLite and MySQL only.
// Sequelize.JSONB                       // JSONB column. PostgreSQL only.
//
// Sequelize.BLOB                        // BLOB (bytea for PostgreSQL)
// Sequelize.BLOB('tiny')                // TINYBLOB (bytea for PostgreSQL. Other options are medium and long)
//
// Sequelize.UUID                        // UUID datatype for PostgreSQL and SQLite, CHAR(36) BINARY for MySQL (use defaultValue: Sequelize.UUIDV1 or Sequelize.UUIDV4 to make sequelize generate the ids automatically)
//
// Sequelize.CIDR                        // CIDR datatype for PostgreSQL
// Sequelize.INET                        // INET datatype for PostgreSQL
// Sequelize.MACADDR                     // MACADDR datatype for PostgreSQL
//
// Sequelize.RANGE(Sequelize.INTEGER)    // Defines int4range range. PostgreSQL only.
// Sequelize.RANGE(Sequelize.BIGINT)     // Defined int8range range. PostgreSQL only.
// Sequelize.RANGE(Sequelize.DATE)       // Defines tstzrange range. PostgreSQL only.
// Sequelize.RANGE(Sequelize.DATEONLY)   // Defines daterange range. PostgreSQL only.
// Sequelize.RANGE(Sequelize.DECIMAL)    // Defines numrange range. PostgreSQL only.
