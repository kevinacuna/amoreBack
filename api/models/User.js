/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    username: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      unique: true,
      required: true,
    },
    password: {
      type: 'string',
      required: true
    },
    age: {
      type: 'number',
    },
    gender: {
      type: 'string',
      isIn: [
        'Hombre',
        'Mujer'
      ],
    },
    lookingForGender: {
      type: 'string',
      isIn: [
        'Hombre',
        'Mujer'
      ],
    },
    instagram: {
      type: 'string',
      required: true
    },
    major: {
      type: 'string',
      isIn: [
        'Ciencias de la Actividad Física y del Deporte',
        'Nutrición Humana y Dietética',
        'Ciencia y Tecnología de los Alimentos',
        'Ciencias Gastronómicas',
        'Psicología',
        'Ingeniería de las Industrias Alimentarias y Agrarias',
        'Ingeniería Informática',
        'Ingeniería de Organización Industrial',
        'Administración y Dirección de Empresas',
        'Lenguas Aplicadas',
        'Traducción e Interpretación',
        'Periodismo',
        'Publicidad y Relaciones Públicas',
        'Comunicación Audiovisual',
        'Educación Primaria (Bilingüe)',
        'Máster Universitario en Psicología General Sanitaria'
      ],
    },
    relationshipStatus: {
      type: 'string',
      isIn: [
        'En una relacion',
        'Soltero/a',
        'Es complicado'
      ]
    },
    profilePhoto: {
      type: 'string'
    }
  },
};