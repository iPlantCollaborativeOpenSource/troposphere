import React from "react";
import Backbone from "backbone";
import context from "context";
import Button from "./Button";
import RefreshButton from "./RefreshButton";
import RequestResourcesButton from "./RequestResourcesButton";
import ResourceActionButtons from "./ResourceActionButtons";

export default React.createClass({
    displayName: "ButtonBar",

    propTypes: {
        isVisible: React.PropTypes.bool.isRequired,
        multipleSelected: React.PropTypes.bool.isRequired,
        onMoveSelectedResources: React.PropTypes.func.isRequired,
        onDeleteSelectedResources: React.PropTypes.func.isRequired,
        onReportSelectedResources: React.PropTypes.func.isRequired,
        onRemoveSelectedResources: React.PropTypes.func.isRequired,
        onUnselect: React.PropTypes.func.isRequired,
        onUnselectAll: React.PropTypes.func,
        previewedResource: React.PropTypes.instanceOf(Backbone.Model),
        selectedResources: React.PropTypes.instanceOf(Backbone.Collection),
        project: React.PropTypes.instanceOf(Backbone.Model).isRequired
    },

    render: function() {

        // todo: put these back when we can support them properly
        // right now instances can't be deleted with volumes attached,
        // and volumes can't be deleted while attached to an instance
        // handling this in the UI state machine is just to complicated
        // at the moment. It's much easier to control if the user has to
        // delete things individually.
        //
        // <Button
        //   icon="trash"
        //   tooltip="Delete selected resources"
        //   onClick={this.props.onDeleteSelectedResources}
        //   isVisible={this.props.isVisible}
        // />
        //
        // <Button
        //   icon="list-alt"
        //   tooltip="Report issue with project or selected resources"
        //   onClick={this.props.onReportSelectedResources}
        //   isVisible={true}
        // />

        let {
            isVisible,
            onMoveSelectedResources,
            onRemoveSelectedResources,
            onUnselect,
            onUnselectAll,
            previewedResource,
            selectedResources,
            multipleSelected,
            project
        } = this.props;

        return (
        <div className="clearfix">
            <div className="button-bar col-md-4">
                <RefreshButton/>
                <RequestResourcesButton />
                <Button icon="folder-open"
                    tooltip="Move selected resources"
                    onClick={onMoveSelectedResources}
                    isVisible={isVisible} />
                <Button icon="export"
                    tooltip="Remove selected resources (admin only)"
                    onClick={onRemoveSelectedResources}
                    style={{ "backgroundColor": "bisque" }}
                    isVisible={context.profile.get("is_superuser") && isVisible} />
            </div>
            <div style={{ padding: "10px 0" }} className="col-md-3 u-md-pull-right">
                <ResourceActionButtons onUnselect={onUnselect}
                                       onUnselectAll={onUnselectAll}
                                       selectedResources={selectedResources}
                                       previewedResource={previewedResource}
                                       multipleSelected={multipleSelected}
                                       project={project} />
            </div>
        </div>
        );
    }
});
