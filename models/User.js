const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username:
    {
      type: String,
      unique: true,
      required: true,
      trimmed: true,
    },

    email:
    {
      type: String,
      required: true,
      unique: true,
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]

    },

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'friend',
    }
    ]
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `fullName` that gets and sets the user's full name
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return `${this.friends.lenght}`;
  })
  // Setter to set the first and last name
 

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
