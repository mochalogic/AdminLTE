'use strict';


module.exports = (sequelize, DataTypes) => {
  const tableName = 'ComponentType'
  const columns = {
    name: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.STRING
    },
    version: {
      type: DataTypes.INTEGER
    }
  }
  const options = {}

  const ComponentType = sequelize.define(tableName, columns, options);

  console.log(ComponentType);

  ComponentType.associate = function(models) {
    // Classroom.hasMany(models.Student, {
    //   foreignKey: 'classroom_id',
    //   as: 'students',
    // });

    // Student.belongsTo(models.Classroom);
    // Student.belongsToMany(models.Course, {
    //   through: 'StudentCourse',
    //   as: 'courses',
    //   foreignKey: 'student_id'
    // });

    // Lecturer.associate = function(models) {
    //   Lecturer.hasOne(models.Course, {
    //     foreignKey: 'lecturer_id',
    //     as: 'lecturer',
    //   });
    // };

    // Course.associate = function(models) {
    //   Course.belongsToMany(models.Student, {
    //     through: 'StudentCourse',
    //     as: 'students',
    //     foreignKey: 'course_id'
    //   });
    //   Course.belongsTo(models.Lecturer);
    // };
  };
  return ComponentType;
};
