import React, {useState} from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons"

import R from "../../assets/R";
import TextForm from "../../components/Input/InputForm";
import I18n from "../../helper/i18/i18n";
import Button from '../../components/Button'
import { useForm, Controller } from "react-hook-form";
import { LISTUSER } from "../../routers/ScreenNames"
import { createUserApi, ListUserApi } from "../../apis/user"

const AddUser = (props) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigation();
    let getList = props.route.params.getListUser

    const onSubmit = async (user) => {
        const res = await createUserApi({ 
            "username": user.username,
            "full_name": user.full_name,
            "email": user.email,
            "phone": "0967773331",
            "password": "123456",
            "user_group_id": 1,
            "organization_id": 5,
            "avatar": "https://i.imgur.com/L2j2rBc.png",
            "address": "ABC",
            "status": 1,
            "is_customer_data_manager": false,
            "userPermissions": [
                {
                    "action_id": 2
                }
            ]
        })

        if (res.status === 200 && res.data.code === '200') {
            Alert.alert(
                "Thông báo",
                "Tạo nhân viên thành công",
                [
                  {
                    text: "Ok",
                    onPress: () => navigate.navigate(LISTUSER),
                    style: "cancel"
                  },
                  
                ]
            );
            getList()
        } else {
            Alert.alert(
                "Thông báo",
                "Tên người dùng đã tồn tại",
                [
                  { text: "Nhập lại", onPress: () => console.log("OK Pressed") }
                ]
              );
        }   
    }




    return (
        <View style={{marginTop: 64, paddingHorizontal: 32, flex: 1}}>
            <TouchableOpacity onPress={() => navigate.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <View style={{justifyContent: "center", marginTop: 24, flex: 1}}>
                <Text style={{fontSize: 24, textAlign: "center",marginBottom: 18}}>Tạo nhân viên</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextForm
                            textColor={R.colors.white}
                            placeHolderColor='#726D6D'
                            placeholder={I18n.t("username")}
                            // fontSize="24"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            error={errors.username}
                            fontSize={18}
                        />
                    )}
                    name="username"
                    defaultValue=""
                />
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextForm
                            textColor={R.colors.white}
                            placeHolderColor='#726D6D'
                            placeholder={I18n.t("FullName")}
                            // fontSize="24"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            error={errors.full_name}
                            fontSize={18}
                        />
                    )}
                    name="full_name"
                    defaultValue=""
                />
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextForm
                            textColor={R.colors.white}
                            placeHolderColor='#726D6D'
                            placeholder={I18n.t("Email")}
                            // fontSize="24"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            error={errors.email}
                            fontSize={18}
                        />
                    )}
                    name="email"
                    defaultValue=""
                />

                <Button
                    onPress={handleSubmit(onSubmit)}
                    // title={I18n.t("Login")}
                    backgroundColor={R.colors.main}
                    title={("TẠO MỚI")}
                    containerStyle={{marginTop: 8}}
                />

            </View>
            
        </View>
    )
}

export default AddUser
