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

{
  "bool": {
    "should": [
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
      }
    ],
    "must": [
      {
        "fquery": {
          "query": {
            "match": {
              "profile.languages": {
                "query": "english"
              }
            }
          }
        }
      }
    ]
  }
}
