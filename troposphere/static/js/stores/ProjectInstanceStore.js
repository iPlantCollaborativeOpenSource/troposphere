define(function (require) {

  var _ = require('underscore'),
      Dispatcher = require('dispatchers/Dispatcher'),
      Store = require('stores/Store'),
      Collection = require('collections/ProjectInstanceCollection'),
      Constants = require('constants/ProjectInstanceConstants'),
      InstanceCollection = require('collections/InstanceCollection'),
      Instance = require('models/Instance');

  var _models = null;
  var _isFetching = false;

  var _modelsFor = {};
  var _isFetchingFor = {};

  //
  // CRUD Operations
  //

  var fetchModels = function () {
    if(!_models && !_isFetching) {
      _isFetching = true;
      var models = new Collection();
      models.fetch().done(function () {
        _isFetching = false;
        _models = models;
        ModelStore.emitChange();
      });
    }
  };

  var fetchModelsFor = function(projectId){
    if(!_modelsFor[projectId] && !_isFetchingFor[projectId]) {
      _isFetchingFor[projectId] = true;
      var models = new Collection();
      models.fetch({
        url: models.url + "?project__id=" + projectId
      }).done(function () {
        _isFetchingFor[projectId] = false;

        // convert ProjectInstance collection to an InstanceCollection
        var instances = models.map(function(pi){
          return new Instance(pi.get('instance'), {parse: true});
        });
        instances = new InstanceCollection(instances);

        _modelsFor[projectId] = instances;
        ModelStore.emitChange();
      });
    }
  };

  function add(model){
    _models.add(model);
  }

  function remove(model){
    _models.remove(model);
  }


  //
  // Model Store
  //

  var ModelStore = {

    get: function (projectInstanceId) {
      if(!_models) {
        fetchModels();
      } else {
        return _models.get(projectInstanceId);
      }
    },

    getAll: function () {
      if(!_models) {
        fetchModels()
      }
      return _models;
    },

    getInstancesFor: function(project){
      if(!_modelsFor[project.id]) {
        fetchModelsFor(project.id);
      } else {
        return _modelsFor[project.id];
      }
    }

  };

  Dispatcher.register(function (dispatch) {
    var actionType = dispatch.action.actionType;
    var payload = dispatch.action.payload;
    var options = dispatch.action.options || options;

    switch (actionType) {

      case Constants.ADD_PROJECT_INSTANCE:
        add(payload.projectInstance);
        break;

      case Constants.REMOVE_PROJECT_INSTANCE:
        remove(payload.projectInstance);
        break;

      case Constants.EMIT_CHANGE:
        break;

      default:
        return true;
    }

    if(!options.silent) {
      ModelStore.emitChange();
    }

    return true;
  });

  _.extend(ModelStore, Store);

  return ModelStore;
});
