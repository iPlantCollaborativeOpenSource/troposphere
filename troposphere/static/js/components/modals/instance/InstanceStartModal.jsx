import React from "react";

import BootstrapModalMixin from "components/mixins/BootstrapModalMixin";
import Glyphicon from "components/common/Glyphicon";

import Instance from "models/Instance";


export default React.createClass({
    displayName: "InstanceStartModal",

    mixins: [BootstrapModalMixin],

    //
    // Internal Modal Callbacks
    // ------------------------
    //

    cancel: function() {
        this.hide();
    },

    confirm: function() {
        this.hide();
        this.props.onConfirm();
    },

    //
    // Render
    // ------
    //

    renderBody: function(multiple, instances) {
        let operativeNoun = multiple ? "these instances": "this instance",
            instanceList = (<div/>);

        if (instances) {
            instanceList = (
            <div>
                <ul>
                {instances.map((i) => {
                    return (
                    <li key={i.get("uuid")}>
                        <strong>
                            {`${i.get("name")}`}
                        </strong>
                        <ul>
                            <li style={{listStyleType: "square"}}>
                                {`started on: ${i.get("start_date")}`}
                            </li>
                        </ul>
                    </li>
                    );
                 })}
                </ul>
            </div>
            );
        }

        return (
        <div>
            <p className="alert alert-warning">
                <Glyphicon name="warning-sign" />
                {" "}
                <strong>WARNING</strong>
                {' In order to start a stopped instance, you must have sufficient quota and the cloud must have enough room to support your instance\'s size.'}
            </p>
            {instanceList}
            <p>
                {`Would you like to start ${operativeNoun}?`}
            </p>
        </div>
        );
    },

    render: function() {
        // AUTHOR'S NOTE - not sure if I should extract this filter predicate into
        // a utility function to be shared across the <Instance*Modal/>s ...
        let { resources } = this.props,
            instances = resources ? resources.filter((r) => r instanceof Instance) : null,
            multi = instances && instances.length > 1,
            titleNoun = multi ? "Instances" : "Instance",
            buttonText = multi ? "these instances" : "this instance";

        return (
        <div className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        {this.renderCloseButton()}
                        <h1 className="t-title">{`Start ${titleNoun}`}</h1>
                    </div>
                    <div className="modal-body">
                        {this.renderBody(multi, instances)}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" onClick={this.cancel}>
                            Cancel
                        </button>
                        <button type="button" className="btn btn-primary" onClick={this.confirm}>
                            {`Yes, start ${buttonText}`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        );
    }
});
