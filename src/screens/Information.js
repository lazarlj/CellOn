import React, { Component } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import CommonStyles from "../utils/CommonStyles";
import CustomHeader from "../component/common/CustomHeader";
import { fonts } from "../utils/Constants";
import scale from "../utils/scale";
import dummyData from "../dummy";

const infoIcon = require("../assets/images/info.png");

export default class Information extends Component {
  static navigationOptions = {
    drawerLabel: "Information",
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require("./../assets/images/info-2x.png")}
        style={[CommonStyles.icon, { tintColor }]}
      />
    ),
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <CustomHeader
          navigation={navigation}
          titleImage={infoIcon}
          title="Information"
          leftIcon
          noright
        />
        <View style={styles.sectionContainer}>
          <Text style={styles.heading}>{dummyData.information.title}</Text>
          <Text style={styles.contentStyle}>
            {dummyData.information.description}
          </Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.heading}>{dummyData.information.title}</Text>
          <Text style={styles.contentStyle}>
            {dummyData.information.description}
          </Text>
        </View>
      </View>
    );
  }
}

Information.defaultProps = {};

Information.propTypes = {
  navigation: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: scale(13.5),
    fontFamily: fonts.sfproMedium,
  },
  sectionContainer: {
    marginTop: scale(40),
    marginHorizontal: scale(20),
  },
  contentStyle: {
    fontSize: scale(14),
    fontFamily: fonts.sfproRegular,
    marginTop: scale(20),
  },
});
