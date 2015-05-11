function Hatchet(req) {
  this.query = req.query;
}

Hatchet.prototype.BestMatch = function(term, fields) {
  var query = { 'dis_max': { 'queries': [] } };
  Object.keys(fields).forEach(function(field){
    var matchQuery = { 'match': {} };
    fields[field].query = term;
    matchQuery.match[field] = fields[field];
    query.dis_max.queries.push(matchQuery);
  });
  return query;
};

Hatchey.prototype._applyFilter = function(filterFlag) {
  return self.query.hasOwnProperty(filterFlag);
};

Hatchet.prototype.Filter = function(fields){
  var self = this;
  var filter = { 'bool': {} };
  Object.keys(fields).forEach(function(field){
    var filterFlag = fields[field].filterFlag;
    if(self._applyFilter) {
      if (self.query[filterFlag] instanceof Array){

      }
      var filterQuery = { 'fquery': {'query': {}} };
      var matchQuery = { 'match': {} };
      var type = fields[field].type;
      if (!filter.bool.hasOwnProperty(type) ) { filter.bool[type] = []; }

      matchQuery.match[field] = { 'query': self.query[fields[field].filterFlag] };
      filterQuery.fquery.query = matchQuery;
      filter.bool[type].push(filterQuery);
    }
  });
  return JSON.stringify(filter);
};

module.exports = Hatchet;

///////////////// TRAVERSIFY ^ ^^^^^^^^^^^^^^^^^^^^
var fields = {
  'offices.location':  { type: 'must', filterFlag: 'location' },
  'profile.hometown':  { type: 'should', filterFlag: 'hometown' },
  'profile.languages': { type: 'must', filterFlag: 'language' }
};

var fields = {
  'displayName.displayName_exact':             { boost:2, operator:'and' },
  'displayName.displayName_typeahead_synonym': { operator:'and', analyzer:'name_query' },
  'displayName.displayName_typeahead_exact':   { operator:'and', analyzer:'name_query' },
  'initials':                                  { boost:3, operator:'and' },
  'phones.ext':                                { analyzer:'name_query' }
};

var request = { query:{
  search: 'luke',
  hometown: 'Easton',
  language: ['Spanish','English']
}};

BestMatch('luke',fields);
