import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  ImageBackground,
  LogBox,
  useWindowDimensions,
  ActivityIndicator,
  Animated,
} from "react-native";
import {
  SimpleLineIcons,
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Chip } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { ExpandingDot } from "react-native-animated-pagination-dots";
import { get_access_token, save_access_token } from "../utils/securestore";

const Event = ({ navigation }) => {
  LogBox.ignoreLogs(["Can't perform a React state update on an"]);
  const [ai, setAi] = useState(false);
  const [WebDev, setWebDev] = useState(false);
  const [Blockchain, setBlockchain] = useState(false);
  const [cyberSecurity, setCyberSecurity] = useState(false);
  const [appDev, setappDev] = useState(false);
  const [placements, setPlacements] = useState(false);
  const [highEduc, setHighEduc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  let animation = React.createRef();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  let noNetwork = false;

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      let isMounted = true;

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        isMounted = false;
      };
    }, [])
  );

  const handleEventsApi = async () => {
    setLoading(true);
    let token = await get_access_token();
    try {
      let result = await fetch(
        "http://6d51-106-211-233-32.in.ngrok.io/events"
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );
      result = await result.json();
      console.log(result);
      setEvents(result);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleEventsApi();
  }, []);

  const resetAnimation = () => {
    animation.current.reset();
    animation.current.play();
  };

  const window = useWindowDimensions();

  const greetings = () => {
    let today = new Date().getHours();
    if (today >= 5 && today < 12) return "Morning  🌤️";
    else if (today >= 12 && today < 17) return "Afternoon  ☀️";
    else if (today >= 15 && today < 21) return "Evening  🌥️";
    else return "Night  💤";
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

  const carouselData = [
    {
      id: 1,
      text: "bdubajiaobuvbundsbvcnjh cuifcs",
      link: "https://www.google.com",
      img: "https://img.freepik.com/free-vector/abstract-banner-background-with-red-shapes_1361-3348.jpg?size=338&ext=jpg",
    },
    {
      id: 2,
      text: "bdubajiaobuvbundsbvcnjh cuifcs",
      link: "https://www.google.com",
      img: "https://image.freepik.com/free-vector/abstract-design-background-with-blue-purple-gradient_1048-13167.jpg",
    },

    {
      id: 3,
      text: "bdubajiaobuvbundsbvcnjh cuifcs",
      link: "https://www.google.com",
      img: "https://image.freepik.com/free-vector/abstract-orange-background-with-lines-halftone-effect_1017-32107.jpg",
    },
  ];

  const RenderGreetingsBar = () => {
    const carouselItem = ({ item }) => {
      return (
        <View
          style={{
            flex: 1,
            margin: 5,

            justifyContent: "center",
            alignItems: "center",
            height: "90%",
            width: window.width - 40,
            elevation: 5,
          }}
        >
          <ImageBackground
            source={{
              uri: item.img,
            }}
            style={{
              height: "100%",
              width: "100%",
              alignItems: "center",
            }}
            imageStyle={{ borderRadius: 10, padding: 5 }}
          >
            <View style={{ margin: 5 }}>
              {/* Logo and college name */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={{
                    uri: "https://img.collegedekhocdn.com/media/img/institute/logo/tce_logo.png",
                  }}
                  style={{ height: 35, width: 35 }}
                />
                <Text style={{ color: "#fff", marginLeft: 10 }}>
                  Thiagarajar College of Engineering
                </Text>
              </View>

              {/* Short details */}
              <View
                style={{
                  margin: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={{ color: "#fff", fontSize: 10 }}>
                    IE (Student chapter) presents
                  </Text>
                  <Text style={{ color: "#fff", fontSize: 10 }}>
                    App development contest
                  </Text>
                </View>

                <View>
                  <Text style={{ color: "#fff", fontSize: 10 }}>
                    Last date: 25/10/2021
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={{
                  backgroundColor: "#48beff",
                  padding: 5,
                  margin: 5,
                  marginBottom: 20,
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#fff" }}>Register now</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      );
    };
    return (
      <View
        style={{
          flex: 0.3,
          padding: 5,
          // borderWidth: 1,
          marginVertical: 8,
          borderRadius: 5,
        }}
      >
        <View
          style={{
            flex: 0.35,
            flexDirection: "row",
            padding: 2,
            alignItems: "center",
          }}
        >
          <View style={{ flex: 0.15 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Image
                source={require("../assets/SAVE_20210903_215316.jpg")}
                style={{ height: 55, width: 56, borderRadius: 50 }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 0.85,
              flexDirection: "row",
              // borderWidth: 1,
              marginHorizontal: 5,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ marginLeft: 8 }}>
              <Text style={{ fontSize: 20 }}>Good {greetings()}</Text>
              <Text style={{}}>Username</Text>
            </View>
            <TouchableOpacity
              style={{}}
              onPress={() => navigation.navigate("SignIn")}
            >
              <SimpleLineIcons name="logout" size={27} color="red" />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            marginTop: 5,
            flex: 0.65,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <Text style={{ fontSize: 28, fontWeight: "900", color: "#003459" }}>
            Find
          </Text>
          <Text style={{ fontSize: 35, fontWeight: "bold", color: "#003459" }}>
            Events to apply
          </Text> */}
          {noNetwork ? (
            <LottieView
              ref={animation}
              style={{
                height: 350,
                width: 350,
              }}
              autoPlay
              loop
              // source={require("../assets/lottie_json/37428-walking-robot.json")} for AI
              source={require("../assets/lottie_json/12701-no-internet-connection(white).json")} // for higher education
              // source={require("../assets/lottie_json/64110-web-development.json")} // for web dev
              // source={require("../assets/lottie_json/65394-blockchain-animation.json")} // for blockchain
              // source={require("../assets/lottie_json/36345-maintenance-cyber-security.json")} // for cyber security
              // source={require("../assets/lottie_json/34375-mobile-application.json")}
              // source={require("../assets/lottie_json/41389-interview-get-ready-to-work-job-recruitment-isometric-hiring-process.json")}
              // OR find more Lottie files @ https://lottiefiles.com/featured
              // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
            />
          ) : (
            <View style={{ flex: 1 }}>
              <View style={{ flex: 0.95 }}>
                <FlatList
                  data={carouselData}
                  renderItem={carouselItem}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    {
                      useNativeDriver: false,
                    }
                  )}
                  decelerationRate={"normal"}
                  scrollEventThrottle={16}
                  keyExtractor={(item) => item.id.toString()}
                />
              </View>

              <View style={{ flex: 0.05 }}>
                <ExpandingDot
                  data={carouselData}
                  expandingDotWidth={20}
                  scrollX={scrollX}
                  inActiveDotOpacity={0.3}
                  activeDotColor={"#3490dc"}
                  dotStyle={{
                    width: 10,
                    height: 10,
                    backgroundColor: "#3490dc",
                    borderRadius: 5,
                    marginHorizontal: 3,
                  }}
                  containerStyle={{
                    top: 5,
                  }}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    );
  };

  const RenderSearchEvents = () => {
    return (
      <View
        style={{
          flex: 0.26,
          justifyContent: "space-evenly",
          // alignItems: "center",
          margin: 10,
          // borderWidth: 1,
          padding: 5,
        }}
      >
        <View
          style={{
            flex: 0.5,
            // borderWidth: 1,
            // padding: 10,
            margin: 3,
            // alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              // margin: 6,
              width: "100%",
              padding: 7,
              // height: 45,
              // borderWidth: 0.5,
              borderColor: "gray",
              borderRadius: 20,
              backgroundColor: "#fff",
              justifyContent: "space-between",
              elevation: 1,
            }}
          >
            <AntDesign name="search1" size={23} color="#3490dc" />
            <TextInput
              // Keyboard closes when single char is typed because FlatList's props ListHeaderComponent
              style={{
                width: 250,
                // marginLeft: 10,
                // borderWidth: 0.2,
              }}
              placeholder="Search Events...."
              // value={search}
              // onChangeText={(val) => {
              //   handleSearch(val);
              //   setSearch(val);
              // }}
            />
            <TouchableOpacity
              onPress={() => {
                // setSearch("")
              }}
            >
              <Ionicons name="ios-close-circle" size={26} color="#3490dc" />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flex: 0.5,
            margin: 3,
            // borderWidth: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ScrollView
            horizontal={true}
            alwaysBounceHorizontal={true}
            bounces={true}
            contentContainerStyle={{
              // flex: 1
              alignItems: "center",
            }}
          >
            <View style={{ margin: 3 }}>
              <Chip
                icon="robot"
                mode="outlined"
                selected={ai}
                selectedColor={ai ? "#fff" : "green"}
                style={{
                  elevation: 5,
                  width: "100%",
                  backgroundColor: ai ? "green" : "#fff",
                }}
                onPress={() => setAi(!ai)}
              >
                AI/ML
              </Chip>
            </View>
            <View style={{ margin: 3 }}>
              <Chip
                icon="web"
                mode="outlined"
                style={{
                  elevation: 5,
                  width: "100%",
                  backgroundColor: WebDev ? "red" : "#fff",
                }}
                selected={WebDev}
                selectedColor={WebDev ? "#fff" : "red"}
                onPress={() => setWebDev(!WebDev)}
              >
                Web development
              </Chip>
            </View>
            <View style={{ margin: 3 }}>
              <Chip
                icon="vector-link"
                mode="outlined"
                selected={Blockchain}
                selectedColor={Blockchain ? "#fff" : "#13262f"}
                style={{
                  elevation: 5,
                  width: "100%",
                  backgroundColor: Blockchain ? "#13262f" : "#fff",
                }}
                onPress={() => setBlockchain(!Blockchain)}
              >
                Blockchain
              </Chip>
            </View>
            <View style={{ margin: 3 }}>
              <Chip
                icon="security"
                mode="outlined"
                selected={cyberSecurity}
                selectedColor={cyberSecurity ? "#fff" : "#42113c"}
                style={{
                  elevation: 5,
                  width: "100%",
                  backgroundColor: cyberSecurity ? "#42113c" : "#fff",
                }}
                onPress={() => setCyberSecurity(!cyberSecurity)}
              >
                Cyber Security
              </Chip>
            </View>
            <View style={{ margin: 3 }}>
              <Chip
                icon="cellphone-iphone"
                mode="outlined"
                selected={appDev}
                selectedColor={appDev ? "#fff" : "#3490dc"}
                style={{
                  elevation: 5,
                  width: "100%",
                  backgroundColor: appDev ? "#3490dc" : "#fff",
                }}
                onPress={() => setappDev(!appDev)}
              >
                Mobile App development
              </Chip>
            </View>
            <View style={{ margin: 3 }}>
              <Chip
                icon="amazon"
                mode="outlined"
                selected={placements}
                selectedColor={placements ? "#fff" : "#eac435"}
                style={{
                  elevation: 5,
                  width: "100%",
                  backgroundColor: placements ? "#eac435" : "#fff",
                }}
                onPress={() => setPlacements(!placements)}
              >
                Placements
              </Chip>
            </View>
            <View style={{ margin: 3 }}>
              <Chip
                icon="school"
                mode="outlined"
                selected={highEduc}
                selectedColor={highEduc ? "#fff" : "#049a8f"}
                style={{
                  elevation: 5,
                  width: "100%",
                  backgroundColor: highEduc ? "#049a8f" : "#fff",
                }}
                onPress={() => setHighEduc(!highEduc)}
              >
                Higher Education
              </Chip>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  };

  let eventData = [
    {
      eventid: 1,
      name: "Gate (General Aptitude test in Engineering)",
      description: `💥Hloo friends!!! Here comes the great opportunity from TCE sports committee. TCE Men's and Women's hockey teams 🏑 are placing a warm welcome to those who are interested in building their talents in sports and be a part of the great hockey family🎉🎊. 
      ‼️ All are requested to fill the Google forms without fail. ‼️
      Opportunities are like sunrises. If you wait too long, you miss them. 
      And if feel that you are new to the game, you are most welcome! We are here to train you up to a professional player🤩🤩`,
      eventdate: new Date(),
      link: `https://docs.google.com/forms/d/e/1FAIpQLSfPEC75nrzOuYWvfQd0k80PHHR7NTqEkv0EGX_CNbgHjcAbwA/viewform?usp=sf_link`,
    },
    {
      eventid: 2,
      name: "Gate (General Aptitude test in Engineering)",
      description: `💥Hloo friends!!! Here comes the great opportunity from TCE sports committee. TCE Men's and Women's hockey teams 🏑 are placing a warm welcome to those who are interested in building their talents in sports and be a part of the great hockey family🎉🎊. 
      ‼️ All are requested to fill the Google forms without fail. ‼️
      Opportunities are like sunrises. If you wait too long, you miss them. 
      And if feel that you are new to the game, you are most welcome! We are here to train you up to a professional player🤩🤩`,
      eventdate: new Date(),
      link: `https://docs.google.com/forms/d/e/1FAIpQLSfPEC75nrzOuYWvfQd0k80PHHR7NTqEkv0EGX_CNbgHjcAbwA/viewform?usp=sf_link`,
    },
    {
      eventid: 3,
      name: "Gate (General Aptitude test in Engineering)",
      description: `💥Hloo friends!!! Here comes the great opportunity from TCE sports committee. TCE Men's and Women's hockey teams 🏑 are placing a warm welcome to those who are interested in building their talents in sports and be a part of the great hockey family🎉🎊. 
      ‼️ All are requested to fill the Google forms without fail. ‼️
      Opportunities are like sunrises. If you wait too long, you miss them. 
      And if feel that you are new to the game, you are most welcome! We are here to train you up to a professional player🤩🤩`,
      eventdate: new Date(),
      link: `https://docs.google.com/forms/d/e/1FAIpQLSfPEC75nrzOuYWvfQd0k80PHHR7NTqEkv0EGX_CNbgHjcAbwA/viewform?usp=sf_link`,
    },
    {
      eventid: 4,
      name: "Gate (General Aptitude test in Engineering)",
      description: `💥Hloo friends!!! Here comes the great opportunity from TCE sports committee. TCE Men's and Women's hockey teams 🏑 are placing a warm welcome to those who are interested in building their talents in sports and be a part of the great hockey family🎉🎊. 
      ‼️ All are requested to fill the Google forms without fail. ‼️
      Opportunities are like sunrises. If you wait too long, you miss them. 
      And if feel that you are new to the game, you are most welcome! We are here to train you up to a professional player🤩🤩`,
      eventdate: new Date(),
      link: `https://docs.google.com/forms/d/e/1FAIpQLSfPEC75nrzOuYWvfQd0k80PHHR7NTqEkv0EGX_CNbgHjcAbwA/viewform?usp=sf_link`,
    },
  ];

  const renderEventItem = ({ item }) => {
    const datealter = (date) => {
      const tdate = new Date(date);
      return tdate.toLocaleDateString();
    };
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: "#fff",
          margin: 5,
          // borderWidth: 1,
          // height: "100%",
          borderRadius: 15,
          elevation: 5,
        }}
        onPress={() =>
          navigation.navigate("Event_details", {
            eventid: item.eventid,
          })
        }
      >
        <View style={{ flex: 0.6, borderRadius: 15 }}>
          <Image
            source={{
              uri: `https://i.ytimg.com/vi/5AwdkGKmZ0I/maxresdefault.jpg`,
            }}
            style={{ width: "100%", height: "100%", borderRadius: 15 }}
          />
        </View>

        <View
          style={{
            flex: 0.4,
            margin: 10,
            marginBottom: 15,
            padding: 5,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 11.5, fontWeight: "bold" }}>
              {item.name}
            </Text>
            <View
              style={{
                backgroundColor: "#049a8f",
                borderRadius: 20,
                padding: 3,
                marginLeft: 10,
              }}
            >
              <Text style={{ fontSize: 11.5, color: "#fff" }}>
                {datealter(item.eventdate)}
              </Text>
            </View>
          </View>

          <View>
            <Text>
              {item.description.substring(0, 39)}
              {item.description.length > 40
                ? "\n" + item.description.substring(39, 60) + "....."
                : "...."}
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            {item.link.substring(0, 4) === "http" ? (
              <MaterialIcons name="insert-link" size={24} color="black" />
            ) : (
              <MaterialIcons name="location-on" size={24} color="black" />
            )}
            <Text> {item.link.substring(0, 29)}......</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const RenderEventList = () => {
    return (
      <View
        style={{
          flex: 0.8,
          // marginTop: 5,
          marginHorizontal: 5,
          // borderWidth: 1,
          padding: 5,
        }}
      >
        <View style={{ flex: 0.15 }}>
          <Text style={{ fontSize: 25, fontWeight: "900", color: "#fff" }}>
            Events
          </Text>
        </View>

        {noNetwork ? (
          <LottieView
            ref={animation}
            style={{
              height: 350,
              width: 350,
            }}
            autoPlay
            loop
            // source={require("../assets/lottie_json/37428-walking-robot.json")} for AI
            source={require("../assets/lottie_json/12701-no-internet-connection(blue).json")} // for higher education
            // source={require("../assets/lottie_json/64110-web-development.json")} // for web dev
            // source={require("../assets/lottie_json/65394-blockchain-animation.json")} // for blockchain
            // source={require("../assets/lottie_json/36345-maintenance-cyber-security.json")} // for cyber security
            // source={require("../assets/lottie_json/34375-mobile-application.json")}
            // source={require("../assets/lottie_json/41389-interview-get-ready-to-work-job-recruitment-isometric-hiring-process.json")}
            // OR find more Lottie files @ https://lottiefiles.com/featured
            // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
          />
        ) : (
          <FlatList
            data={eventData}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={renderEventItem}
            keyExtractor={(item) => item.eventid.toString()}
            style={{ flex: 0.9 }}
          />
        )}
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: "#3490dc",
        // borderWidth: 1,
        // justifyContent: "flex-start",
        // alignItems: "center",
        marginTop: 63,
        paddingTop: 10,
        marginTop: 6,
        // margin: 10,
      }}
    >
      {/** flex: 0.2 */}
      <RenderGreetingsBar />
      {/** flex:  0.82*/}
      <View
        style={{
          flex: 0.7,
          marginTop: 6,
          backgroundColor: "#3490dc",
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          elevation: 5,
          justifyContent: "space-around",
        }}
      >
        <RenderSearchEvents />
        <RenderEventList />
      </View>
    </View>
  );
};

export default Event;
