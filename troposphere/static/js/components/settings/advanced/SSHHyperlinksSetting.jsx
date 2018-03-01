import React from "react";

import subscribe from "utilities/subscribe";

import actions from "actions";


import { trackAction } from "utilities/userActivity";


const SSHHyperlinksSetting = React.createClass({

    getInitialState() {
        let {UserPreferenceStore} = this.props.subscriptions;
        let userPreference = UserPreferenceStore.get();

        return {
            userPreference,
        };
    },

    updateState() {
        this.setState(this.getInitialState());
    },

    handleChange(event) {
        let { checked: allowSshHyperlink } = event.target;

        actions.UserPreferenceActions.updateUserPreferenceAttributes(this.state.userPreference, {
            allow_ssh_hyperlinks: allowSshHyperlink
        });
    },

    render() {
        let { userPreference } = this.state,
            allowSshHyperlink = userPreference && userPreference.getAllowSshHyperlink();

        if (!userPreference) {
            return (
                <span>Loading...</span>
            );
        }

        return (
            <div>
                <h3>SSH Hyperlinks</h3>
                <div style={{marginBottom: "20px"}}>
                    <input type="checkbox"
                           checked={allowSshHyperlink}
                           onChange={this.handleChange} /> Allow SSH protocol links for Instances.
                </div>
            </div>
        );
    }
});

export default subscribe(SSHHyperlinksSetting, ["UserPreferenceStore"]);
