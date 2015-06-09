var snippets  = require('./syntax-snippets');
var lodash = require('lodash');
var ejs = require('elastic.js');

function Hatchet(req) {
  this.query = req.query;
}

Hatchet.prototype.Filter = function(fields){
  var self = this;
  var filter = ejs.BoolFilter();

  Object.keys(fields).forEach(function(field){
    var filterFlag  =  fields[field].filterFlag;
    var condition   =  fields[field].condition;

    if (self.query.hasOwnProperty(filterFlag)) {
      filter[condition](ejs.QueryFilter(ejs.MatchQuery(field,self.query[filterFlag],filterFlag)))
    }
  });
  return filter;
};

Hatchet.prototype._processQueryOptions = function (query, options){
  var processedQuery
  Object.keys(options).forEach(function(optionName){
    processedQuery = query[optionName](options[optionName])
  })
  return processedQuery
}

Hatchet.prototype.BestMatch = function(fields, filters) {
  var self = this
  var processedFilters
  var MatchQuery
  var DisMaxQuery = ejs.DisMaxQuery()

  // Object.keys(fields).forEach(function(fieldName){
  //   var MatchQuery = ejs.MatchQuery(fieldName, self.query.search)
  //   var fieldOptions = fields[fieldName] 
  //   DisMaxQuery.queries(self._processQueryOptions(MatchQuery, fieldOptions))
  // });
  fields.forEach(function(field){
    Object.keys(field).forEach(function(attribute){
      if (attribute === 'field') {
        MatchQuery = ejs.MatchQuery(field[attribute], self.query.search)
      } else {
        MatchQuery[attribute](field[attribute])
      }
    })
    DisMaxQuery.queries(MatchQuery)
  });

  if (filters) { 
    processedFilters = self.Filter(filters)
    return JSON.stringify(ejs.FilteredQuery(DisMaxQuery, processedFilters))
  }
  return JSON.stringify(DisMaxQuery);
};

module.exports = Hatchet;

var searchFields = {
  'displayName.displayName_exact':             { operator: 'and', boost: 2 },
  'initials':                                  { operator: 'and', boost: 3 },
  'displayName.displayName_typeahead_synonym': { operator: 'and', analyzer: 'name_query'},
  'displayName.displayName_typeahead_exact':   { operator: 'and', analyzer: 'name_query'},
  'phones.ext':                                { analyzer: 'name_query' }
}

var searchFields2 = [
  { field: 'displayName.displayName_exact', boost: 2, analyzer: false},
  { field: 'initials', boost: 3, analyzer: false },
  { field: 'displayName.displayName_typeahead_synonym' },
  { field: 'displayName.displayName_typeahead_exact' },
  { field: 'phones.ext', operator: false}
]

var defaults = {
  operator: 'and',
  analyzer: 'name_query'
}

var fields = {
  'offices.location':  { condition: 'must', filterFlag: 'location' },
  'profile.hometown':  { condition: 'should', filterFlag: 'hometown' },
  'profile.languages': { condition: 'must', filterFlag: 'language' }
};

var request = { query:{
  search: 'luke',
  hometown: 'Easton',
  language: ['Spanish','English']
}};

x = new Hatchet(request);
x.BestMatch(searchFields2, fields);
