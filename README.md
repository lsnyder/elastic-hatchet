# elastic-hatchet
Conventional elasticsearch query library.


{
  "query": {
    "filtered": {
      "query": {
        "dis_max": {
          "queries": [
            {
              "match": {
                "displayName.displayName_exact": {
                  "query": "snyder",
                  "operator": "and",
                  "boost": 2
                }
              }
            },
            {
              "match": {
                "initials": {
                  "query": "snyder",
                  "operator": "and",
                  "boost": 3
                }
              }
            },
            {
              "match": {
                "displayName.displayName_typeahead_synonym": {
                  "query": "snyder",
                  "operator": "and",
                  "analyzer": "name_query"
                }
              }
            },
            {
              "match": {
                "displayName.displayName_typeahead_exact": {
                  "query": "snyder",
                  "operator": "and",
                  "analyzer": "name_query"
                }
              }
            },
            {
              "match": {
                "phones.ext": {
                  "query": "snyder",
                  "analyzer": "name_query"
                }
              }
            }
          ]
        }
      },
      "filter": {
        "bool": {
          "must": [
            {
              "fquery": {
                "query": {
                  "match": {
                    "profile.hometown": {
                      "query": "Easton"
                    }
                  }
                }
              }
            },
            {
              "fquery": {
                "query": {
                  "match": {
                    "offices.location": {
                      "query": "Los Angeles"
                    }
                  }
                }
              }
            }
          ]
        }
      }
    }
  }
}




//
// var fields = {
//   'displayName.displayName_exact':             { boost:2, operator:'and' },
//   'displayName.displayName_typeahead_synonym': { operator:'and', analyzer:'name_query' },
//   'displayName.displayName_typeahead_exact':   { operator:'and', analyzer:'name_query' },
//   'initials':                                  { boost:3, operator:'and' },
//   'phones.ext':                                { analyzer:'name_query' }
// };
//
// var request = { query:{
//   search: 'luke',
//   hometown: 'Easton',
//   language: ['Spanish','English']
// }};
//
// BestMatch('luke',fields);






var found = false
agentId = '789'
var x = [{'id':'123'},{'id':'456'},{'id':'789'}]

x.every(function (manager) {

  if ( manager.id === agentId ) {
    found = true
    return false
  }
  return true
})
