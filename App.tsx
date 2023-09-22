import { StatusBar } from "expo-status-bar";
import { useRef } from "react";
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getFeatureViewAnimation } from "./utils/animation";

const UPPER_HEADER_HEIGHT = 40;
const UPPER_HEADER_PADDING_TOP = 8;
const LOWER_HEADER_HEIGHT = 96;

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function App() {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const lastOffsetY = useRef(0);
  const scrollDirection = useRef("");

  const depositViewAnimation = getFeatureViewAnimation(animatedValue, 36);
  const withdrawViewAnimation = getFeatureViewAnimation(animatedValue, -16);
  const qrViewAnimation = getFeatureViewAnimation(animatedValue, -56);
  const scanViewAnimation = getFeatureViewAnimation(animatedValue, -92);

  const searchInputAnimation = {
    transform: [
      {
        scaleX: animatedValue.interpolate({
          inputRange: [1, 50],
          outputRange: [1, 0],
          extrapolate: "clamp",
        }),
      },
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 25],
          outputRange: [0, -100],
          extrapolate: "clamp",
        }),
      },
    ],
    opacity: animatedValue.interpolate({
      inputRange: [0, 25],
      outputRange: [1, 0],
      extrapolate: "clamp",
    }),
  };

  const featureNameAnimation = {
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 30],
          outputRange: [1, 0],
          extrapolate: "clamp",
        }),
      },
    ],
    opacity: animatedValue.interpolate({
      inputRange: [0, 30],
      outputRange: [1, 0],
      extrapolate: "clamp",
    }),
  };

  const featureIconAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 50],
      outputRange: [0, 1],
      extrapolate: "clamp",
    }),
  };

  const featureIconCircleAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 25],
      outputRange: [1, 0],
      extrapolate: "clamp",
    }),
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <SafeAreaView>
        <View style={styles.upperHeaderPlaceholder} />
      </SafeAreaView>

      <SafeAreaView style={styles.header}>
        <View style={styles.upperHeader}>
          <View style={styles.searchContainer}>
            <Image
              source={require("./assets/search.png")}
              style={[styles.icon16, { left: 8 }]}
            />
            <AnimatedTextInput
              placeholder="Search"
              placeholderTextColor="#fff"
              style={[styles.searchInput, searchInputAnimation]}
            />
          </View>
          <Image
            source={require("./assets/bell.png")}
            style={styles.bellIcon}
          />
          <Image
            source={require("./assets/avatar.png")}
            style={styles.avatarIcon}
          />
        </View>

        <View style={styles.lowerHeader}>
          <Animated.View style={[styles.feature, depositViewAnimation]}>
            <Animated.Image
              source={require("./assets/deposit.png")}
              style={[styles.featureIcon, featureIconAnimation]}
            />
            <Animated.Image
              source={require("./assets/deposit-circle.png")}
              style={[styles.icon32, featureIconCircleAnimation]}
            />
            <Animated.Text style={[styles.featureName, featureNameAnimation]}>
              NẠP TIỀN
            </Animated.Text>
          </Animated.View>

          <Animated.View style={[styles.feature, withdrawViewAnimation]}>
            <Animated.Image
              source={require("./assets/withdraw.png")}
              style={[styles.featureIcon, featureIconAnimation]}
            />
            <Animated.Image
              source={require("./assets/withdraw-circle.png")}
              style={[styles.icon32, featureIconCircleAnimation]}
            />
            <Animated.Text style={[styles.featureName, featureNameAnimation]}>
              RÚT TIỀN
            </Animated.Text>
          </Animated.View>

          <Animated.View style={[styles.feature, qrViewAnimation]}>
            <Animated.Image
              source={require("./assets/qr.png")}
              style={[styles.featureIcon, featureIconAnimation]}
            />
            <Animated.Image
              source={require("./assets/qr-circle.png")}
              style={[styles.icon32, featureIconCircleAnimation]}
            />
            <Animated.Text style={[styles.featureName, featureNameAnimation]}>
              MÃ QR
            </Animated.Text>
          </Animated.View>

          <Animated.View style={[styles.feature, scanViewAnimation]}>
            <Animated.Image
              source={require("./assets/scan.png")}
              style={[styles.featureIcon, featureIconAnimation]}
            />
            <Animated.Image
              source={require("./assets/scan-circle.png")}
              style={[styles.icon32, featureIconCircleAnimation]}
            />
            <Animated.Text style={[styles.featureName, featureNameAnimation]}>
              QUÉT MÃ
            </Animated.Text>
          </Animated.View>
        </View>
      </SafeAreaView>

      <ScrollView
        ref={scrollViewRef}
        onScroll={(e) => {
          const scrollY = e.nativeEvent.contentOffset.y;
          scrollDirection.current =
            scrollY > lastOffsetY.current ? "down" : "up";
          lastOffsetY.current = scrollY;
          animatedValue.setValue(scrollY);
        }}
        onScrollEndDrag={() => {
          scrollViewRef.current?.scrollTo({
            y: scrollDirection.current === "down" ? 100 : 0,
            animated: true,
          });
        }}
        scrollEventThrottle={16}
      >
        <View style={styles.paddingForHeader} />
        <View style={styles.scrollViewContent} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon16: {
    width: 16,
    height: 16,
  },
  icon32: {
    width: 32,
    height: 32,
  },
  upperHeaderPlaceholder: {
    height: UPPER_HEADER_HEIGHT + UPPER_HEADER_PADDING_TOP,
    paddingTop: UPPER_HEADER_PADDING_TOP,
  },
  header: {
    position: "absolute",
    width: "100%",
    backgroundColor: "#2A00A2",
  },
  upperHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: UPPER_HEADER_HEIGHT + UPPER_HEADER_PADDING_TOP,
    paddingTop: UPPER_HEADER_PADDING_TOP,
  },
  searchContainer: {
    flex: 1,
    justifyContent: "center",
  },
  featureIcon: {
    width: 16,
    height: 16,
    position: "absolute",
    top: 8,
  },
  bellIcon: {
    width: 16,
    height: 16,
    marginHorizontal: 32,
  },
  avatarIcon: {
    width: 28,
    height: 28,
  },
  lowerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: LOWER_HEADER_HEIGHT,
    paddingHorizontal: 16,
  },
  searchInput: {
    position: "absolute",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    color: "white",
    borderRadius: 4,
    paddingVertical: 4,
    paddingLeft: 32,
  },
  feature: {
    alignItems: "center",
  },
  featureName: {
    fontWeight: "bold",
    fontSize: 12,
    lineHeight: 14,
    color: "#FFFFFF",
    marginTop: 12,
  },
  paddingForHeader: {
    height: LOWER_HEADER_HEIGHT,
  },
  scrollViewContent: {
    height: 1000,
    backgroundColor: "white",
  },
});
