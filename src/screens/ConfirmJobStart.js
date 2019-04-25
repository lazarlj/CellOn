import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import PropTypes from "prop-types";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { FlatList } from "react-native-gesture-handler";
import scale from "../utils/scale";
import CommonStyles from "../utils/CommonStyles";
import CustomHeader from "../component/common/CustomHeader";
import {
  colors,
  fonts,
  WINDOWSIZE,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  GOOGLE_MAPS_APIKEY,
} from "../utils/Constants";
import dummyData from "../dummy";

const AnimatedViewHeight = WINDOWSIZE.height * 0.7;

const starImage = require("./../assets/images/star.png");
const profileImage = require("./../assets/images/profile-2x.png");
const avatarImage = require("../assets/images/Oval-2x.png");
const clockImage = require("./../assets/images/clock-circular-outline-2x.png");

class ConfirmJobStart extends Component {
  static navigationOptions = {
    drawerLabel: "ConfirmJobStart",
    drawerIcon: ({ tintColor }) => (
      <Image source={profileImage} style={[CommonStyles.icon, { tintColor }]} />
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      animatedCardValue: new Animated.Value(-1 * AnimatedViewHeight * 0.57),
      isCardUp: true,
      isSuccess: false,
      successId: 0,
    };
  }

  cardUp = () => {
    const { animatedCardValue } = this.state;
    Animated.timing(animatedCardValue, {
      toValue: -1 * AnimatedViewHeight * 0.57,
      duration: 500,
    }).start();
  };

  cardDown = () => {
    const { animatedCardValue } = this.state;
    Animated.timing(animatedCardValue, {
      toValue: 0,
      duration: 500,
    }).start();
  };

  handleAnimation = () => {
    const { isCardUp } = this.state;
    if (isCardUp) {
      this.cardDown();
    } else {
      this.cardUp();
    }
    this.setState({ isCardUp: !isCardUp });
  };

  checkSuccessStatus = () => {
    const { isSuccess, successId } = this.state;
    const { navigation } = this.props;
    if (global.isClient) {
      if (isSuccess) {
        navigation.navigate("PayAndFeedback");
      } else {
        this.setState({
          isSuccess: true,
        });
      }
    } else if (successId >= 2) {
      navigation.navigate("PayAndFeedback");
    } else {
      this.setState({
        successId: successId + 1,
      });
    }
  };

  renderItem = () => {
    const { navigation } = this.props;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Profile")}
        style={styles.itemContainer}
      >
        <Image source={require("./../assets/images/rectangle3.png")} />
      </TouchableOpacity>
    );
  };

  renderMessages = () => {
    const { isSuccess, successId } = this.state;
    if (
      (isSuccess && global.isClient) ||
      (successId === 2 && !global.isClient)
    ) {
      return (
        <View style={styles.messageContainer1}>
          <Text style={styles.textMessage}>Please confirm job success</Text>
        </View>
      );
    } else if (
      (!isSuccess && global.isClient) ||
      (successId === 0 && !global.isClient)
    ) {
      return (
        <View style={styles.messageContainer2}>
          <Text style={styles.textTitle}>
            Metal-Alloy Rectangular Eyeglasses
          </Text>
          <Text style={styles.textDescription}>
            For many women, visiting the skin care aisle at the drugstore can be
            as intimidating as ordering from all the complicated hot beverages
          </Text>
          <Text style={styles.textMessage}>
            Please confirm the start of work
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.messageContainer2}>
        <Text style={styles.textTitle}>Metal-Alloy Rectangular Eyeglasses</Text>
        <Text style={styles.textDescription}>
          For many women, visiting the skin care aisle at the drugstore can be
          as intimidating as ordering from all the complicated hot beverages
        </Text>
        <Text style={styles.textMessage}>Please confirm the order</Text>
      </View>
    );
  };

  render() {
    const { navigation } = this.props;
    const { animatedCardValue, successId } = this.state;
    return (
      <View style={styles.container}>
        <CustomHeader navigation={navigation} title="Our Services" leftIcon />
        <View style={styles.mainContainer}>
          <MapView
            style={StyleSheet.absoluteFillObject}
            initialRegion={{
              latitude: dummyData.locations.myLocation.latitude,
              longitude: dummyData.locations.myLocation.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
          >
            <Marker coordinate={dummyData.locations.directions[0]} />
            <Marker coordinate={dummyData.locations.directions[1]} />
            <MapViewDirections
              origin={dummyData.locations.directions[0]}
              destination={dummyData.locations.directions[1]}
              strokeWidth={3}
              strokeColor="hotpink"
              apikey={GOOGLE_MAPS_APIKEY}
            />
          </MapView>
          <Animated.View
            style={[styles.slideBoxContainer, { bottom: animatedCardValue }]}
          >
            <TouchableOpacity
              activeOpacity={1}
              style={styles.topContainer}
              onPress={() => this.handleAnimation()}
            >
              <View style={styles.ratingContainer}>
                <Text>4.5</Text>
                <Image style={styles.imageStar} source={starImage} />
              </View>
              <Image style={styles.imageAvatar} source={avatarImage} />
              <View style={styles.userInfoContainer}>
                <Text style={styles.textName}>Nelle Phillips</Text>
                <View style={styles.rowContainer}>
                  <Text style={styles.textPrice}>R 340</Text>
                  <Text style={styles.textTime}>5 m</Text>
                  <Image style={styles.imageClock} source={clockImage} />
                </View>
              </View>
            </TouchableOpacity>
            <View>
              <Text style={styles.previousWorkTextStyle}>Previous Work</Text>
              <FlatList
                style={styles.flatListContainer}
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => this.renderItem(item)}
              />
            </View>
            <View style={{ height: AnimatedViewHeight * 0.83 }}>
              {this.renderMessages()}
              <View>
                <TouchableOpacity
                  style={styles.confirmButtonContainer}
                  onPress={() => this.checkSuccessStatus()}
                >
                  <Text style={styles.textConfrim}>Confirm</Text>
                </TouchableOpacity>
                {successId !== 1 ? (
                  <TouchableOpacity
                    style={styles.cancelButtonContainer}
                    onPress={() => navigation.goBack()}
                  >
                    <Text style={styles.textCancel}>
                      {global.isClient ? "Deny" : "Cancel"}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.cancelButtonPadding} />
                )}
              </View>
            </View>
          </Animated.View>
        </View>
      </View>
    );
  }
}

