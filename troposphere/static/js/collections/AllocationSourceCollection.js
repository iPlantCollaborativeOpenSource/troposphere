import backbone from 'backbone';
import AllocationSource from 'models/AllocationSource';
import globals from 'globals';
import _ from 'underscore';

import allocationSources from 'mockdata/allocationSources.json';
import mockSync from 'utilities/mockSync';


export default backbone.Collection.extend({
    model: AllocationSource,

    url: globals.API_V2_ROOT + "/allocation_sources",

    parse: function (response) {
        console.warn("We are tampering with data until the api settles");

        // Ensure the api returns values for these fields
        let defaults = {
            compute_used: 100,
            compute_allowed: 1000,
            name: "dummy"
        };

        let results = response.results.map(source => {
            Object.keys(defaults).forEach(f => {
                if (!source[f]) {
                    source[f] = defaults[f];
                }
            });
            return source;
        });
        return results;
    },

    sync: globals.USE_MOCK_DATA 
          ? mockSync(allocationSources)
          : Backbone.sync
});