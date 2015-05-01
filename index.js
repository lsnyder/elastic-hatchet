BestMatch = function(term, fields) {
  var query = { 'dis_max': { 'queries': [] } };
  Object.keys(fields).forEach(function(field){
    var matchQuery = { 'match': {} };
    fields[field].query = term;
    matchQuery.match[field] = fields[field];
    query.dis_max.queries.push(matchQuery);
  });
  return query;
};

Filter = function(reqQuery, fields){
  var filter = { 'bool': {} };
  Object.keys(fields).forEach(function(field){
    if( reqQuery.hasOwnProperty(fields[field].filterFlag) ) {
      var filterQuery = { 'fquery': {'query': {}} };
      var matchQuery = { 'match': {} };
      var type = fields[field].type;

      if (!filter.bool.hasOwnProperty(type) ) { filter.bool[type] = []; }

      matchQuery.match[field] = { 'query': reqQuery[fields[field].filterFlag] };
      filterQuery.fquery.query = matchQuery;
      filter.bool[type].push(filterQuery);
    }
  });
  return JSON.stringify(filter);
};

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

BestMatch('luke',fields);