export default ConfirmJobStart;

ConfirmJobStart.defaultProps = {};

ConfirmJobStart.propTypes = {
  navigation: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.pinkColor,
    alignItems: "center",
  },
  slideBoxContainer: {
    height: AnimatedViewHeight,
    width: "90%",
    backgroundColor: colors.whiteColor,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    position: "absolute",
  },
  ratingContainer: {
    position: "absolute",
    top: 15,
    right: 10,
    flexDirection: "row",
  },
  imageStar: {
    width: 11,
    height: 11,
    marginLeft: 1,
    alignSelf: "center",
  },
  imageAvatar: {
    height: 50,
    width: 50,
    alignSelf: "center",
  },
  userInfoContainer: {
    marginLeft: 10,
    justifyContent: "space-around",
    fontFamily: fonts.sfproMedium,
  },
  textName: {
    fontFamily: fonts.sfproMedium,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textPrice: {
    fontFamily: fonts.sfproBold,
    fontSize: 14,
    color: colors.primaryColor,
  },
  textTime: {
    fontFamily: fonts.sfproBold,
    fontSize: 14,
    color: colors.primaryLightBlackColor,
    marginLeft: scale(5),
  },
  imageClock: {
    width: 10,
    height: 10,
    marginLeft: 4,
    marginTop: 2,
  },
  topContainer: {
    flexDirection: "row",
    height: AnimatedViewHeight * 0.17,
    borderBottomWidth: 1,
    borderBottomColor: colors.blackOpacityColor2,
    alignItems: "center",
    paddingHorizontal: 10,
    width: "100%",
  },
  flatListContainer: {
    marginHorizontal: scale(15),
  },
  previousWorkTextStyle: {
    fontFamily: fonts.sfproMedium,
    fontSize: scale(16),
    margin: scale(15),
  },
  itemContainer: {
    marginRight: scale(8),
  },
  messageContainer1: {
    padding: scale(10),
    justifyContent: "center",
  },
  messageContainer2: {
    paddingHorizontal: scale(10),
  },
  textTitle: {
    fontSize: scale(16),
    fontFamily: fonts.sfproMedium,
    alignContent: "center",
    marginTop: scale(10),
  },
  textDescription: {
    fontSize: scale(14),
    fontFamily: fonts.sfproRegular,
    alignContent: "center",
    marginVertical: scale(15),
  },
  textMessage: {
    fontSize: scale(16),
    fontFamily: fonts.sfproMedium,
    alignContent: "center",
    alignSelf: "center",
  },
  confirmButtonContainer: {
    width: "90%",
    alignItems: "center",
    alignSelf: "center",
    marginTop: scale(20),
    backgroundColor: colors.primaryColor,
    paddingVertical: scale(15),
    borderRadius: scale(30),
  },
  textConfrim: {
    fontFamily: fonts.sfproMedium,
    fontSize: scale(18),
    color: colors.whiteColor,
  },
  cancelButtonContainer: {
    width: "90%",
    alignItems: "center",
    alignSelf: "center",
    marginTop: scale(10),
    marginBottom: scale(20),
    backgroundColor: colors.whiteColor,
    paddingVertical: scale(15),
    borderRadius: scale(30),
    borderColor: colors.blackOpacityColor2,
    borderWidth: scale(1),
  },
  textCancel: {
    fontFamily: fonts.sfproMedium,
    fontSize: scale(18),
    color: colors.grayColor,
  },
  cancelButtonPadding: {
    width: "100%",
    height: 20,
  },
});
