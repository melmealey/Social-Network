const { Schema, model } = require('mongoose');
// const formatDate = require('.utils/helpers');
const { Timestamp } = require('mongodb');


const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'Thought is Required',
    minlength: 1,
    maxlength: 280,
  },

  createdAt: {
  type: Date,
  default: Date.now,
  get: ( Timestamp ) => formatDate( Timestamp )
},

  username: {
  type: String,
  required: true
},
  // reactions: [reactionSchema],
},
{
toJSON: {
  virtuals: true,
    getters: true,
},
id: false,
}
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reaction.length;
});

const thought = model('thought', thoughtSchema)

module.exports = thought;