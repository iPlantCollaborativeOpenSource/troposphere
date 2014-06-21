/** @jsx React.DOM */

define(
  [
    'react',
    './header/HeaderView.react',
    './tags/TagsView.react',
    '../common/ApplicationCard.react',
    './description/DescriptionView.react',
    './versions/VersionsView.react'
  ],
  function (React, HeaderView, TagsView, ApplicationCard, DescriptionView, VersionsView) {

    return React.createClass({

      propTypes: {
        application: React.PropTypes.instanceOf(Backbone.Model).isRequired
      },

      showModal: function (e) {
        InstanceActions.launch(this.state.application);
      },

      render: function () {
        return (
          <div id='app-detail'>
            <HeaderView application={this.props.application}/>
            <TagsView application={this.props.application}/>
            <hr/>
            <ApplicationCard application={this.props.application} onLaunch={this.showModal}/>
            <DescriptionView application={this.props.application}/>
            <hr/>
            <VersionsView application={this.props.application}/>
          </div>
        );
      }

    });

  });
