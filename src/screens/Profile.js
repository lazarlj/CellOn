/* eslint-disable react/no-string-refs */
import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import ImagePicker from "react-native-image-picker";

import CommonStyles from "../utils/CommonStyles";
import scale from "../utils/scale";
import { fonts, colors } from "../utils/Constants";
import LoginInputView from "../component/common/LoginInputView";
import { updateProfileRequest } from "../actions/auth";

const options = {
  title: "Select Avatar",
  customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
  storageOptions: {
    skipBackup: true,
    path: "images",
  },
};

class Profile extends Component {
  static navigationOptions = {
    drawerLabel: "Profile",
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require("./../assets/images/profile-2x.png")}
        style={[CommonStyles.icon, { tintColor }]}
      />
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      emailAddress: "",
      phoneNo: "",
      profilePhotoSource: null,
      focused: "",
    };
  }

  changeProfilePhoto() {
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          profilePhotoSource: response,
        });
      }
    });
  }

  updateProfile() {
    const { user, updateProfile } = this.props;
    const { firstName, lastName, emailAddress, phoneNo } = this.state;
    updateProfile({
      first_name: firstName,
      last_name: lastName,
      old_email: user.email,
      new_email: emailAddress,
      phone_number: phoneNo,
      image: "",
    });
  }

  renderFormView() {
    const {
      profilePhotoSource,
      firstName,
      lastName,
      emailAddress,
      phoneNo,
      focused,
    } = this.state;
    return (
      <View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.imageStyle}
            source={
              profilePhotoSource
                ? { uri: profilePhotoSource.uri }
                : require("./../assets/images/Oval-2x.png")
            }
          />
          <View style={styles.imageTextContainer}>
            <Image
              source={require("./../assets/images/camera.png")}
              style={styles.cameraImage}
            />
            <Text
              style={styles.changeProfileText}
              onPress={() => {
                this.changeProfilePhoto();
              }}
            >
              {"Change Profile Photo"}
            </Text>
          </View>
        </View>
        <View
          style={{
            height: scale(300),
            width: "100%",
            marginVertical: 0,
            justifyContent: "space-evenly",
            backgroundColor: "transparent",
          }}
        >
          <View>
            <LoginInputView
              ref="firstName"
              childRef="firstName"
              label="FIRST NAME"
              value={firstName}
              placeholderTextColor={
                focused === "firstName"
                  ? colors.primaryColor
                  : colors.lightGrayColor1
              }
              borderBottomColor={
                focused === "firstName"
                  ? colors.primaryLightBlackColor
                  : colors.blackOpacityColor4
              }
              activeLabelColor={colors.primaryLightBlackColor}
              onChangeText={firstName => {
                this.setState({ firstName });
              }}
              returnKeyType="next"
              onSubmitEditing={() => {
                this.refs.lastName.refs.lastName.focus();
              }}
              onFocus={() => this.setState({ focused: "firstName" })}
              onBlur={() => this.setState({ focused: "" })}
            />
          </View>
          <LoginInputView
            ref="lastName"
            childRef="lastName"
            label="LAST NAME"
            value={lastName}
            placeholderTextColor={
              focused === "lastName"
                ? colors.primaryColor
                : colors.lightGrayColor1
            }
            borderBottomColor={
              focused === "lastName"
                ? colors.primaryLightBlackColor
                : colors.blackOpacityColor4
            }
            activeLabelColor={colors.primaryLightBlackColor}
            onChangeText={lastName => this.setState({ lastName })}
            returnKeyType="next"
            onSubmitEditing={() => {
              this.refs.emailAddress.refs.emailAddress.focus();
            }}
            onFocus={() => this.setState({ focused: "lastName" })}
            onBlur={() => this.setState({ focused: "" })}
          />
          <View style={styles.inputContainer}>
            <LoginInputView
              ref="emailAddress"
              childRef="emailAddress"
              label="EMAIL ADDRESS"
              value={emailAddress}
              placeholderTextColor={
                focused === "emailAddress"
                  ? colors.primaryColor
                  : colors.lightGrayColor1
              }
              borderBottomColor={
                focused === "emailAddress"
                  ? colors.primaryLightBlackColor
                  : colors.blackOpacityColor4
              }
              activeLabelColor={colors.primaryLightBlackColor}
              onChangeText={emailAddress => this.setState({ emailAddress })}
              returnKeyType="next"
              onSubmitEditing={() => {
                this.refs.phoneNo.refs.phoneNo.focus();
              }}
              onFocus={() => this.setState({ focused: "emailAddress" })}
              onBlur={() => this.setState({ focused: "" })}
            />
          </View>
          <View style={styles.inputContainer}>
            <LoginInputView
              ref="phoneNo"
              childRef="phoneNo"
              label="PHONE NUMBER"
              value={phoneNo}
              placeholderTextColor={
                focused === "phoneNo"
                  ? colors.primaryColor
                  : colors.lightGrayColor1
              }
              borderBottomColor={
                focused === "phoneNo"
                  ? colors.primaryLightBlackColor
                  : colors.blackOpacityColor4
              }
              activeLabelColor={colors.primaryLightBlackColor}
              keyboardType="numeric"
              onChangeText={phoneNo => this.setState({ phoneNo })}
              returnKeyType="next"
              onSubmitEditing={() => {}}
              onFocus={() => this.setState({ focused: "phoneNo" })}
              onBlur={() => this.setState({ focused: "" })}
            />
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backIconContainer}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="ios-arrow-back"
              size={scale(30)}
              color={colors.whiteColor}
            />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Image
              source={require("./../assets/images/user.png")}
              style={styles.userImage}
            />
            <Text style={styles.titleText}>Profile</Text>
          </View>
        </View>
        <ScrollView>
          <View style={styles.profileContainer}>
            {this.renderFormView()}
            <View style={styles.bottomContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.updateProfile();
                }}
                style={styles.buttonStyle}
              >
                <Text style={styles.buttonTextStyle}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  ...auth,
});

