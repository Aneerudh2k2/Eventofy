import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import LottieView from "lottie-react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useFocusEffect } from "@react-navigation/native";

const EventDetails = ({ navigation, route }) => {
  let animation = React.useRef();
  let eventData = {
    eventid: route.params.eventid,
    name: "Gate (General Aptitude test in Engineering)",
    description: `💥Hloo friends!!! Here comes the great opportunity from TCE sports committee. TCE Men's and Women's hockey teams 🏑 are placing a warm welcome to those who are interested in building their talents in sports and be a part of the great hockey family🎉🎊.
    ‼️ All are requested to fill the Google forms without fail. ‼️
    Opportunities are like sunrises. If you wait too long, you miss them.
    And if feel that you are new to the game, you are most welcome! We are here to train you up to a professional player🤩🤩`,
    eventdate: new Date(),
    link: `https://docs.google.com/forms/d/e/1FAIpQLSfPEC75nrzOuYWvfQd0k80PHHR7NTqEkv0EGX_CNbgHjcAbwA/viewform?usp=sf_link`,
    eligible: "Only 3rd year and final year",
  };
  const [eventDetails, setEventDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const handleEventDetailsApi = async () => {
    setLoading(true);
    try {
      let result = await fetch(
        `http://6d51-106-211-233-32.in.ngrok.io/events/eventid/${route.params.eventid}`
      );
      result = await result.json();
      console.log(result);
      setEventDetails(result);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // componentDidMount() and componentWillUnmount()
  // useEffect(() => {
  // componentDidMount() part goes here
  // used for clean up process
  //   return () => {
  // componentWillUnmount() part goes here
  //   };
  // }, []);

  useEffect(() => {
    handleEventDetailsApi();
  }, []);

  const resetAnimation = () => {
    animation.current.reset();
    animation.current.play();
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
        color="#3490dc"
        // animating={loading}
      />
    );
  }

  const datealter = (date) => {
    const tdate = new Date(date);
    return tdate.toLocaleDateString();
  };

  const datetimealter = (date) => {
    const tdate = new Date(date);
    return tdate.toLocaleTimeString();
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      {/* <Text>Hello event {route.params.eventid}</Text>
      <Text>{eventData.name}</Text>
      <Text>{eventData.description}</Text>
      <Text>{eventData.eventDateTime.toLocaleDateString()}</Text>
      <Text>{eventData.eventDateTime.toLocaleTimeString()}</Text>
      <Text>{eventData.link}</Text>
      <Text>{eventData.eligible}</Text> */}

      <View
        style={{
          flex: 0.1,
          flexDirection: "row",
          // justifyContent: "center",
          // margin: 5,
          alignItems: "center",
          // borderWidth: 1,
        }}
      >
        <View
          style={{
            marginLeft: 25,
            marginTop: 35,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={30} color="black" />
          </TouchableOpacity>
          <Text style={{ fontSize: 22, marginLeft: 10 }}>Event details</Text>
        </View>
      </View>

      <View
        style={{
          flex: 0.3,
          justifyContent: "space-around",
          alignItems: "center",
          // borderWidth: 1,
        }}
      >
        {/* <ImageBackground
          source={{
            uri: `https://payu.in/blog/wp-content/uploads/2018/03/artificial-intelligence-in-business-1.png`,
          }}
          style={{
            height: "100%",
            justifyContent: "center",
          }}
        ></ImageBackground> */}

        <View style={{}}>
          <LottieView
            ref={(a) => (animation.current = a)}
            style={{
              height: 200,
              width: 200,
            }}
            autoPlay
            loop
            // source={require("../assets/lottie_json/37428-walking-robot.json")} for AI
            source={require("../assets/lottie_json/30304-back-to-school.json")} // for higher education
            // source={require("../assets/lottie_json/64110-web-development.json")} // for web dev
            // source={require("../assets/lottie_json/65394-blockchain-animation.json")} // for blockchain
            // source={require("../assets/lottie_json/36345-maintenance-cyber-security.json")} // for cyber security
            // source={require("../assets/lottie_json/34375-mobile-application.json")}
            // source={require("../assets/lottie_json/41389-interview-get-ready-to-work-job-recruitment-isometric-hiring-process.json")}
            // OR find more Lottie files @ https://lottiefiles.com/featured
            // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
          />
        </View>

        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 25 }}>Hello Guys 🙂 </Text>
        </View>
      </View>

      <View
        style={{
          flex: 0.6,
          // borderWidth: 1,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          padding: 20,
          // backgroundColor: "#3490dc",
          elevation: 2,
          alignItems: "center",
        }}
      >
        <View style={{ margin: 5, padding: 5 }}>
          <Text style={{ fontSize: 20 }}>{eventDetails.name}</Text>
        </View>

        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 30,
            padding: 5,
            alignItems: "center",
            justifyContent: "center",
            width: "70%",
            elevation: 2,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                margin: 3,
                padding: 7,
                // borderWidth: 1,
                alignItems: "center",
              }}
            >
              <Text>Date</Text>
              <Text>{datealter(eventDetails.eventdate)}</Text>
            </View>

            <View
              style={{
                margin: 3,
                padding: 7,
                // borderWidth: 1,
                alignItems: "center",
              }}
            >
              <Text>Time</Text>
              <Text> {datetimealter(eventDetails.eventdate)}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                margin: 3,
                padding: 7,
                // borderWidth: 1,
                alignItems: "center",
              }}
            >
              <Text>Eligible</Text>
              <Text>{eventDetails.eligible}</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            margin: 5,
            padding: 5,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "900" }}>Description</Text>
        </View>
        <ScrollView contentContainerStyle={{}}>
          <Text>{eventData.description}</Text>
        </ScrollView>

        <View
          style={{
            marginTop: 8,
            margin: 6,
            padding: 3,
            width: "100%",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#3490dc",
              alignItems: "center",
              padding: 10,
              borderRadius: 12,
            }}
            onPress={async () => {
              // const result = await Linking.openURL(eventDetails.link);
              const result = await Linking.openURL(
                `https://docs.google.com/forms/d/e/1FAIpQLSfPEC75nrzOuYWvfQd0k80PHHR7NTqEkv0EGX_CNbgHjcAbwA/viewform?usp=sf_link`
              );
              console.log(result);
            }}
          >
            {/* <Text>{eventDetails.link}</Text> */}
            <Text style={{ color: "#fff" }}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EventDetails;
