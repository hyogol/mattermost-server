// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import type {Dispatch} from 'redux';

import {clearErrors, logError} from 'mattermost-redux/actions/errors';
import {
    updateMe,
    sendVerificationEmail,
    setDefaultProfileImage,
    uploadProfileImage,
    saveCustomProfileAttribute,
    getCustomProfileAttributeValues,
} from 'mattermost-redux/actions/users';
import {getConfig, getCustomProfileAttributes, getFeatureFlagValue, getLicense} from 'mattermost-redux/selectors/entities/general';

import {getIsMobileView} from 'selectors/views/browser';

import {isEnterpriseLicense} from 'utils/license_utils';

import type {GlobalState} from 'types/store';

import UserSettingsGeneralTab from './user_settings_general';

function mapStateToProps(state: GlobalState) {
    const config = getConfig(state);
    const customProfileAttributeFields = getCustomProfileAttributes(state);

    const requireEmailVerification = config.RequireEmailVerification === 'true';
    const maxFileSize = parseInt(config.MaxFileSize!, 10);
    const ldapFirstNameAttributeSet = config.LdapFirstNameAttributeSet === 'true';
    const ldapLastNameAttributeSet = config.LdapLastNameAttributeSet === 'true';
    const samlFirstNameAttributeSet = config.SamlFirstNameAttributeSet === 'true';
    const samlLastNameAttributeSet = config.SamlLastNameAttributeSet === 'true';
    const ldapNicknameAttributeSet = config.LdapNicknameAttributeSet === 'true';
    const samlNicknameAttributeSet = config.SamlNicknameAttributeSet === 'true';
    const samlPositionAttributeSet = config.SamlPositionAttributeSet === 'true';
    const ldapPositionAttributeSet = config.LdapPositionAttributeSet === 'true';
    const ldapPictureAttributeSet = config.LdapPictureAttributeSet === 'true';

    const license = getLicense(state);
    const isEnterprise = isEnterpriseLicense(license);
    const enableCustomProfileAttributes = isEnterprise && getFeatureFlagValue(state, 'CustomProfileAttributes') === 'true';

    return {
        isMobileView: getIsMobileView(state),
        requireEmailVerification,
        maxFileSize,
        customProfileAttributeFields,
        ldapFirstNameAttributeSet,
        ldapLastNameAttributeSet,
        samlFirstNameAttributeSet,
        samlLastNameAttributeSet,
        ldapNicknameAttributeSet,
        samlNicknameAttributeSet,
        samlPositionAttributeSet,
        ldapPositionAttributeSet,
        ldapPictureAttributeSet,
        enableCustomProfileAttributes,
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators({
            logError,
            clearErrors,
            updateMe,
            sendVerificationEmail,
            setDefaultProfileImage,
            uploadProfileImage,
            saveCustomProfileAttribute,
            getCustomProfileAttributeValues,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsGeneralTab);
