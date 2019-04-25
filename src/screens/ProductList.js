import React, { Component } from "react";
import { View, FlatList, Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import ProductCard from "../component/catalog/ProductCard";
import CommonStyles from "../utils/CommonStyles";
import CustomHeader from "../component/common/CustomHeader";

export default class ProductList extends Component {
  static navigationOptions = {
    drawerLabel: "Home",
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require("./../assets/images/home-2x.png")}
        style={[CommonStyles.icon, { tintColor }]}
      />
    ),
  };

  renderItem = ({ item }) => {
    const { navigation } = this.props;
    return <ProductCard data={item} navigation={navigation} />;
  };

  render() {
    const { navigation } = this.props;
    const { data } = navigation.state.params;
    return (
      <View style={styles.container}>
        <CustomHeader navigation={navigation} title="Our Services" leftIcon />
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 20 }}
          data={data.product}
          // eslint-disable-next-line no-underscore-dangle
          keyExtractor={item => item._id}
          numColumns={2}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

ProductList.defaultProps = {};

ProductList.propTypes = {
  navigation: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