export default connect(
  mapStateToProps,
  {
    updateProfile: updateProfileRequest,
  },
)(Profile);

Profile.defaultProps = {};

Profile.propTypes = {
  navigation: PropTypes.any,
  user: PropTypes.object,
  updateProfile: PropTypes.func,
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
  header: {
    height: scale(70),
    backgroundColor: colors.primaryColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backIconContainer: {
    flexDirection: "row",
    position: "absolute",
    left: scale(10),
    alignItems: "center",
  },
  backText: {
    fontFamily: fonts.sfproDisplayRegular,
    fontSize: scale(17),
    color: colors.whiteColor,
    marginLeft: scale(10),
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    height: scale(18),
    width: scale(16),
  },
  titleText: {
    fontFamily: fonts.sfproDisplayBold,
    fontSize: scale(18),
    color: colors.whiteColor,
    marginLeft: scale(10),
  },
  imageContainer: {
    height: scale(170),
    backgroundColor: colors.primaryColor,
    alignItems: "center",
  },
  imageStyle: {
    height: scale(110),
    width: scale(110),
    borderRadius: scale(55),
  },
  imageTextContainer: {
    flexDirection: "row",
    marginTop: scale(22),
    alignItems: "center",
  },
  cameraImage: {
    height: scale(12),
    width: scale(12),
  },
  changeProfileText: {
    fontFamily: fonts.sfproRegular,
    fontSize: scale(14),
    color: colors.whiteColor,
    marginLeft: scale(5),
  },
  profileContainer: {
    flex: 1,
  },
  inputContainer: {},
  bottomContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: scale(40),
  },
  buttonStyle: {
    backgroundColor: colors.primaryColor,
    alignSelf: "stretch",
    marginHorizontal: scale(25),
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: scale(14),
    borderRadius: scale(25),
  },
  buttonTextStyle: {
    fontFamily: fonts.sfproDisplayMedium,
    fontSize: scale(18),
    color: colors.whiteColor,
  },
});
