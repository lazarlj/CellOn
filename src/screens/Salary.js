import React, { Component } from "react";
import { Text, View, FlatList, Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import CustomHeader from "../component/common/CustomHeader";
import { colors, fonts } from "../utils/Constants";
import BigButton from "../component/common/BigButton";

import dummyData from "../dummy";

export default class Salary extends Component {
  static navigationOptions = {
    drawerLabel: "Salary",
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require("./../assets/images/salary_2x.png")}
        style={{
          width: 14,
          height: 20,
          tintColor,
        }}
      />
    ),
  };

  renderItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 30,
          paddingTop: 20,
          paddingBottom: 20,
          borderBottomColor: colors.lightGrayColor3,
          borderBottomWidth: 1,
        }}
      >
        <Image
          source={require("./../assets/images/Oval-2x.png")}
          style={{ height: 36, width: 36, marginRight: 15 }}
        />
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: fonts.sfproMedium,
              color: colors.primaryLightBlackColor,
              fontSize: 14,
            }}
          >
            {item.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: fonts.sfproMedium,
                color: colors.primaryLightBlackColor,
                fontSize: 12,
              }}
            >
              4.8
            </Text>
            <Image
              style={{
                width: 14,
                height: 14,
                marginLeft: 3,
              }}
              source={require("./../assets/images/star.png")}
            />
          </View>
        </View>
        <Text
          style={{
            fontFamily: fonts.sfproDisplayBold,
            color: colors.primaryColor,
            fontSize: 24,
          }}
        >
          {`R ${item.price}`}
        </Text>
      </View>
    );
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <CustomHeader title="Salary" navigation={navigation} noright />
        <View elevation={3} style={{ flex: 1 }}>
          <FlatList
            style={{ color: "transparent" }}
            data={dummyData.salary}
            renderItem={this.renderItem}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 30,
            backgroundColor: colors.lightGrayColor5,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              marginBottom: 15,
              fontFamily: fonts.sfproDisplayBold,
              color: colors.primaryLightBlackColor,
              fontSize: 24,
            }}
          >
            Total: <Text style={{ color: colors.primaryColor }}>R 980</Text>
          </Text>
          <BigButton
            title="Receive money via PayFast"
            onPress={() => navigation.navigate("PayAndFeedback")}
          />
        </View>
      </View>
    );
  }
}

Salary.defaultProps = {};

Salary.propTypes = {
  navigation: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.whiteColor,
  },
});
