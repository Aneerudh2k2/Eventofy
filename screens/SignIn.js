import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  Animated,
  Keyboard,
  Image,
} from "react-native";
import LottieView from "lottie-react-native";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { SimpleLineIcons } from "@expo/vector-icons";
import { get_access_token, save_access_token } from "../utils/securestore";

export default function SignIn({ navigation }) {
  const [user, setUser] = useState(null);
  let animation = React.createRef();
  const lottieheight = useRef(new Animated.Value(285)).current;
  const [minimizeLottie, setMinimizeLottie] = useState(false);

  useEffect(() => {
    animation.current.play();
  }, []);

  useEffect(() => {
    // initAsync();
  }, []);

  const handleOAuthLogin = async () => {
    let redirectUrl = await Linking.makeUrl("/");
    console.log(redirectUrl);
    let authUrl = `http://b5bc-2401-4900-483f-883b-c9ec-5205-d52b-34d2.ngrok.io/login?redirectUri=${redirectUrl}`;
    try {
      let authresult = await WebBrowser.openAuthSessionAsync(
        authUrl,
        redirectUrl
      );
      let temp;
      console.log("auth result: ", authresult, "\n");
      if (authresult.type === "success") {
        temp = await Linking.parse(authresult.url);
        save_access_token(temp.queryParams.token);
        navigation.navigate("Pivot");
      }
    } catch (e) {
      console.log("handleOAuthlogin error: ", e);
    }
  };

  const sendNotification = async () => {
    let response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Encoding": "gzip, deflate",
      },
      body: JSON.stringify({
        to: "ExponentPushToken[ty5UqBNa_oUQWRpwGUVB1T]",
        title: "Original Title",
        body: "And here is the body!",
        data: { someData: "goes here" },
      }),
    });

    console.log(await response.json());
  };
  // useEffect(() => {
  //   keyboardWillShowSub.remove();
  //   keyboardWillHideSub.remove();
  // }, []);

  // useEffect(() => {
  //   keyboardWillShowSub = Keyboard.addListener(
  //     "keyboardWillShow",
  //     keyboardWillShow
  //   );
  //   keyboardWillHideSub = Keyboard.addListener(
  //     "keyboardWillHide",
  //     keyboardWillHide
  //   );
  // }, []);

  // const keyboardWillShow = (event) => {
  //   Animated.timing(this.imageHeight, {
  //     duration: event.duration,
  //     toValue: 150,
  //   }).start();
  // };

  // const keyboardWillHide = (event) => {
  //   Animated.timing(this.imageHeight, {
  //     duration: event.duration,
  //     toValue: 285,
  //   }).start();
  // };

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      // Keyboard.removeAllListeners("keyboardDidShow");
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = (event) => {
    Animated.timing(lottieheight, {
      duration: event.duration,
      toValue: 150,
      useNativeDriver: false,
    }).start();
    setMinimizeLottie(true);
    console.log("Keyboard shown");
  };

  const _keyboardDidHide = (event) => {
    Animated.timing(lottieheight, {
      duration: event.duration,
      toValue: 285,
      useNativeDriver: false,
    }).start();
    setMinimizeLottie(false);
    console.log("Keyboard hidden");
  };

  const resetAnimation = () => {
    animation.current.reset();
    animation.current.play();
  };

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="#3490dc"
        barStyle="light-content"
        showHideTransition="fade"
        hidden={false}
      />
      <View style={styles.container}>
        <View
          style={{
            flex: 0.5,
            alignItems: "center",
            backgroundColor: "#3490dc",
            paddingTop: 48,
            // borderWidth: 1,
            // height: "100%",
            // width: "100%",
          }}
        >
          <Animated.View style={{ height: lottieheight, alignItems: "center" }}>
            <LottieView
              ref={animation}
              style={{
                height: minimizeLottie ? 150 : 285,
                width: minimizeLottie ? 150 : 285,
              }}
              source={require("../assets/lottie_json/68030-user-profile.json")}

              // OR find more Lottie files @ https://lottiefiles.com/featured
              // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
            />

            <View
              style={{
                alignItems: "center",
                margin: 5,
                padding: 5,
              }}
            >
              <Text style={{ fontSize: 30, color: "#fff", fontWeight: "bold" }}>
                Eventofy
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  color: "#fff",
                  marginTop: 8,
                }}
              >
                Apply and get notified of your desired events Anytime!!
                Anywhere!!
              </Text>
            </View>
          </Animated.View>
        </View>

        <View
          style={{
            flex: 0.5,
            flexDirection: "column",
            alignItems: "center",
            // justifyContent: "center",
            // borderWidth: 1,
            marginTop: 25,
            width: "90%",
            height: "90%",
          }}
        >
          <View
            style={{
              flex: 0.85,
              width: "90%",
              height: "90%",
              marginTop: 25,
              // borderWidth: 1,
              // justifyContent: "space-around",
              alignItems: "center",
              elevation: 10,
              backfaceVisibility: "visible",
              shadowRadius: 30,
              // backgroundColor: "#afd2e9",
              backgroundColor: "#a9cef4",
              shadowColor: "skyblue",
              borderRadius: 30,
            }}
          >
            <View style={{ margin: 8, flex: 0.15 }}>
              <Text
                style={{ fontSize: 26, color: "#e0fbfc", fontWeight: "bold" }}
              >
                Sign In
              </Text>
            </View>

            <View
              style={{
                // borderWidth: 1,
                flex: 0.7,
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  margin: 5,
                  flexDirection: "row",
                  backgroundColor: "#fff",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  borderRadius: 50,
                }}
              >
                <View style={{ padding: 10 }}>
                  <SimpleLineIcons name="user" size={30} color="#6d7275" />
                </View>
                <View style={{ paddingHorizontal: 5 }}>
                  <TextInput
                    securedTextEntry={true}
                    placeholder="Type college mail id..."
                    style={{ width: 250, height: 45 }}
                  />
                </View>
              </View>

              <View
                style={{
                  margin: 5,
                  flexDirection: "row",
                  backgroundColor: "#fff",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  borderRadius: 50,
                }}
              >
                <View style={{ padding: 10 }}>
                  <SimpleLineIcons name="lock" size={30} color="#6d7275" />
                </View>
                <View style={{ paddingHorizontal: 5 }}>
                  <TextInput
                    placeholder="Type password..."
                    style={{ width: 250, height: 45 }}
                  />
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#3490dc",
                  borderRadius: 12,
                  padding: 8,
                }}
              >
                {/* <Image
                  source={require("../assets/google.png")}
                  style={{ width: 35, height: 35, padding: 5 }}
                /> */}
                <TouchableOpacity
                  style={{
                    borderRadius: 12,
                    padding: 6,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    // resetAnimation();
                    navigation.navigate("Pivot");
                    // handleOAuthLogin();
                    // sendNotification();
                    // signInAsync();
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Roboto",
                      fontSize: 16,
                      color: "#fff",
                    }}
                  >
                    {/* Sign in with google */}
                    Sign in
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "#6d7275" }}>
                  Don't have an account?{" "}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                  <Text style={{ fontWeight: "bold", color: "#001f54" }}>
                    Create one
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3490dc",
    // borderWidth: 1,
    alignItems: "center",
  },
});
