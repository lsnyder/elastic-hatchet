// module.exports = {
//   boolFilter:   { 'bool': {} },
//   filterQuery:  { 'fquery': {'query': {}} },
//   matchQuery:   { 'match': {} },
//   disMaxQuery:  { 'dis_max': { 'queries': [] } }
// };

module.exports = {
  query: function() {
    return {'query':{}};
  },

  boolFilter: function() {
    return {'bool':{}};
  },

  queryFilter: function() {
    return { 'fquery': {'query': {}} };
  },

  matchQuery: function() {
    return { 'match': {} };
  },

  disMaxQuery: function() {
    return { 'dis_max': { 'queries': []} };
  }
};
