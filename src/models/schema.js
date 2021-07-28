export const schema = {
  models: {
    Project: {
      name: 'Project',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: []
        },
        title: {
          name: 'title',
          isArray: false,
          type: 'String',
          isRequired: true,
          attributes: []
        },
        description: {
          name: 'description',
          isArray: false,
          type: 'String',
          isRequired: true,
          attributes: []
        },
        image: {
          name: 'image',
          isArray: false,
          type: 'AWSURL',
          isRequired: true,
          attributes: []
        },
        location: {
          name: 'location',
          isArray: false,
          type: 'AWSJSON',
          isRequired: false,
          attributes: []
        },
        createdAt: {
          name: 'createdAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true
        },
        updatedAt: {
          name: 'updatedAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true
        }
      },
      syncable: true,
      pluralName: 'Projects',
      attributes: [
        {
          type: 'model',
          properties: {}
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                allow: 'public',
                operations: ['create', 'update', 'delete', 'read']
              }
            ]
          }
        }
      ]
    }
  },
  enums: {},
  nonModels: {},
  version: '3439432cea3346c5b2eeb09049663461'
}
