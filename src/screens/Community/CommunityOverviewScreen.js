import React from "react";
import {
  Image,
  TouchableOpacity,
  SafeAreaView,
  Text,
  View,
  ScrollView,
} from "react-native";
import Colors from "../../styles/colors";
import Icon from "react-native-vector-icons/Ionicons";

const CommunityOverviewScreen = ({ navigation }) => {
  return (
    <View
      style={{ flex: 1, backgroundColor: "#f0f0f0", flexDirection: "column" }}
    >
      <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1, margin: 10 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back-outline" size={25} color="black"></Icon>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, margin: 10 }}>
            <Text
              style={{ fontWeight: "bold", fontSize: 16, alignSelf: "center" }}
            >
              Community
            </Text>
          </View>
          <View style={{ flex: 1, margin: 10 }}></View>
        </View>
        <View style={{ flex: 1 }} />
        <View style={{ flex: 1 }}></View>
        <View
          style={{
            flex: 4,
            backgroundColor: "white",
            marginHorizontal: "10%",
            borderRadius: 30,
          }}
        >
          <View style={{ flex: 1 }}>
            <View
              style={{
                height: "200%",
                aspectRatio: 1,
                marginTop: "-18%",
                borderRadius: 20,
                backgroundColor: "white",
                alignSelf: "center",
              }}
            >
              <Image
                source={require("../../assets/images/SnowyMountain.png")}
                style={{
                  height: "90%",
                  width: "90%",
                  marginTop: "5%",
                  borderRadius: 15,
                  alignSelf: "center",
                }}
              />
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: "column" }}>
            <View style={{ flex: 3, justifyContent: "center" }}>
              <Text
                style={{
                  fontSize: 20,
                  color: "black",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Basketball Club
              </Text>
            </View>
            <View style={{ flex: 2, justifyContent: "center" }}>
              <Text style={{ textAlign: "center", color: "gray" }}>
                @basketball
              </Text>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 1, flexDirection: "column" }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    size: 16,
                    color: "black",
                    alignText: "center",
                  }}
                >
                  2,564
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              >
                <Text style={{ color: "gray", alignText: "center" }}>
                  Members
                </Text>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: "column" }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    size: 16,
                    color: "black",
                    alignText: "center",
                  }}
                >
                  21
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              >
                <Text style={{ color: "gray", alignText: "center" }}>
                  Recent Events
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <JoinMessageButtons></JoinMessageButtons>
          </View>
        </View>
        <View style={{ flex: 5, margin: 20 }}>
          <ScrollView>
            <Text>
              This is a community! ...
              wfuehifhwifuehfiwehfiewfhweiufhewifehwfiweuhfewiufhweifuhewfiuwehfiewufhewiu
              ueifhwieufhewifuewhfiewfhweifuhweifuwehfiwuhweifuh iweuhf iwufh
              wiufh wifuh efiuew hfwieufhewifhewifhewfiuwefheifuehf iweufhwe
              ifuewhf iwefuh wifh wifhe fiweufhe wifuhefi hwefiu fh w
              ueiuhiurhgiruherigu hreih uerigh eirguh eriguh egiu hergi ehg
              iuegh ieurgh eriu hriugh iurgh eiurh eirugh erighre ugeh iugh
              ierghreiguh rigu hegierhg ierug herig herig uerhg ierugh erigu
              hgei uhg irugehg iuegrh ierugh eriug heriug herigu herig ughe
              iuerh iuerh iergherghirg hg iugh igh uigh rieg heriu gheru eri
              geru heriuhieufhiw hewiuhweiu ewfiu hfiu wehfiewufh ewiufh ifuh
              eiwfhwieufhwiufh iweuhf wieufh weifuh weifu hefih ewi hewiuf hife
              hewiuheifhweiufhreiughirue gierugh igh giur hgiureg hreigu
              hrgiheguhgir egehug eurhgirueh iregh reiugh eriguh eriguh eriguh
              eiguh riuh ieruhg eirgh eigu hreiguh iguheiguh rig hreg reuhg
              eirugh erig heigu herigu iug herig uhregi rheg ireuhg ieurgh
              eirugh eirgh eriug hregiu ehrgiuehr gieruhg eiugh gu erhigu
              hgiuehg ierhg ierguh igu hgeiruh eigu hri he
            </Text>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

const JoinMessageButtons = (props) => {
  return (
    <View
      style={{
        flex: 2,
        flexDirection: "row",
      }}
    >
      <View style={{ flex: 1 }}></View>
      <View
        style={{
          flex: 2,
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            width: "80%",
            height: "60%",
            alignSelf: "center",
            backgroundColor: Colors.PRIMARY,
            justifyContent: "center",
            borderRadius: 100,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              color: "white",
            }}
          >
            Join
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 2,
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            width: "80%",
            height: "60%",
            alignSelf: "center",
            backgroundColor: "#d0d0d0",
            justifyContent: "center",
            borderRadius: 100,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              color: "#2f2f2f",
            }}
          >
            Message
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}></View>
    </View>
  );
};

export default CommunityOverviewScreen;
